# Production SaaS Multi-Branch Banking Platform
## Subdomain-Based Multi-Tenancy Architecture

---

## 🎯 CORE CONCEPT: Tenant Resolution via Subdomain

### URL Structure

```
Super Admin Portal:
https://admin.corebranch.com
OR
https://corebranch.com/admin

Branch Portals:
https://vijayawada.corebranch.com
https://guntur.corebranch.com
https://hyderabad.corebranch.com
```

### Automatic Tenant Detection

```javascript
// Frontend detects subdomain
const hostname = window.location.hostname;
// Example: vijayawada.corebranch.com

const subdomain = hostname.split('.')[0];
// Result: "vijayawada"

// Send subdomain to backend
// Backend resolves to branch_id
// All queries filtered by branch_id
```

---

## 🏗️ COMPLETE SCREEN ARCHITECTURE

### A. SUPER ADMIN PORTAL (admin.corebranch.com)

#### 1. Authentication
- `/admin/login` - Super Admin Login
- `/admin/forgot-password` - Password Recovery
- `/admin/reset-password` - Reset Password

#### 2. Dashboard & Analytics
- `/admin/dashboard` - System-wide Overview
  - Total Branches
  - Total Customers
  - Total Loans Disbursed
  - Revenue by Branch
  - Performance Metrics
  - Recent Activities

#### 3. Branch Management
- `/admin/branches` - All Branches List
  - Table with: Branch Name, City, Status, Total Customers, Active Loans, Performance
  - Actions: Edit, Disable/Enable, View Details
  
- `/admin/branches/create` - Create New Branch
  - Branch Details Form:
    - Branch Name
    - Branch Code (auto-generated or manual)
    - Branch Type (Main Branch, Sub-Branch, Regional Office)
    - Address (Street, City, State, Postal Code, Country)
    - Contact Details (Email, Phone, Fax)
    - Login Domain (subdomain for URL)
    - Assign Branch Admin
    - Working Hours
    - Initial Settings
  
- `/admin/branches/:id/edit` - Edit Branch
  
- `/admin/branches/:id/view` - Branch Details
  - Overview Tab
  - Staff Tab (10 employees)
  - Customers Tab (500 customers)
  - Loans Tab (150 active loans)
  - Transactions Tab (recent)
  - Performance Tab (charts & metrics)
  - Settings Tab

#### 4. User Management (Global)
- `/admin/users` - All System Users
  - Filter by: Branch, Role, Status
  - Create Branch Admin
  - Assign Permissions
  
- `/admin/users/create` - Create Super Admin / Branch Admin
- `/admin/users/:id/edit` - Edit User

#### 5. Financial Overview
- `/admin/finance` - System-wide Financial Dashboard
  - Total Deposits
  - Total Loans Disbursed
  - Total Revenue
  - Outstanding Loans
  - NPAs (Non-Performing Assets)
  - Branch-wise Comparison

#### 6. Reports & Analytics
- `/admin/reports` - Global Reports
  - Branch Performance Report
  - Loan Portfolio Report
  - Customer Acquisition Report
  - Financial Summary Report
  - Audit Report
  - Export to Excel/PDF

#### 7. Audit & Security
- `/admin/audit-logs` - System Audit Logs
  - Filter by: Branch, User, Action, Date Range
  - View critical actions (Login, Branch Creation, Loan Approval, etc.)
  
- `/admin/security` - Security Settings
  - Password Policies
  - Session Timeout
  - IP Whitelisting
  - Two-Factor Authentication Settings

#### 8. System Settings
- `/admin/settings` - Global Settings
  - Company Details
  - Email Configuration
  - SMS Gateway Settings
  - Interest Rate Templates
  - Loan Products Configuration
  - Document Templates
  - Notification Settings

---

### B. BRANCH PORTAL (e.g., vijayawada.corebranch.com)

#### 1. Authentication
- `/login` - Branch Login (Tenant-aware)
  - Shows: "CoreBranch — Vijayawada Branch"
  - Email & Password
  - Remember Me
  - Forgot Password
  
- `/forgot-password` - Password Recovery
- `/reset-password` - Reset Password

#### 2. BRANCH ADMIN DASHBOARD
- `/dashboard` - Branch Overview
  - Today's Summary
  - Total Customers
  - Active Loans
  - Pending Approvals
  - Today's Deposits
  - Today's Withdrawals
  - Cash Balance
  - Quick Actions

