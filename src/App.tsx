import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"

// Auth Pages
import { SuperAdminAuth } from "@/pages/auth/super-admin/SuperAdminAuth";
import { BankAdminAuth } from "@/pages/auth/bank-admin/BankAdminAuth"

// Admin Portal Pages (Super Admin)
import { AdminDashboard } from "@/pages/super-admin/Dashboard"
import { Banks as BankList } from "@/pages/super-admin/Banks"
import { CreateBank } from "@/pages/super-admin/CreateBank"
import { AuditLogs } from "@/pages/super-admin/AuditLogs"
import { PlatformSettings } from "@/pages/super-admin/Settings"
import { DemoRequests } from "@/pages/super-admin/DemoRequests"
import { BankProfile } from "@/pages/bank-admin/dashboard/BankProfile";

// Bank Portal Pages (Bank Admin/Manager/Staff)
import { Branches } from "@/pages/bank-admin/branches/Branches"
import { Staff } from "@/pages/bank-admin/staff/Staff"
import { Customers } from "@/pages/bank-admin/customers/Customers"
import { Loans } from "@/pages/bank-admin/loans/Loans"
import { AccountOpening } from "@/pages/bank-admin/accounts/AccountOpening"
import { UserRights } from "@/pages/bank-admin/user-rights/UserRights"

// Producer Company Pages
// import { MemberDetails } from "@/pages/bank-admin/producer-company/MemberDetails"
// import { ShareCapital } from "@/pages/bank-admin/producer-company/ShareCapital"
import { IntroducedDetails } from "@/pages/bank-admin/producer-company/IntroducedDetails"
// import { AccountCreation } from "@/pages/bank-admin/producer-company/AccountCreation"
import { FixedDeposits } from "@/pages/bank-admin/producer-company/FixedDeposits"
import { RecurringDeposits } from "@/pages/bank-admin/producer-company/RecurringDeposits"
import { Insurance } from "@/pages/bank-admin/producer-company/Insurance"
// import { CashDeposit } from "@/pages/bank-admin/producer-company/CashDeposit"
// import { Withdrawal } from "@/pages/bank-admin/producer-company/Withdrawal"
import { PCPlaceholder } from "@/pages/bank-admin/producer-company/PCPlaceholder"

import { DashboardDispatcher } from "@/pages/dashboard/DashboardDispatcher"

import { ThemeProvider } from "@/components/theme-provider"
import { MainLayout } from "@/layouts/MainLayout"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { initializeTenant } from "@/store/tenantStore"
import { UserRole } from "@/constants/roles"

function App() {
  // Initialize tenant context on app load
  useEffect(() => {
    initializeTenant()
  }, [])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth/super-admin" element={<SuperAdminAuth />} />
          <Route path="/auth/bank-admin" element={<BankAdminAuth />} />
          <Route path="/login" element={<BankAdminAuth />} />

          {/* Protected Routes Container */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              {/* Common Roles Dashboard */}
              <Route path="/dashboard" element={<DashboardDispatcher />} />

              {/* Super Admin Restricted Routes */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.SUPER_ADMIN]} />}>
                <Route path="/super-admin/dashboard" element={<AdminDashboard />} />
                <Route path="/super-admin/banks" element={<BankList />} />
                <Route path="/super-admin/banks/create" element={<CreateBank />} />
                <Route path="/super-admin/audit-logs" element={<AuditLogs />} />
                <Route path="/super-admin/settings" element={<PlatformSettings />} />
                <Route path="/super-admin/demo-requests" element={<DemoRequests />} />
              </Route>

              {/* Producer Company Administrative Routes */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER]} />}>
                {/* <Route path="/bank-admin/producer-company/member-details" element={<MemberDetails />} /> */}
                {/* <Route path="/bank-admin/producer-company/share-capital" element={<ShareCapital />} /> */}
                <Route path="/bank-admin/producer-company/introduced-details" element={<IntroducedDetails />} />
                {/* <Route path="/bank-admin/producer-company/account-creation" element={<AccountCreation />} /> */}
                <Route path="/bank-admin/producer-company/fixed-deposits" element={<FixedDeposits />} />
                <Route path="/bank-admin/producer-company/recurring-deposits" element={<RecurringDeposits />} />
                <Route path="/bank-admin/producer-company/insurance" element={<Insurance />} />

                {/* Additional PC Routes */}
                <Route path="/bank-admin/producer-company/receipts-withdrawal" element={<PCPlaceholder title="Receipts/ Withdrawal" />} />
                <Route path="/bank-admin/producer-company/share-duplicate-prints" element={<PCPlaceholder title="Share And Bonds Duplicate Prints" />} />
                <Route path="/bank-admin/producer-company/surrenders" element={<PCPlaceholder title="Surrenders" />} />
                <Route path="/bank-admin/producer-company/admin-edit" element={<PCPlaceholder title="Admin Level Edit" />} />
                <Route path="/bank-admin/producer-company/collection-reports" element={<PCPlaceholder title="Daily And Monthly Collection Reports" />} />
                <Route path="/bank-admin/producer-company/group-entry" element={<PCPlaceholder title="Group Entry" />} />
                {/* <Route path="/bank-admin/producer-company/cash-deposit" element={<CashDeposit />} /> */}
                {/* <Route path="/bank-admin/producer-company/account-withdrawal" element={<Withdrawal />} /> */}
                <Route path="/bank-admin/producer-company/reports" element={<PCPlaceholder title="Producer Company Reports" />} />
              </Route>

              {/* Bank Administrative Routes (Bank Admin & Managers) */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/branches" element={<Branches />} />
                <Route path="/bank-admin/staff" element={<Staff />} />
                <Route path="/bank-admin/profile" element={<BankProfile />} />
              </Route>

              {/* User Rights — Bank Admin only */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN]} />}>
                <Route path="/bank-admin/user-rights" element={<UserRights />} />
              </Route>

              {/* Operations Routes (Bank Admin, Manager, Cashier, Accountant, etc.) */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER, UserRole.ACCOUNTANT]} />}>
                <Route path="/bank-admin/customers" element={<Customers />} />
                <Route path="/bank-admin/transactions" element={<div className="p-8"><h1>Transaction History</h1><p className="text-muted-foreground">Monitor real-time financial activity</p></div>} />
                <Route path="/bank-admin/loans" element={<Loans />} />
                <Route path="/bank-admin/analytics" element={<div className="p-8"><h1>Bank Performance Analytics</h1><p className="text-muted-foreground">Revenue and growth insights for your bank</p></div>} />
              </Route>

              {/* Account Opening — Front-desk Roles: Cashier, Staff, Manager, Branch Admin, Bank Admin */}
              <Route element={<ProtectedRoute allowedRoles={[
                UserRole.BANK_ADMIN,
                UserRole.BRANCH_ADMIN,
                UserRole.MANAGER,
                UserRole.CASHIER,
                UserRole.STAFF,
              ]} />}>
                <Route path="/bank-admin/accounts" element={<AccountOpening />} />
              </Route>
            </Route>
          </Route>

          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
