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
import { ShareCapital } from "@/pages/bank-admin/producer-company/ShareCapital"
import { IntroducedDetails } from "@/pages/bank-admin/producer-company/IntroducedDetails"
// import { AccountCreation } from "@/pages/bank-admin/producer-company/AccountCreation"
import { FixedDeposits } from "@/pages/bank-admin/producer-company/FixedDeposits"
import { RecurringDeposits } from "@/pages/bank-admin/producer-company/RecurringDeposits"
import { Insurance } from "@/pages/bank-admin/producer-company/Insurance"
// import { CashDeposit } from "@/pages/bank-admin/producer-company/CashDeposit"
// import { Withdrawal } from "@/pages/bank-admin/producer-company/Withdrawal"
import MemberDetails from "./pages/bank-admin/producer-company/MemberDetails";
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

              {/* System Administration Restricted Routes */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/user-rights" element={<UserRights />} />
              </Route>
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN]} />}>
                <Route path="/bank-admin/admin" element={<PCPlaceholder title="System Administration" />} />
                <Route path="/bank-admin/admin/date-lock" element={<PCPlaceholder title="Date Lock & Unlock" />} />
                <Route path="/bank-admin/admin/audit-logs" element={<PCPlaceholder title="Bank Audit Logs" />} />
              </Route>

              {/* Branch Operations & Staff - Bank Admin, Branch Admin, Manager */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/branches" element={<Branches />} />
                <Route path="/bank-admin/staff" element={<Staff />} />
                <Route path="/bank-admin/profile" element={<BankProfile />} />
              </Route>

              {/* Producer Company - Focused Administrative Routes */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/producer-company" element={<PCPlaceholder title="Producer Company Operations" />} />
                <Route path="/bank-admin/producer-company/member-details" element={<MemberDetails />} />
                <Route path="/bank-admin/producer-company/share-capital" element={<ShareCapital />} />
                <Route path="/bank-admin/producer-company/introduced-details" element={<IntroducedDetails />} />
                <Route path="/bank-admin/producer-company/bank-creation" element={<PCPlaceholder title="Savings/Current Account Creation" />} />
                <Route path="/bank-admin/producer-company/fixed-deposits" element={<FixedDeposits />} />
                <Route path="/bank-admin/producer-company/recurring-deposits" element={<RecurringDeposits />} />
                <Route path="/bank-admin/producer-company/insurance" element={<Insurance />} />
                <Route path="/bank-admin/producer-company/group-entry" element={<PCPlaceholder title="Group Entry" />} />
                <Route path="/bank-admin/producer-company/surrenders" element={<PCPlaceholder title="Surrenders & Maturities" />} />
                <Route path="/bank-admin/producer-company/passbook" element={<PCPlaceholder title="Passbook & Regeneration" />} />
                <Route path="/bank-admin/producer-company/bonds" element={<PCPlaceholder title="Share & Bonds Prints" />} />

                {/* PC Cash/Receipts for Bank Admin, Manager, Cashier */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.MANAGER, UserRole.CASHIER]} />}>
                  <Route path="/bank-admin/producer-company/cash-operations" element={<PCPlaceholder title="Cash Deposit / Withdrawal" />} />
                  <Route path="/bank-admin/producer-company/receipts" element={<PCPlaceholder title="Receipts & Vouchers" />} />
                  <Route path="/bank-admin/producer-company/rd-receipt" element={<PCPlaceholder title="Recurring Deposit Receipt" />} />
                  <Route path="/bank-admin/producer-company/passbook-cancel" element={<PCPlaceholder title="Passbook Cancellation" />} />
                  <Route path="/bank-admin/producer-company/fd-monthly" element={<PCPlaceholder title="FD Monthly Payment" />} />
                  <Route path="/bank-admin/producer-company/app-receipts" element={<PCPlaceholder title="Trim or Mobile App Receipts" />} />
                  <Route path="/bank-admin/producer-company/share-withdrawal" element={<PCPlaceholder title="Share Capital Withdrawal" />} />
                  <Route path="/bank-admin/producer-company/bonds/print" element={<PCPlaceholder title="Bonds Print" />} />
                  <Route path="/bank-admin/producer-company/bonds/duplicate" element={<PCPlaceholder title="Duplicate Bonds Print" />} />
                  <Route path="/bank-admin/producer-company/cash-deposit" element={<PCPlaceholder title="Cash Deposit" />} />
                  <Route path="/bank-admin/producer-company/withdrawal" element={<PCPlaceholder title="Withdrawal" />} />
                </Route>

                {/* PC Reports for Bank Admin, Accountant */}
                <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.ACCOUNTANT]} />}>
                  <Route path="/bank-admin/reports/producer/members" element={<PCPlaceholder title="PC Member Reports" />} />
                  <Route path="/bank-admin/reports/producer/members/wise" element={<PCPlaceholder title="Member Wise Details Report" />} />
                  <Route path="/bank-admin/reports/producer/members/details" element={<PCPlaceholder title="Member Details Report" />} />
                  <Route path="/bank-admin/reports/producer/members/search" element={<PCPlaceholder title="Member Details Search" />} />
                  <Route path="/bank-admin/reports/producer/members/group" element={<PCPlaceholder title="Group Details Report" />} />
                  <Route path="/bank-admin/reports/producer/members/statement" element={<PCPlaceholder title="Member Account Statement" />} />
                  <Route path="/bank-admin/reports/producer/members/maturity" element={<PCPlaceholder title="Monthly Maturity Details" />} />
                  <Route path="/bank-admin/reports/producer/members/passbook-cancel" element={<PCPlaceholder title="Passbook Cancellation" />} />

                  <Route path="/bank-admin/reports/producer/deposits" element={<PCPlaceholder title="PC Deposit Reports" />} />
                  <Route path="/bank-admin/reports/producer/deposits/rd-installments" element={<PCPlaceholder title="RD Instalments Report" />} />
                  <Route path="/bank-admin/reports/producer/deposits/fd-details" element={<PCPlaceholder title="FD Details Report" />} />
                  <Route path="/bank-admin/reports/producer/deposits/rd-renewal" element={<PCPlaceholder title="RD Renewal Details" />} />
                  <Route path="/bank-admin/reports/producer/deposits/rd-advance" element={<PCPlaceholder title="RD Instalments Advance Paid List" />} />
                  <Route path="/bank-admin/reports/producer/deposits/rd-due" element={<PCPlaceholder title="RD Due Instalments Report" />} />
                  <Route path="/bank-admin/reports/producer/deposits/fd-interest" element={<PCPlaceholder title="FD Monthly Interest Payment Report" />} />
                  <Route path="/bank-admin/reports/producer/deposits/saving-statement" element={<PCPlaceholder title="Saving Account Statement" />} />
                  <Route path="/bank-admin/reports/producer/deposits/details" element={<PCPlaceholder title="Deposits And Withdrawal Details" />} />
                  <Route path="/bank-admin/reports/producer/deposits/fd-cumulative" element={<PCPlaceholder title="FD Cumulative Interest Details" />} />
                  <Route path="/bank-admin/reports/producer/deposits/withdrawal" element={<PCPlaceholder title="Saving or Share Withdrawal Details" />} />
                  <Route path="/bank-admin/reports/producer/deposits/receipt-delete" element={<PCPlaceholder title="Receipts Delete Report" />} />
                  <Route path="/bank-admin/reports/producer/deposits/interest-cert" element={<PCPlaceholder title="Deposit Interest Certificate" />} />

                  <Route path="/bank-admin/reports/producer/collection/day-closing" element={<PCPlaceholder title="Day Closing Report" />} />
                  <Route path="/bank-admin/reports/producer/collection/mobile-app" element={<PCPlaceholder title="Mobile App Collection Report" />} />
                  <Route path="/bank-admin/reports/producer/collections" element={<PCPlaceholder title="Daily/Monthly Collection Reports" />} />
                </Route>
              </Route>

              {/* Loan Management Lifecycle - Admin, Manager, etc. */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/loans" element={<Loans />} />
                <Route path="/bank-admin/loans/applications" element={<PCPlaceholder title="Loan Applications" />} />
                <Route path="/bank-admin/loans/applicants" element={<PCPlaceholder title="Applicant Registry" />} />
                <Route path="/bank-admin/loans/guarantors" element={<PCPlaceholder title="Guarantor Details" />} />
                <Route path="/bank-admin/loans/vehicle-mgmt" element={<PCPlaceholder title="DO & Vehicle Management" />} />
                <Route path="/bank-admin/loans/approvals" element={<PCPlaceholder title="Approvals & Processing" />} />
                <Route path="/bank-admin/loans/disbursal" element={<PCPlaceholder title="Disbursal / EMI Receipt" />} />
                <Route path="/bank-admin/loans/pre-closure" element={<PCPlaceholder title="Loan Pre-Closure" />} />
                <Route path="/bank-admin/loans/notices" element={<PCPlaceholder title="Notices & Letters" />} />
                <Route path="/bank-admin/loans/dms" element={<PCPlaceholder title="Document Management (DMS)" />} />
                <Route path="/bank-admin/loans/dms/tx" element={<PCPlaceholder title="Document Transactions" />} />
                <Route path="/bank-admin/loans/calculator" element={<PCPlaceholder title="EMI Calculator" />} />
                <Route path="/bank-admin/loans/gold-loan" element={<PCPlaceholder title="Gold Loan Performance" />} />
                <Route path="/bank-admin/loans/pre-closure-final" element={<PCPlaceholder title="Loan Pre-Closure (Final)" />} />
                <Route path="/bank-admin/reports/loans" element={<PCPlaceholder title="Loan Dues Reports" />} />
              </Route>

              {/* Financial Accounting & Ledger */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.ACCOUNTANT]} />}>
                <Route path="/bank-admin/accounting" element={<PCPlaceholder title="Financial Accounting" />} />
                <Route path="/bank-admin/accounting/masters" element={<PCPlaceholder title="Financial Masters" />} />
                <Route path="/bank-admin/accounting/masters/subcategory" element={<PCPlaceholder title="SubCategory Master" />} />
                <Route path="/bank-admin/accounting/masters/bank-info" element={<PCPlaceholder title="Bank Information Master" />} />
                <Route path="/bank-admin/accounting/masters/cheque-mgmt" element={<PCPlaceholder title="Cheque Management Master" />} />
                <Route path="/bank-admin/accounting/masters/dealer-incentive" element={<PCPlaceholder title="Dealer Incentive Master" />} />
                <Route path="/bank-admin/accounting/masters/employee-info" element={<PCPlaceholder title="Employee Information Master" />} />

                <Route path="/bank-admin/accounting/vouchers" element={<PCPlaceholder title="Payment/Journal Vouchers" />} />
                <Route path="/bank-admin/accounting/vouchers/receipt" element={<PCPlaceholder title="General Receipt Voucher" />} />
                <Route path="/bank-admin/accounting/vouchers/payment" element={<PCPlaceholder title="Payment Voucher" />} />
                <Route path="/bank-admin/accounting/vouchers/journal" element={<PCPlaceholder title="Journal Voucher" />} />

                <Route path="/bank-admin/accounting/bank-entries" element={<PCPlaceholder title="Bank Entries" />} />
                <Route path="/bank-admin/accounting/cheques-hand" element={<PCPlaceholder title="Cheques on Hand" />} />
                <Route path="/bank-admin/accounting/cheques-bank" element={<PCPlaceholder title="Cheques in Bank" />} />
                <Route path="/bank-admin/accounting/cheques-issued" element={<PCPlaceholder title="Cheques Issued" />} />
                <Route path="/bank-admin/accounting/vehicle-seized" element={<PCPlaceholder title="Vehicle Seized Transactions" />} />

                <Route path="/bank-admin/accounting/books" element={<PCPlaceholder title="Bank & Cash Books" />} />
                <Route path="/bank-admin/accounting/cheques" element={<PCPlaceholder title="Cheque Management" />} />
                <Route path="/bank-admin/accounting/seizures" element={<PCPlaceholder title="Vehicle Seizures" />} />

                <Route path="/bank-admin/reports/ledgers" element={<PCPlaceholder title="Ledger Statements" />} />
                <Route path="/bank-admin/reports/ledgers/account" element={<PCPlaceholder title="Account Ledger Report" />} />
                <Route path="/bank-admin/reports/ledgers/bank-book" element={<PCPlaceholder title="Bank Book Report" />} />
                <Route path="/bank-admin/reports/ledgers/brs" element={<PCPlaceholder title="BRS Report" />} />
                <Route path="/bank-admin/reports/ledgers/brs-statements" element={<PCPlaceholder title="BRS Statements Report" />} />
                <Route path="/bank-admin/reports/ledgers/cash" element={<PCPlaceholder title="Cash Transactions Report" />} />
                <Route path="/bank-admin/reports/ledgers/cheque-cancel" element={<PCPlaceholder title="Cheque Cancel Report" />} />
                <Route path="/bank-admin/reports/ledgers/cheque-enquiry" element={<PCPlaceholder title="Cheque Enquiry Report" />} />
                <Route path="/bank-admin/reports/ledgers/cheque-returns" element={<PCPlaceholder title="Cheque Returns Report" />} />
                <Route path="/bank-admin/reports/ledgers/day-book" element={<PCPlaceholder title="Day Book Report" />} />
                <Route path="/bank-admin/reports/ledgers/advises" element={<PCPlaceholder title="Duplicate Advises Report" />} />
                <Route path="/bank-admin/reports/ledgers/vouchers" element={<PCPlaceholder title="Duplicate Voucher Report" />} />
                <Route path="/bank-admin/reports/ledgers/issued-cheques" element={<PCPlaceholder title="Issued Cheques Report" />} />
                <Route path="/bank-admin/reports/ledgers/summary" element={<PCPlaceholder title="Ledger Summary Report" />} />
                <Route path="/bank-admin/reports/ledgers/jv-list" element={<PCPlaceholder title="JV List Report" />} />
                <Route path="/bank-admin/reports/ledgers/vehicle-invoice" element={<PCPlaceholder title="Vehicle Invoice Status Report" />} />
                <Route path="/bank-admin/reports/ledgers/vehicle-seizure" element={<PCPlaceholder title="Vehicle Seizure Status Report" />} />
                <Route path="/bank-admin/reports/ledgers/statement" element={<PCPlaceholder title="Account Statement Report" />} />

                <Route path="/bank-admin/transactions" element={<div className="p-8"><h1>Financial Transaction Ledger</h1><p className="text-muted-foreground">Monitor real-time financial activity</p></div>} />
              </Route>

              {/* MIS, Analytics & Reporting */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.ACCOUNTANT, UserRole.MANAGER]} />}>
                <Route path="/bank-admin/analytics" element={<PCPlaceholder title="MIS & Analytics" />} />
                <Route path="/bank-admin/analytics/mis" element={<PCPlaceholder title="MIS Reports" />} />
                <Route path="/bank-admin/analytics/consolidated" element={<PCPlaceholder title="Consolidated Reports" />} />
                <Route path="/bank-admin/analytics/performance" element={<div className="p-8"><h1>Performance Analytics</h1><p className="text-muted-foreground">Revenue and growth insights</p></div>} />
                <Route path="/bank-admin/reports/trial-balance" element={<PCPlaceholder title="Trial Balance" />} />
                <Route path="/bank-admin/reports/trial-balance-comp" element={<PCPlaceholder title="Comparison TB" />} />
                <Route path="/bank-admin/reports/trial-balance-sched" element={<PCPlaceholder title="Schedule TB" />} />
                <Route path="/bank-admin/reports/balance-sheet" element={<PCPlaceholder title="Balance Sheet" />} />
                <Route path="/bank-admin/reports/profit-loss" element={<PCPlaceholder title="Profit & Loss" />} />
                <Route path="/bank-admin/reports/consolidated" element={<PCPlaceholder title="Consolidated Financials" />} />
                <Route path="/bank-admin/reports/consolidated/trial-balance" element={<PCPlaceholder title="Trial Balance" />} />
                <Route path="/bank-admin/reports/consolidated/trial-balance-comp" element={<PCPlaceholder title="Comparison TB" />} />
                <Route path="/bank-admin/reports/consolidated/trial-balance-sched" element={<PCPlaceholder title="Schedule TB" />} />
                <Route path="/bank-admin/reports/consolidated/balance-sheet" element={<PCPlaceholder title="Balance Sheet" />} />
                <Route path="/bank-admin/reports/consolidated/profit-loss" element={<PCPlaceholder title="Profit & Loss" />} />
                <Route path="/bank-admin/reports/day-closing" element={<PCPlaceholder title="Day Closing Details" />} />
                <Route path="/bank-admin/reports/documents" element={<PCPlaceholder title="Document Management Reports" />} />
                <Route path="/bank-admin/reports/collections" element={<PCPlaceholder title="Collection Management" />} />
                <Route path="/bank-admin/reports/collections/receipt-paid" element={<PCPlaceholder title="Loan Receipt Paid details" />} />
                <Route path="/bank-admin/reports/collections/disbursed-closed" element={<PCPlaceholder title="Loan Disbursed & Closed" />} />
                <Route path="/bank-admin/reports/collections/loan-dues" element={<PCPlaceholder title="Loan Wise Dues" />} />
                <Route path="/bank-admin/reports/collections/dues-summary" element={<PCPlaceholder title="Loan Wise Dues Summary" />} />
                <Route path="/bank-admin/reports/collections/details" element={<PCPlaceholder title="Collection Details" />} />
                <Route path="/bank-admin/reports/collections/vehicle-dues" element={<PCPlaceholder title="Vehicle Loan Dues" />} />
                <Route path="/bank-admin/reports/collections/interest" element={<PCPlaceholder title="Interest Collection Loans" />} />
                <Route path="/bank-admin/reports/collections/day-closing" element={<PCPlaceholder title="Loan Wise Day Closing Report" />} />
                <Route path="/bank-admin/reports/collections/gold-dues" element={<PCPlaceholder title="Gold Loan Dues Report" />} />
              </Route>

              {/* Customers & Basic Operations */}
              <Route element={<ProtectedRoute allowedRoles={[UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER, UserRole.STAFF]} />}>
                <Route path="/bank-admin/customers" element={<Customers />} />
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