#### 3. Staff Management
- `/staff` - Staff List
  - Employee ID, Name, Role, Department, Status
  - Actions: Edit, Deactivate, View Details
  
- `/staff/create` - Add New Staff
  - Personal Details
  - Employment Details
  - Role & Permissions
  - Salary Information
  - Reports To (Manager)
  
- `/staff/:id/edit` - Edit Staff
- `/staff/:id/view` - Staff Profile
  - Personal Info
  - Work History
  - Performance
  - Assigned Tasks
  - Permissions

#### 4. Customer Management
- `/customers` - Customer List
  - Search & Filter
  - Customer ID, Name, Phone, Account Type, Status
  - Actions: View, Edit, Add Account
  
- `/customers/onboarding` - Customer Onboarding
  - Personal Information
  - KYC Documents
  - Photo & Signature
  - Address Proof
  - Identity Proof
  - Account Creation
  
- `/customers/:id/view` - Customer Profile
  - Personal Details Tab
  - Accounts Tab
  - Loans Tab
  - Transactions Tab
  - Documents Tab
  - Activity History

#### 5. Account Management
- `/accounts` - All Accounts
  - Account Number, Customer Name, Type, Balance, Status
  
- `/accounts/create` - Open New Account
  - Savings Account
  - Current Account
  - Fixed Deposit
  - Recurring Deposit
  
- `/accounts/:id/view` - Account Details
  - Balance & Summary
  - Transaction History
  - Statements
  - Linked Loans
  - Documents

#### 6. Loan Management
- `/loans` - Loan Dashboard
  - Pending Applications
  - Approved Loans
  - Disbursed Loans
  - Active Loans
  - Closed Loans
  - NPAs
  
- `/loans/apply` - New Loan Application
  - Loan Type Selection
  - Customer Selection
  - Loan Amount & Tenure
  - Interest Rate
  - EMI Calculation
  - Guarantor Details
  - Collateral Details
  - Document Upload
  
- `/loans/:id/view` - Loan Details
  - Loan Summary
  - EMI Schedule
  - Payment History
  - Outstanding Amount
  - Documents
  - Approval Chain
  
- `/loans/:id/approve` - Loan Approval
  - Review Application
  - Credit Check
  - Approve/Reject
  - Add Comments
  
- `/loans/:id/disburse` - Loan Disbursement
  - Verify Documents
  - Disburse to Account
  - Generate Agreement

#### 7. Transactions & Operations
- `/transactions` - Transaction History
  - Filter by: Type, Date, Amount, Customer
  - Deposit, Withdrawal, Transfer
  
- `/operations/deposit` - Cash/Cheque Deposit
  - Account Selection
  - Amount Entry
  - Receipt Generation
  
- `/operations/withdrawal` - Cash Withdrawal
  - Account Verification
  - Amount Entry
  - Signature Verification
  
- `/operations/transfer` - Fund Transfer
  - From Account
  - To Account
  - Amount
  - Purpose

#### 8. Reports
- `/reports` - Branch Reports
  - Daily Cash Report
  - Loan Portfolio Report
  - Customer Acquisition Report
  - Transaction Summary
  - Outstanding Loans Report
  - Export Options

#### 9. Settings
- `/settings` - Branch Settings
  - Branch Information
  - Working Hours
  - Business Date
  - Daily Limits
  - Notifications
  - Preferences

---

### C. STAFF PORTAL (Same subdomain, role-restricted)

#### Cashier Dashboard
- `/dashboard` - Cashier Dashboard
  - Today's Transactions
  - Cash Balance
  - Quick Actions (Deposit, Withdraw)
  
- Limited access to:
  - `/operations/deposit`
  - `/operations/withdrawal`
  - `/transactions` (view only)

#### Loan Officer Dashboard
- `/dashboard` - Loan Officer Dashboard
  - My Applications
  - Pending Approvals
  - Disbursements
  
- Access to:
  - `/loans/apply`
  - `/loans` (view)
  - `/customers` (view)

#### Accountant Dashboard
- `/dashboard` - Accountant Dashboard
  - Financial Summary
  - Reports
  
- Access to:
  - `/reports`
  - `/transactions` (view)
  - `/accounts` (view)

---

## 🔐 AUTHENTICATION FLOW

### Flow Diagram

