// User Roles
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  BANK_ADMIN = 'BANK_ADMIN',
  BRANCH_ADMIN = 'BRANCH_ADMIN',
  MANAGER = 'MANAGER',
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER',
  CASHIER = 'CASHIER',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
}

// Bank-level roles (non super-admin)
export const BANK_LEVEL_ROLES = [
  UserRole.BANK_ADMIN,
  UserRole.BRANCH_ADMIN,
  UserRole.MANAGER,
  UserRole.ASSISTANT_MANAGER,
  UserRole.CASHIER,
  UserRole.ACCOUNTANT,
  UserRole.STAFF,
];

// Role Hierarchy Levels (lower number = higher authority)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 0,
  [UserRole.BANK_ADMIN]: 1,
  [UserRole.BRANCH_ADMIN]: 2,
  [UserRole.MANAGER]: 3,
  [UserRole.ASSISTANT_MANAGER]: 4,
  [UserRole.CASHIER]: 5,
  [UserRole.ACCOUNTANT]: 5,
  [UserRole.STAFF]: 6,
};

// Role Display Names
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.BANK_ADMIN]: 'Bank Admin',
  [UserRole.BRANCH_ADMIN]: 'Branch Admin',
  [UserRole.MANAGER]: 'Manager',
  [UserRole.ASSISTANT_MANAGER]: 'Assistant Manager',
  [UserRole.CASHIER]: 'Cashier',
  [UserRole.ACCOUNTANT]: 'Accountant',
  [UserRole.STAFF]: 'Staff',
};

// Helper Functions
export const isSuperAdmin = (role: UserRole): boolean => {
  return role === UserRole.SUPER_ADMIN;
};

export const isBankAdmin = (role: UserRole): boolean => {
  return role === UserRole.BANK_ADMIN;
};

export const isBranchAdmin = (role: UserRole): boolean => {
  return role === UserRole.BRANCH_ADMIN;
};

export const hasHigherAuthority = (role1: UserRole, role2: UserRole): boolean => {
  return ROLE_HIERARCHY[role1] < ROLE_HIERARCHY[role2];
};

export const canManageRole = (managerRole: UserRole, targetRole: UserRole): boolean => {
  if (managerRole === UserRole.SUPER_ADMIN) return true;
  if (managerRole === UserRole.BANK_ADMIN || managerRole === UserRole.BRANCH_ADMIN) {
    return targetRole !== UserRole.SUPER_ADMIN;
  }
  return hasHigherAuthority(managerRole, targetRole);
};
