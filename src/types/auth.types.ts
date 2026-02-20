import { UserRole } from '@/constants/roles';
import { Permission } from '@/constants/permissions';

// ============ AUTH TYPES ============

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  name?: string;
  phone: string;
  role: UserRole;
  branchIds: string[]; // Branches this user has access to
  activeBranchId?: string; // Currently selected branch
  isSuperAdmin: boolean;
  isActive: boolean;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  branches: Branch[]; // User's accessible branches
  permissions: Permission[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: Permission[];
}

// ============ BRANCH TYPES ============

export interface Branch {
  id: string;
  name: string;
  code: string; // Unique branch code (e.g., "BRN001")
  type: BranchType;
  address: Address;
  contact: ContactInfo;
  adminId: string; // Branch Admin user ID
  isActive: boolean;
  settings: BranchSettings;
  stats?: BranchStats;
  subdomain?: string;
  createdAt: string;
  updatedAt: string;
}

export enum BranchType {
  HEAD_OFFICE = 'HEAD_OFFICE',
  REGIONAL_OFFICE = 'REGIONAL_OFFICE',
  BRANCH = 'BRANCH',
  SUB_BRANCH = 'SUB_BRANCH',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  fax?: string;
  website?: string;
}

export interface BranchSettings {
  workingHours: WorkingHours;
  businessDate: string;
  isDateLocked: boolean;
  allowOnlineTransactions: boolean;
  dailyWithdrawalLimit: number;
  dailyDepositLimit: number;
  minLoanAmount: number;
  maxLoanAmount: number;
  currency: string;
}

export interface WorkingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface BranchStats {
  totalCustomers: number;
  totalAccounts: number;
  totalLoans: number;
  totalDeposits: number;
  totalStaff: number;
  activeLoans: number;
  pendingApprovals: number;
}

export interface CreateBranchDTO {
  name: string;
  code: string;
  type: BranchType;
  address: Address;
  contact: ContactInfo;
  adminId: string;
  settings?: Partial<BranchSettings>;
  adminCredentials?: {
    email: string;
    password?: string;
  };
}

export interface UpdateBranchDTO {
  name?: string;
  type?: BranchType;
  address?: Partial<Address>;
  contact?: Partial<ContactInfo>;
  adminId?: string;
  isActive?: boolean;
  settings?: Partial<BranchSettings>;
}

// ============ USER MANAGEMENT TYPES ============

export interface StaffMember extends User {
  branchId: string;
  department?: string;
  employeeId: string;
  joiningDate: string;
  salary?: number;
  reportingTo?: string; // Manager's user ID
}

export interface CreateStaffDTO {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: UserRole;
  branchId: string;
  department?: string;
  employeeId: string;
  joiningDate: string;
  salary?: number;
  reportingTo?: string;
}

export interface UpdateStaffDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  role?: UserRole;
  department?: string;
  salary?: number;
  reportingTo?: string;
  isActive?: boolean;
}