```
User Access URL: vijayawada.corebranch.com
            ↓
Frontend detects subdomain: "vijayawada"
            ↓
API Call: /api/tenant/resolve
            ↓
Backend queries: SELECT * FROM branches WHERE login_domain = 'vijayawada'
            ↓
Returns: { branchId, branchName, isActive, settings }
            ↓
If not found → Show "Branch Not Found" error
If inactive → Show "Branch is currently inactive"
If active → Show Login Screen with branch branding
            ↓
User enters credentials
            ↓
POST /api/auth/login
Body: { email, password, branchDomain: 'vijayawada' }
            ↓
Backend validates:
  1. Check if user exists
  2. Verify password
  3. Check if user belongs to this branch
  4. Check if user is active
            ↓
Generate JWT with payload:
{
  userId,
  role,
  branchId,
  branchName,
  permissions,
  exp
}
            ↓
Return: { user, token, branch, permissions }
            ↓
Frontend stores:
  - JWT in httpOnly cookie (recommended) or localStorage
  - Branch context in state
            ↓
All subsequent API calls include:
  - Authorization: Bearer <token>
  - X-Tenant-Id header (optional, already in JWT)
            ↓
Backend middleware extracts branchId from JWT
            ↓
Automatically filters all queries by branch_id
```

### Special Case: Super Admin

```
User Access URL: admin.corebranch.com
            ↓
Frontend detects subdomain: "admin"
            ↓
Show Super Admin Login (different UI/branding)
            ↓
POST /api/admin/login
Body: { email, password }
            ↓
Backend:
  - Verify Super Admin credentials
  - No branch restriction
            ↓
Generate JWT with:
{
  userId,
  role: 'SUPER_ADMIN',
  isSuperAdmin: true,
  permissions: [ALL],
  exp
}
            ↓
Super Admin can:
  - View all branches
  - Switch between branches
  - Access global data
```

---

## 💾 DATABASE SCHEMA

### Core Tables

