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

// Bank Portal Pages (Bank Admin/Manager/Staff)
import { Branches } from "@/pages/bank-admin/branches/Branches"
import { Staff } from "@/pages/bank-admin/staff/Staff"
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

              {/* Bank Administrative Routes (Bank Admin & Managers) */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BRANCH_ADMIN, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/branches" element={<Branches />} />
                <Route path="/bank-admin/staff" element={<Staff />} />
              </Route>

              {/* Operations Routes (Bank Admin, Manager, Cashier, Accountant, etc.) */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER, UserRole.ACCOUNTANT]} />}>
                <Route path="/bank-admin/customers" element={<div className="p-8"><h1>Customer Directory</h1><p className="text-muted-foreground">Centralized view of all bank customers</p></div>} />
                <Route path="/bank-admin/accounts" element={<div className="p-8"><h1>Accounts Management</h1><p className="text-muted-foreground">Savings, Current, and Fixed Deposit accounts</p></div>} />
                <Route path="/bank-admin/transactions" element={<div className="p-8"><h1>Transaction History</h1><p className="text-muted-foreground">Monitor real-time financial activity</p></div>} />
                <Route path="/bank-admin/loans" element={<div className="p-8"><h1>Loan Operations</h1><p className="text-muted-foreground">Process applications and manage credit risk</p></div>} />
                <Route path="/bank-admin/analytics" element={<div className="p-8"><h1>Bank Performance Analytics</h1><p className="text-muted-foreground">Revenue and growth insights for your bank</p></div>} />
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
