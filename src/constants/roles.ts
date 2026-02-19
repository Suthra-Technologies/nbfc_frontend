// User Roles
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  BRANCH_ADMIN = 'BRANCH_ADMIN',
  MANAGER = 'MANAGER',
  ASSISTANT_MANAGER = 'ASSISTANT_MANAGER',
  CASHIER = 'CASHIER',
  ACCOUNTANT = 'ACCOUNTANT',
  STAFF = 'STAFF',
}

// Role Hierarchy Levels (lower number = higher authority)
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [UserRole.SUPER_ADMIN]: 0,
  [UserRole.BRANCH_ADMIN]: 1,
  [UserRole.MANAGER]: 2,
  [UserRole.ASSISTANT_MANAGER]: 3,
  [UserRole.CASHIER]: 4,
  [UserRole.ACCOUNTANT]: 4,
  [UserRole.STAFF]: 5,
};

// Role Display Names
export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
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

export const isBranchAdmin = (role: UserRole): boolean => {
  return role === UserRole.BRANCH_ADMIN;
};

export const hasHigherAuthority = (role1: UserRole, role2: UserRole): boolean => {
  return ROLE_HIERARCHY[role1] < ROLE_HIERARCHY[role2];
};

export const canManageRole = (managerRole: UserRole, targetRole: UserRole): boolean => {
  // Super Admin can manage all roles
  if (managerRole === UserRole.SUPER_ADMIN) return true;
  
  // Branch Admin can manage all roles except Super Admin
  if (managerRole === UserRole.BRANCH_ADMIN) {
    return targetRole !== UserRole.SUPER_ADMIN;
  }
  
  // Others can only manage roles lower than their own
  return hasHigherAuthority(managerRole, targetRole);
};