```sql
-- 1. BRANCHES
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  type ENUM('HEAD_OFFICE', 'REGIONAL_OFFICE', 'BRANCH', 'SUB_BRANCH'),
  login_domain VARCHAR(100) UNIQUE NOT NULL, -- Subdomain
  
  -- Address
  street VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'India',
  postal_code VARCHAR(20),
  
  -- Contact
  email VARCHAR(255),
  phone VARCHAR(20),
  fax VARCHAR(20),
  
  -- Admin
  admin_id UUID REFERENCES users(id),
  
  -- Settings
  currency VARCHAR(10) DEFAULT 'INR',
  business_date DATE,
  is_date_locked BOOLEAN DEFAULT FALSE,
  daily_deposit_limit DECIMAL(15,2),
  daily_withdrawal_limit DECIMAL(15,2),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id)
);

-- 2. USERS
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  avatar VARCHAR(255),
  
  role ENUM('SUPER_ADMIN', 'BRANCH_ADMIN', 'MANAGER', 'ASSISTANT_MANAGER', 
            'CASHIER', 'ACCOUNTANT', 'LOAN_OFFICER', 'STAFF'),
  
  branch_id UUID REFERENCES branches(id), -- NULL for Super Admin
  employee_id VARCHAR(50),
  department VARCHAR(100),
  joining_date DATE,
  
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. CUSTOMERS (Multi-tenant with branch_id)
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id), -- CRITICAL
  
  customer_id VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE,
  gender ENUM('MALE', 'FEMALE', 'OTHER'),
  
  -- Address
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  postal_code VARCHAR(20),
  
  -- KYC
  kyc_status ENUM('PENDING', 'VERIFIED', 'REJECTED'),
  pan_card VARCHAR(20),
  aadhar_card VARCHAR(20),
  
  -- Photos
  photo_url VARCHAR(255),
  signature_url VARCHAR(255),
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  
  INDEX idx_branch_customer (branch_id, customer_id)
);

-- 4. ACCOUNTS (Multi-tenant)
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id), -- CRITICAL
  
  account_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id),
  account_type ENUM('SAVINGS', 'CURRENT', 'FIXED_DEPOSIT', 'RECURRING_DEPOSIT'),
  
  balance DECIMAL(15,2) DEFAULT 0.00,
  currency VARCHAR(10) DEFAULT 'INR',
  
  opening_date DATE NOT NULL,
  maturity_date DATE,
  interest_rate DECIMAL(5,2),
  
  status ENUM('ACTIVE', 'DORMANT', 'CLOSED', 'FROZEN'),
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  
  INDEX idx_branch_account (branch_id, account_number)
);

-- 5. LOANS (Multi-tenant)
CREATE TABLE loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id), -- CRITICAL
  
  loan_id VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id),
  account_id UUID REFERENCES accounts(id),
  
  loan_type ENUM('PERSONAL', 'HOME', 'AUTO', 'BUSINESS', 'EDUCATION', 'GOLD'),
  
  principal_amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  tenure_months INTEGER NOT NULL,
  emi_amount DECIMAL(15,2),
  
  disbursed_amount DECIMAL(15,2),
  outstanding_amount DECIMAL(15,2),
  
  application_date DATE,
  approval_date DATE,
  disbursement_date DATE,
  
  status ENUM('PENDING', 'APPROVED', 'REJECTED', 'DISBURSED', 'ACTIVE', 'CLOSED', 'NPA'),
  
  approved_by UUID REFERENCES users(id),
  disbursed_by UUID REFERENCES users(id),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id),
  
  INDEX idx_branch_loan (branch_id, loan_id),
  INDEX idx_loan_status (branch_id, status)
);

-- 6. TRANSACTIONS (Multi-tenant)
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL REFERENCES branches(id), -- CRITICAL
  
  transaction_id VARCHAR(50) UNIQUE NOT NULL,
  account_id UUID NOT NULL REFERENCES accounts(id),
  
  type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'LOAN_DISBURSEMENT', 
            'EMI_PAYMENT', 'INTEREST_CREDIT'),
  
  amount DECIMAL(15,2) NOT NULL,
  balance_before DECIMAL(15,2),
  balance_after DECIMAL(15,2),
  
  related_account_id UUID REFERENCES accounts(id), -- For transfers
  related_loan_id UUID REFERENCES loans(id),
  
  payment_mode ENUM('CASH', 'CHEQUE', 'NEFT', 'RTGS', 'UPI', 'ONLINE'),
  reference_number VARCHAR(100),
  
  remarks TEXT,
  status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REVERSED'),
  
  transaction_date DATE NOT NULL,
  processed_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_branch_transaction (branch_id, transaction_date),
  INDEX idx_account_transaction (account_id, transaction_date)
);

-- 7. AUDIT_LOGS (System-wide)
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID REFERENCES branches(id), -- Can be NULL for Super Admin actions
  
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100), -- 'CUSTOMER', 'LOAN', 'TRANSACTION', etc.
  entity_id UUID,
  
  old_values JSONB,
  new_values JSONB,
  
  ip_address VARCHAR(50),
  user_agent TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  INDEX idx_audit_branch (branch_id, created_at),
  INDEX idx_audit_user (user_id, created_at)
);
```

---

## 🛠️ FRONTEND IMPLEMENTATION

### Folder Structure

```
src/
├── assets/
├── components/
│   ├── admin/              # Super Admin components
│   │   ├── BranchForm.tsx
│   │   ├── BranchList.tsx
│   │   ├── BranchStats.tsx
│   │   ├── GlobalDashboard.tsx
│   │   └── SystemSettings.tsx
│   ├── branch/             # Branch-specific components
│   │   ├── BranchDashboard.tsx
│   │   ├── StaffManagement.tsx
│   │   ├── CustomerList.tsx
│   │   └── LoanManagement.tsx
│   ├── common/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TenantBranding.tsx  # Shows branch name/logo
│   │   └── ProtectedRoute.tsx
│   └── ui/
├── config/
│   ├── api.config.ts
│   ├── tenant.config.ts    # Subdomain detection
│   └── routes.config.ts
├── hooks/
│   ├── useAuth.ts
│   ├── useTenant.ts        # Tenant/branch context
│   └── usePermissions.ts
├── layouts/
│   ├── AdminLayout.tsx     # Super Admin layout
│   ├── BranchLayout.tsx    # Branch layout
│   └── AuthLayout.tsx
├── pages/
│   ├── admin/              # Super Admin pages
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Branches.tsx
│   │   ├── CreateBranch.tsx
│   │   ├── EditBranch.tsx
│   │   ├── BranchDetails.tsx
│   │   ├── Users.tsx
│   │   ├── Finance.tsx
│   │   ├── Reports.tsx
│   │   ├── AuditLogs.tsx
│   │   └── Settings.tsx
│   ├── branch/             # Branch pages
│   │   ├── Login.tsx       # Tenant-aware login
│   │   ├── Dashboard.tsx
│   │   ├── Staff.tsx
│   │   ├── Customers.tsx
│   │   ├── Accounts.tsx
│   │   ├── Loans.tsx
│   │   ├── Transactions.tsx
│   │   ├── Operations.tsx
│   │   ├── Reports.tsx
│   │   └── Settings.tsx
│   └── auth/
│       ├── ForgotPassword.tsx
│       └── ResetPassword.tsx
├── services/
│   ├── auth.service.ts
│   ├── tenant.service.ts   # Tenant resolution
│   ├── branch.service.ts
│   └── ...
├── store/
│   ├── authStore.ts
│   └── tenantStore.ts      # Tenant context
├── types/
├── utils/
│   ├── tenant.utils.ts     # Subdomain extraction
│   └── ...
└── App.tsx
```

