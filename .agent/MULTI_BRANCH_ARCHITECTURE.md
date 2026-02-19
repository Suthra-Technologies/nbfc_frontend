# Multi-Branch SaaS Banking Platform - Frontend Architecture

## Overview
A production-ready multi-tenant banking application with branch-level isolation and hierarchical role management.

## Folder Structure

```
src/
├── assets/
│   ├── icons/
│   ├── images/
│   └── svg/
├── components/
│   ├── banking/          # Banking-specific components
│   ├── common/           # Shared components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── ModeToggle.tsx
│   │   └── BranchSelector.tsx
│   ├── super-admin/      # Super Admin specific components
│   │   ├── BranchManager.tsx
│   │   ├── SystemAnalytics.tsx
│   │   └── GlobalAuditLog.tsx
│   ├── branch-admin/     # Branch Admin specific components
│   │   ├── BranchDashboard.tsx
│   │   ├── StaffManager.tsx
│   │   └── BranchSettings.tsx
│   ├── ui/               # shadcn/ui components
│   └── theme-provider.tsx
├── config/
│   ├── api.config.ts     # API endpoints configuration
│   ├── roles.config.ts   # Role definitions and permissions
│   └── branches.config.ts
├── constants/
│   ├── permissions.ts    # Permission constants
│   ├── roles.ts          # Role constants
│   └── routes.ts         # Route constants
├── contexts/
│   ├── AuthContext.tsx   # Authentication with branch support
│   ├── BranchContext.tsx # Current branch context
│   └── PermissionContext.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useBranch.ts
│   ├── usePermissions.ts
│   └── useApi.ts
├── layouts/
│   ├── AuthLayout.tsx
│   ├── MainLayout.tsx
│   ├── SuperAdminLayout.tsx
│   └── BranchLayout.tsx
├── lib/
│   ├── utils.ts
│   ├── api-client.ts     # Axios instance with interceptors
│   └── permissions.ts    # Permission checking utilities
├── pages/
│   ├── auth/
│   │   ├── Login.tsx
│   │   ├── BranchSelection.tsx
│   │   └── ForgotPassword.tsx
│   ├── super-admin/
│   │   ├── Dashboard.tsx
│   │   ├── BranchManagement.tsx
│   │   ├── CreateBranch.tsx
│   │   ├── SystemSettings.tsx
│   │   └── GlobalReports.tsx
│   ├── branch-admin/
│   │   ├── Dashboard.tsx
│   │   ├── StaffManagement.tsx
│   │   ├── BranchSettings.tsx
│   │   └── BranchReports.tsx
│   ├── staff/
│   │   ├── Dashboard.tsx
│   │   └── MyTasks.tsx
│   ├── customers/
│   │   ├── Customers.tsx
│   │   ├── CustomerDetails.tsx
│   │   └── CustomerOnboarding.tsx
│   ├── loans/
│   │   ├── LoanDashboard.tsx
│   │   ├── LoanApplication.tsx
│   │   └── LoanManagement.tsx
│   ├── operations/
│   │   ├── DepositOperations.tsx
│   │   └── Withdrawal.tsx
│   └── ... (existing pages)
├── services/
│   ├── auth.service.ts
│   ├── branch.service.ts
│   ├── user.service.ts
│   ├── customer.service.ts
│   ├── loan.service.ts
│   └── transaction.service.ts
├── store/
│   ├── authStore.ts      # Zustand store for auth
│   ├── branchStore.ts    # Current branch state
│   └── appStore.ts       # Global app state
├── styles/
│   ├── globals.css
│   └── App.css
├── themes/
│   ├── theme-constants.ts
│   └── README.md
├── types/
│   ├── auth.types.ts
│   ├── branch.types.ts
│   ├── user.types.ts
│   ├── customer.types.ts
│   ├── loan.types.ts
│   └── api.types.ts
├── utils/
│   ├── validators.ts
│   ├── formatters.ts
│   └── helpers.ts
├── App.tsx
└── main.tsx
```

## Core Data Flow

### 1. Authentication Flow
```
User Login → API validates credentials
         → Returns: { user, token, branches[], permissions[] }
         → If Super Admin: Full system access
         → If Branch Admin/Staff: Show branch selector (if multiple branches)
         → Set active branch in context
         → Redirect to role-based dashboard
```

### 2. Branch Context
```typescript
interface BranchContext {
  currentBranch: Branch | null;
  availableBranches: Branch[];
  switchBranch: (branchId: string) => Promise<void>;
  isSuperAdmin: boolean;
}
```

### 3. API Request Flow
```
Component → Service → API Client
                    → Adds branch_id to headers (if not Super Admin)
                    → Adds JWT token
                    → Makes request
                    → Returns branch-filtered data
```

