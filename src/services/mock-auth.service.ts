/**
 * Mock/Demo Authentication Service
 * For testing without a backend
 */

import type { LoginCredentials, LoginResponse, Branch } from '@/types/auth.types';
import { UserRole } from '@/constants/roles';
import { ROLE_PERMISSIONS } from '@/constants/permissions';

// Mock Storage Keys
const STORAGE_KEY = 'demo_banks';
const USERS_STORAGE_KEY = 'demo_users';

// Initialize default banks (HDFC, SBI, ICICI, etc.)
const initializeBanks = (): Branch[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultBanks: Branch[] = [
    {
      id: 'bank-001',
      name: 'HDFC Bank',
      code: 'HDFC001',
      type: 'HEAD_OFFICE' as any,
      address: {
        street: 'HDFC House, H.T. Parekh Marg',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400020',
      },
      contact: {
        email: 'admin@hdfcbank.com',
        phone: '+91-22-6171-6171',
      },
      adminId: 'user-001',
      isActive: true,
      settings: {
        workingHours: {} as any,
        businessDate: new Date().toISOString().split('T')[0],
        isDateLocked: false,
        allowOnlineTransactions: true,
        dailyWithdrawalLimit: 100000,
        dailyDepositLimit: 500000,
        minLoanAmount: 10000,
        maxLoanAmount: 10000000,
        currency: 'INR',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'bank-002',
      name: 'State Bank of India',
      code: 'SBI001',
      type: 'HEAD_OFFICE' as any,
      address: {
        street: 'State Bank Bhavan, Madame Cama Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400021',
      },
      contact: {
        email: 'admin@sbi.co.in',
        phone: '+91-22-2202-2426',
      },
      adminId: 'user-002',
      isActive: true,
      settings: {
        workingHours: {} as any,
        businessDate: new Date().toISOString().split('T')[0],
        isDateLocked: false,
        allowOnlineTransactions: true,
        dailyWithdrawalLimit: 100000,
        dailyDepositLimit: 500000,
        minLoanAmount: 10000,
        maxLoanAmount: 10000000,
        currency: 'INR',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'bank-003',
      name: 'ICICI Bank',
      code: 'ICICI001',
      type: 'HEAD_OFFICE' as any,
      address: {
        street: 'ICICI Bank Towers, Bandra Kurla Complex',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        zipCode: '400051',
      },
      contact: {
        email: 'john@gmail.com',
        phone: '+91-22-2653-1414',
      },
      adminId: 'user-003',
      isActive: true,
      settings: {
        workingHours: {} as any,
        businessDate: new Date().toISOString().split('T')[0],
        isDateLocked: false,
        allowOnlineTransactions: true,
        dailyWithdrawalLimit: 100000,
        dailyDepositLimit: 500000,
        minLoanAmount: 10000,
        maxLoanAmount: 10000000,
        currency: 'INR',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBanks));
  return defaultBanks;
};

// Initialize default users
const initializeUsers = () => {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  const defaultUsers = [
    {
      id: 'user-001',
      email: 'admin@hdfcbank.com',
      password: 'admin123',
      bankId: 'bank-001',
      role: UserRole.BRANCH_ADMIN,
      firstName: 'HDFC',
      lastName: 'Admin',
    },
    {
      id: 'user-002',
      email: 'admin@sbi.co.in',
      password: 'admin123',
      bankId: 'bank-002',
      role: UserRole.BRANCH_ADMIN,
      firstName: 'SBI',
      lastName: 'Admin',
    },
    {
      id: 'user-003',
      email: 'john@gmail.com',
      password: 'john123',
      bankId: 'bank-003',
      role: UserRole.BRANCH_ADMIN,
      firstName: 'John',
      lastName: 'Admin',
    },
  ];

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

// Get all banks
export const getAllBranches = (): Branch[] => {
  return initializeBanks();
};

// Get bank by subdomain
export const getBranchBySubdomain = (subdomain: string): Branch | null => {
  const banks = getAllBranches();
  
  const bankSubdomains: Record<string, string> = {
    'hdfc': 'hdfc-bank',
    'sbi': 'state-bank-of-india',
    'icici': 'icici-bank',
    'axis': 'axis-bank',
    'pnb': 'pnb-bank',
    'demo-branch': 'icici-bank',
  };

  const targetSubdomain = bankSubdomains[subdomain] || subdomain;

  const bank = banks.find(b => {
    const bankSubdomain = b.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    return bankSubdomain.includes(targetSubdomain) || targetSubdomain.includes(bankSubdomain.split('-')[0]);
  });
  
  return bank || null;
};

// Create new bank and bank admin
export const createBranch = (bankData: any): Branch => {
  const banks = getAllBranches();
  const users = initializeUsers();
  
  const bankId = `bank-${Date.now()}`;
  const userId = `user-${Date.now()}`;

  // Create Bank
  const newBank: Branch = {
    id: bankId,
    name: bankData.name,
    code: bankData.code,
    type: bankData.type || 'HEAD_OFFICE',
    address: bankData.address,
    contact: bankData.contact,
    adminId: userId,
    isActive: true,
    settings: {
      workingHours: {} as any,
      businessDate: new Date().toISOString().split('T')[0],
      isDateLocked: false,
      allowOnlineTransactions: true,
      dailyWithdrawalLimit: 100000,
      dailyDepositLimit: 500000,
      minLoanAmount: 10000,
      maxLoanAmount: 10000000,
      currency: 'INR',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Create Bank Admin if details provided
  if (bankData.adminCredentials) {
    users.push({
      id: userId,
      email: bankData.adminCredentials.email,
      password: bankData.adminCredentials.password,
      bankId: bankId,
      role: UserRole.BRANCH_ADMIN,
      firstName: bankData.name,
      lastName: 'Admin',
    });
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }

  banks.push(newBank);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banks));
  
  return newBank;
};

// Update bank
export const updateBranch = (id: string, updates: any): Branch | null => {
  const banks = getAllBranches();
  const index = banks.findIndex(b => b.id === id);
  
  if (index === -1) return null;
  
  banks[index] = {
    ...banks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banks));
  return banks[index];
};

// Deactivate bank
export const deactivateBranch = (id: string): boolean => {
  const banks = getAllBranches();
  const index = banks.findIndex(b => b.id === id);
  
  if (index === -1) return false;
  
  banks[index].isActive = false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(banks));
  return true;
};

// Mock Login Service
export const mockLogin = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // 1. Check Super Admin
  if (
    (credentials.email === 'ramu@corebranch.com' || credentials.email === 'RAMU-123') &&
    credentials.password === 'ramu1234'
  ) {
    return {
      user: {
        id: 'sa-001',
        email: 'ramu@corebranch.com',
        firstName: 'Ramu',
        lastName: 'Super',
        phone: '+91-9999999999',
        role: UserRole.SUPER_ADMIN,
        branchIds: [],
        isSuperAdmin: true,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-sa-token-' + Date.now(),
      refreshToken: 'mock-sa-refresh-token-' + Date.now(),
      branches: getAllBranches(),
      permissions: ROLE_PERMISSIONS[UserRole.SUPER_ADMIN],
    };
  }

  // 2. Check Bank Admins (Dynamic + Demo)
  const users = initializeUsers();
  const user = users.find((u: any) => u.email === credentials.email && u.password === credentials.password);
  
  if (user) {
    const banks = getAllBranches().filter(b => b.id === user.bankId);
    
    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: '+91-9876543210',
        role: user.role,
        branchIds: [user.bankId],
        activeBranchId: user.bankId,
        isSuperAdmin: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'mock-token-' + Date.now(),
      refreshToken: 'mock-refresh-token-' + Date.now(),
      branches: banks,
      permissions: ROLE_PERMISSIONS[user.role as UserRole],
    };
  }

  throw new Error('Invalid email or password');
};

// Mock Tenant Resolution
export const mockResolveTenant = async (subdomain: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const bank = getBranchBySubdomain(subdomain);
  
  if (!bank) {
    throw new Error('Bank not found');
  }

  return {
    branch: bank,
    isActive: bank.isActive,
    settings: bank.settings,
  };
};
