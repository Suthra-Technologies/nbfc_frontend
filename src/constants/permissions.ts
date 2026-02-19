import { UserRole } from './roles';

// Permission Types
export enum Permission {
  // Branch Management
  CREATE_BRANCH = 'CREATE_BRANCH',
  EDIT_BRANCH = 'EDIT_BRANCH',
  DELETE_BRANCH = 'DELETE_BRANCH',
  VIEW_ALL_BRANCHES = 'VIEW_ALL_BRANCHES',
  MANAGE_BRANCH_SETTINGS = 'MANAGE_BRANCH_SETTINGS',

  // User Management
  CREATE_BRANCH_ADMIN = 'CREATE_BRANCH_ADMIN',
  CREATE_STAFF = 'CREATE_STAFF',
  EDIT_STAFF = 'EDIT_STAFF',
  DELETE_STAFF = 'DELETE_STAFF',
  VIEW_STAFF = 'VIEW_STAFF',

  // Customer Management
  CREATE_CUSTOMER = 'CREATE_CUSTOMER',
  EDIT_CUSTOMER = 'EDIT_CUSTOMER',
  DELETE_CUSTOMER = 'DELETE_CUSTOMER',
  VIEW_CUSTOMERS = 'VIEW_CUSTOMERS',
  EXPORT_CUSTOMERS = 'EXPORT_CUSTOMERS',

  // Account Management
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  EDIT_ACCOUNT = 'EDIT_ACCOUNT',
  CLOSE_ACCOUNT = 'CLOSE_ACCOUNT',
  VIEW_ACCOUNTS = 'VIEW_ACCOUNTS',

  // Loan Management
  CREATE_LOAN = 'CREATE_LOAN',
  EDIT_LOAN = 'EDIT_LOAN',
  APPROVE_LOAN = 'APPROVE_LOAN',
  REJECT_LOAN = 'REJECT_LOAN',
  DISBURSE_LOAN = 'DISBURSE_LOAN',
  VIEW_LOANS = 'VIEW_LOANS',

  // Transaction Management
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER = 'TRANSFER',
  VIEW_TRANSACTIONS = 'VIEW_TRANSACTIONS',
  APPROVE_TRANSACTION = 'APPROVE_TRANSACTION',

  // Reports & Analytics
  VIEW_BRANCH_REPORTS = 'VIEW_BRANCH_REPORTS',
  VIEW_GLOBAL_REPORTS = 'VIEW_GLOBAL_REPORTS',
  EXPORT_REPORTS = 'EXPORT_REPORTS',

  // System Settings
  EDIT_SYSTEM_SETTINGS = 'EDIT_SYSTEM_SETTINGS',
  VIEW_AUDIT_LOGS = 'VIEW_AUDIT_LOGS',
  MANAGE_ROLES = 'MANAGE_ROLES',
}

// Permission Matrix: Maps roles to their permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: [
    // Has all permissions
    ...Object.values(Permission),
  ],

  [UserRole.BRANCH_ADMIN]: [
    // Branch Management (limited)
    Permission.MANAGE_BRANCH_SETTINGS,

    // User Management
    Permission.CREATE_STAFF,
    Permission.EDIT_STAFF,
    Permission.DELETE_STAFF,
    Permission.VIEW_STAFF,

    // Customer Management
    Permission.CREATE_CUSTOMER,
    Permission.EDIT_CUSTOMER,
    Permission.DELETE_CUSTOMER,
    Permission.VIEW_CUSTOMERS,
    Permission.EXPORT_CUSTOMERS,

    // Account Management
    Permission.CREATE_ACCOUNT,
    Permission.EDIT_ACCOUNT,
    Permission.CLOSE_ACCOUNT,
    Permission.VIEW_ACCOUNTS,

    // Loan Management
    Permission.CREATE_LOAN,
    Permission.EDIT_LOAN,
    Permission.APPROVE_LOAN,
    Permission.REJECT_LOAN,
    Permission.DISBURSE_LOAN,
    Permission.VIEW_LOANS,

    // Transaction Management
    Permission.DEPOSIT,
    Permission.WITHDRAWAL,
    Permission.TRANSFER,
    Permission.VIEW_TRANSACTIONS,
    Permission.APPROVE_TRANSACTION,

    // Reports
    Permission.VIEW_BRANCH_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_AUDIT_LOGS,
  ],

  [UserRole.MANAGER]: [
    // Customer Management
    Permission.CREATE_CUSTOMER,
    Permission.EDIT_CUSTOMER,
    Permission.VIEW_CUSTOMERS,
    Permission.EXPORT_CUSTOMERS,

    // Account Management
    Permission.CREATE_ACCOUNT,
    Permission.EDIT_ACCOUNT,
    Permission.VIEW_ACCOUNTS,

    // Loan Management
    Permission.CREATE_LOAN,
    Permission.EDIT_LOAN,
    Permission.APPROVE_LOAN,
    Permission.REJECT_LOAN,
    Permission.DISBURSE_LOAN,
    Permission.VIEW_LOANS,

    // Transaction Management
    Permission.DEPOSIT,
    Permission.WITHDRAWAL,
    Permission.TRANSFER,
    Permission.VIEW_TRANSACTIONS,
    Permission.APPROVE_TRANSACTION,

    // Reports
    Permission.VIEW_BRANCH_REPORTS,
    Permission.EXPORT_REPORTS,

    // Staff
    Permission.VIEW_STAFF,
  ],

  [UserRole.ASSISTANT_MANAGER]: [
    // Customer Management
    Permission.CREATE_CUSTOMER,
    Permission.EDIT_CUSTOMER,
    Permission.VIEW_CUSTOMERS,

    // Account Management
    Permission.CREATE_ACCOUNT,
    Permission.VIEW_ACCOUNTS,

    // Loan Management
    Permission.CREATE_LOAN,
    Permission.EDIT_LOAN,
    Permission.VIEW_LOANS,

    // Transaction Management
    Permission.DEPOSIT,
    Permission.WITHDRAWAL,
    Permission.VIEW_TRANSACTIONS,

    // Reports
    Permission.VIEW_BRANCH_REPORTS,

    // Staff
    Permission.VIEW_STAFF,
  ],

  [UserRole.CASHIER]: [
    // Customer Management
    Permission.VIEW_CUSTOMERS,

    // Account Management
    Permission.VIEW_ACCOUNTS,

    // Loan Management
    Permission.VIEW_LOANS,
    Permission.DISBURSE_LOAN,

    // Transaction Management
    Permission.DEPOSIT,
    Permission.WITHDRAWAL,
    Permission.VIEW_TRANSACTIONS,
  ],

  [UserRole.ACCOUNTANT]: [
    // Customer Management
    Permission.VIEW_CUSTOMERS,

    // Account Management
    Permission.VIEW_ACCOUNTS,

    // Loan Management
    Permission.VIEW_LOANS,

    // Transaction Management
    Permission.VIEW_TRANSACTIONS,

    // Reports
    Permission.VIEW_BRANCH_REPORTS,
    Permission.EXPORT_REPORTS,
  ],

  [UserRole.STAFF]: [
    // Basic permissions only
    Permission.VIEW_CUSTOMERS,
    Permission.VIEW_ACCOUNTS,
    Permission.VIEW_TRANSACTIONS,
  ],
};

// Helper function to check if a role has a specific permission
export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
};

// Helper function to check if a role has any of the given permissions
export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some((permission) => hasPermission(role, permission));
};

// Helper function to check if a role has all of the given permissions
export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every((permission) => hasPermission(role, permission));
};