### Key Implementation Files

#### 1. Tenant Detection Utility

```typescript
// src/utils/tenant.utils.ts
export const getTenantFromHostname = (): {
  subdomain: string;
  isAdmin: boolean;
  isBranch: boolean;
} => {
  const hostname = window.location.hostname;
  
  // Development
  if (hostname === 'localhost' || hostname.includes('127.0.0.1')) {
    // Check for /admin route
    const isAdmin = window.location.pathname.startsWith('/admin');
    return {
      subdomain: isAdmin ? 'admin' : 'demo-branch',
      isAdmin,
      isBranch: !isAdmin,
    };
  }
  
  // Production
  // Example: vijayawada.corebranch.com → subdomain = vijayawada
  const parts = hostname.split('.');
  
  if (parts.length < 2) {
    throw new Error('Invalid domain');
  }
  
  const subdomain = parts[0];
  const isAdmin = subdomain === 'admin' || subdomain === 'www';
  
  return {
    subdomain,
    isAdmin,
    isBranch: !isAdmin,
  };
};
```

#### 2. Tenant Store

```typescript
// src/store/tenantStore.ts
interface TenantState {
  branch: Branch | null;
  subdomain: string;
  isResolved: boolean;
  isAdmin: boolean;
  resolveTenant: () => Promise<void>;
}

export const useTenantStore = create<TenantState>((set) => ({
  branch: null,
  subdomain: '',
  isResolved: false,
  isAdmin: false,
  
  resolveTenant: async () => {
    const { subdomain, isAdmin } = getTenantFromHostname();
    
    if (isAdmin) {
      set({ subdomain, isAdmin: true, isResolved: true });
      return;
    }
    
    // Fetch branch details from backend
    const branch = await tenantService.resolve(subdomain);
    
    if (!branch) {
      throw new Error('Branch not found');
    }
    
    if (!branch.isActive) {
      throw new Error('Branch is inactive');
    }
    
    set({ branch, subdomain, isResolved: true });
  },
}));
```

---

## 🚦 ROUTING STRUCTURE

```typescript
// Super Admin Routes (admin.corebranch.com)
/admin/login
/admin/dashboard
/admin/branches
/admin/branches/create
/admin/branches/:id/view
/admin/users
/admin/finance
/admin/reports
/admin/audit-logs
/admin/settings

// Branch Routes (e.g., vijayawada.corebranch.com)
/login
/dashboard
/staff
/staff/create
/customers
/customers/onboarding
/accounts
/loans
/loans/apply
/transactions
/operations/deposit
/operations/withdrawal
/reports
/settings
```

---

## 🔒 SECURITY BEST PRACTICES

1. **Tenant Isolation Enforcement**
   - Backend MUST validate branch_id from JWT
   - Never trust client-sent branch_id
   - Use database row-level security if possible

2. **JWT Best Practices**
   - Store in httpOnly cookies (prevents XSS)
   - Short expiry (15 minutes)
   - Refresh token mechanism
   - Include branch_id in payload

3. **API Security**
   - Rate limiting per tenant
   - Input validation
   - SQL injection prevention (use parameterized queries)
   - CORS configuration

4. **Audit Everything**
   - Log all critical actions
   - Track IP addresses
   - Session monitoring

---

This is a **production-grade architecture** ready for implementation! 🚀