## Role-Based Access Control (RBAC)

### Role Hierarchy
```
SUPER_ADMIN (Level 0)
  ├── BRANCH_ADMIN (Level 1)
  │   ├── MANAGER (Level 2)
  │   ├── ASSISTANT_MANAGER (Level 3)
  │   ├── CASHIER (Level 4)
  │   └── ACCOUNTANT (Level 4)
  └── STAFF (Level 5)
```

### Permission Matrix
```typescript
Permissions = {
  // Branch Management
  CREATE_BRANCH: ['SUPER_ADMIN'],
  EDIT_BRANCH: ['SUPER_ADMIN'],
  DELETE_BRANCH: ['SUPER_ADMIN'],
  VIEW_ALL_BRANCHES: ['SUPER_ADMIN'],
  
  // User Management
  CREATE_BRANCH_ADMIN: ['SUPER_ADMIN'],
  CREATE_STAFF: ['SUPER_ADMIN', 'BRANCH_ADMIN'],
  EDIT_STAFF: ['SUPER_ADMIN', 'BRANCH_ADMIN'],
  
  // Customer Management
  CREATE_CUSTOMER: ['BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER', 'CASHIER'],
  EDIT_CUSTOMER: ['BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER'],
  VIEW_CUSTOMERS: ['BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER', 'CASHIER', 'ACCOUNTANT'],
  
  // Loan Management
  CREATE_LOAN: ['BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER'],
  APPROVE_LOAN: ['BRANCH_ADMIN', 'MANAGER'],
  DISBURSE_LOAN: ['BRANCH_ADMIN', 'MANAGER', 'CASHIER'],
  
  // Transactions
  DEPOSIT: ['BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER', 'CASHIER'],
  WITHDRAWAL: ['BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER', 'CASHIER'],
  
  // Reports
  VIEW_BRANCH_REPORTS: ['BRANCH_ADMIN', 'MANAGER', 'ACCOUNTANT'],
  VIEW_GLOBAL_REPORTS: ['SUPER_ADMIN'],
  
  // Settings
  EDIT_BRANCH_SETTINGS: ['SUPER_ADMIN', 'BRANCH_ADMIN'],
  EDIT_SYSTEM_SETTINGS: ['SUPER_ADMIN'],
}
```

## Component Examples

### Protected Route Component
```typescript
<ProtectedRoute 
  requiredPermission="CREATE_LOAN"
  requiredBranch={true}
>
  <LoanApplication />
</ProtectedRoute>
```

### Branch-Aware API Call
```typescript
// Automatically adds branch_id for non-Super Admins
const customers = await customerService.getAll();

// Super Admin can explicitly query by branch
const branchCustomers = await customerService.getAll({ branchId: 'branch-123' });
```

## Key Features Implementation

### 1. Branch Selector
- Shows after login for users with multiple branch access
- Persists selected branch in localStorage
- Updates API headers automatically

### 2. Super Admin Dashboard
- System-wide metrics
- All branches overview
- Quick branch creation
- Global analytics

### 3. Branch Admin Dashboard
- Branch-specific metrics
- Staff management
- Customer overview
- Branch performance

### 4. Data Isolation
- All API calls automatically filtered by branch_id (except Super Admin)
- Frontend validates branch access before rendering
- No cross-branch data leakage

## Security Implementation

### Token Structure
```typescript
interface JWTPayload {
  userId: string;
  role: UserRole;
  branchIds: string[];  // Branches user has access to
  permissions: Permission[];
  isSuperAdmin: boolean;
  activeBranchId?: string;
}
```

### API Interceptor
```typescript
// Adds branch context to all requests
axios.interceptors.request.use(config => {
  const { currentBranch, isSuperAdmin } = useBranchStore.getState();
  
  if (!isSuperAdmin && currentBranch) {
    config.headers['X-Branch-Id'] = currentBranch.id;
  }
  
  return config;
});
```

## Next Steps for Implementation

1. ✅ **Phase 1: Type System & Constants**
   - Create type definitions
   - Define role and permission constants
   - Set up configuration files

2. **Phase 2: State Management**
   - Create auth store with branch support
   - Create branch context
   - Implement permission hooks

3. **Phase 3: Authentication**
   - Build login with branch selection
   - JWT token management
   - Role-based routing

4. **Phase 4: Super Admin Features**
   - Branch management UI
   - System-wide dashboard
   - Global settings

5. **Phase 5: Branch Features**
   - Branch-specific dashboards
   - Staff management
   - Branch settings

6. **Phase 6: Core Banking Features**
   - Customer management (branch-aware)
   - Loan processing (branch-aware)
   - Transactions (branch-aware)

7. **Phase 7: Advanced Features**
   - Real-time updates
   - Document management
   - Reporting system
