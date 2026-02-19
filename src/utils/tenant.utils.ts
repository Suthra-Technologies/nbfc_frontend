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

  // Common Admin identifiers
  const adminPaths = ['/auth/super-admin', '/super-admin', '/admin'];
  const isAdminPath = adminPaths.some(path => pathname.startsWith(path));

  // Development/Local Environment
  if (hostname === 'localhost' || hostname.includes('127.0.0.1') || hostname.includes('192.168')) {
    const isAdmin = isAdminPath;

    // For local development, use a cleaner way to handle branch switching
    const urlParams = new URLSearchParams(window.location.search);
    const branchParam = urlParams.get('branch');
    const localBranch = branchParam || localStorage.getItem('dev_branch') || 'bank1';

    return {
      subdomain: isAdmin ? 'admin' : localBranch,
      isAdmin,
      isBranch: !isAdmin,
      isLocal: true,
    };
  }

  // Production Environment
  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts[0] : null;

  // Check if it's the admin portal via subdomain or path
  const isAdmin = subdomain === 'admin' || subdomain === 'www' || isAdminPath || !subdomain;

  return {
    subdomain: isAdmin ? 'admin' : (subdomain || 'admin'),
    isAdmin,
    isBranch: !isAdmin,
    isLocal: false,
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
