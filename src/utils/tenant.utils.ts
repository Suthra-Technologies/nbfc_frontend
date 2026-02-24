/**
 * Tenant Detection and Resolution Utilities
 * Handles subdomain-based multi-tenancy
 */

export interface TenantInfo {
  subdomain: string;
  isAdmin: boolean;
  isBranch: boolean;
  isLocal: boolean;
}

export const getTenantFromHostname = (): TenantInfo => {
  const hostname = window.location.hostname;
  const pathname = window.location.pathname;

  // 1. Check if we are on a reserved "Super Admin" path
  const adminPaths = ['/auth/super-admin', '/super-admin', '/admin'];
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path));

  // 2. Parse parts of the hostname
  const parts = hostname.split('.');
  let subdomain: string | null = null;

  // Handle local environments (localhost, 127.0.0.1, 192.168.*)
  const isLocal = hostname === 'localhost' ||
    hostname.startsWith('127.0.0.') ||
    hostname.startsWith('192.168.') ||
    hostname.endsWith('.local');

  if (isLocal) {
    // If hostname has multiple parts (subdomain.localhost or axis.127.0.0.1.nip.io)
    // We assume anything BEFORE the first dot is the subdomain if there are 2+ parts
    // AND it's not raw IP start
    if (parts.length > 1 && !parts[0].match(/^\d+$/)) {
      subdomain = parts[0];
    }

    // Fallback/Override: Query param or localStorage for easier local testing
    // This allows: localhost:5173/?branch=axis
    const urlParams = new URLSearchParams(window.location.search);
    const querySubdomain = urlParams.get('branch') || urlParams.get('tenant');

    if (querySubdomain) {
      subdomain = querySubdomain;
      // Persist for this session
      localStorage.setItem('dev_tenant_override', querySubdomain);
    } else {
      const persisted = localStorage.getItem('dev_tenant_override');
      if (persisted && !subdomain) {
        subdomain = persisted;
      }
    }
  } else {
    // Production: subdomain.domain.com
    // Usually parts are [subdomain, domain, com] -> length 3
    if (parts.length >= 3) {
      subdomain = parts[0];
    }
  }

  // 3. Determine Final Identity
  // 'admin' subdomain is a special case for the hosted admin portal
  const isAdmin = isAdminPath || subdomain === 'admin';

  return {
    subdomain: isAdmin ? 'admin' : (subdomain || ''),
    isAdmin,
    isBranch: !isAdmin && !!subdomain,
    isLocal,
  };
};

/**
 * Get base domain (without subdomain)
 * Example: vijayawada.corebranch.com → corebranch.com
 */
export const getBaseDomain = (): string => {
  const hostname = window.location.hostname;

  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    return 'localhost';
  }

  const parts = hostname.split('.');
  if (parts.length < 2) {
    return hostname;
  }

  // Return last two parts (domain.com)
  return parts.slice(-2).join('.');
};

/**
 * Build URL for a specific tenant
 * @param subdomain - Branch subdomain or 'admin'
 * @param path - URL path
 */
export const buildTenantUrl = (subdomain: string, path: string = '/'): string => {
  const protocol = window.location.protocol;
  const baseDomain = getBaseDomain();

  if (baseDomain === 'localhost') {
    // Local development: use path-based routing
    if (subdomain === 'admin') {
      return `${protocol}//${baseDomain}:${window.location.port}/admin${path}`;
    }
    return `${protocol}//${baseDomain}:${window.location.port}${path}?branch=${subdomain}`;
  }

  // Production: use subdomain routing
  return `${protocol}//${subdomain}.${baseDomain}${path}`;
};

/**
 * Navigate to a different tenant (branch)
 * @param subdomain - Target branch subdomain
 * @param path - URL path
 */
export const navigateToTenant = (subdomain: string, path: string = '/'): void => {
  const url = buildTenantUrl(subdomain, path);
  window.location.href = url;
};

/**
 * Check if current environment is production
 */
export const isProduction = (): boolean => {
  const hostname = window.location.hostname;
  return !(hostname === 'localhost' || hostname.includes('127.0.0.1') || hostname.includes('192.168'));
};

/**
 * Validate subdomain format
 * Only allows alphanumeric and hyphens
 */
export const isValidSubdomain = (subdomain: string): boolean => {
  const regex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
  return regex.test(subdomain);
};

/**
 * Generate a subdomain from branch name
 * Example: "Vijayawada Main Branch" → "vijayawada-main"
 */
export const generateSubdomain = (branchName: string): string => {
  return branchName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Remove consecutive hyphens
    .substring(0, 63); // Limit to 63 characters
};
