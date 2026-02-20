import { useAuth } from "@/hooks/useAuth"
import { UserRole } from "@/constants/roles"
import { AdminDashboard } from "@/pages/super-admin/Dashboard"
import { BankAdminDashboard } from "@/pages/bank-admin/dashboard/BankAdminDashboard"
import { Navigate } from "react-router-dom"

export function DashboardDispatcher() {
    const { userRole } = useAuth()

    switch (userRole) {
        case UserRole.SUPER_ADMIN:
            return <AdminDashboard />
        case UserRole.BRANCH_ADMIN:
            return <BankAdminDashboard />
        case UserRole.MANAGER:
            return <ManagerDashboard />
        case UserRole.STAFF:
        case UserRole.CASHIER:
        case UserRole.ACCOUNTANT:
            return <StaffDashboard />
        default:
            return <Navigate to="/login" replace />
    }
}

// Internal placeholder for Manager Dashboard
function ManagerDashboard() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Manager Dashboard</h1>
                <p className="text-slate-500">Overview of branch operations and staff performance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-32 flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Branch Performance</p>
                    <p className="text-2xl font-bold text-indigo-600 mt-1">94% Target Achieved</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-32 flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Staff</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">12 On Duty</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-32 flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approvals</p>
                    <p className="text-2xl font-bold text-amber-600 mt-1">8 Requests</p>
                </div>
            </div>
        </div>
    )
}

// Internal placeholder for Staff Dashboard
function StaffDashboard() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff Terminal</h1>
                <p className="text-slate-500">Manage daily transactions and customer queries.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-indigo-600 rounded-3xl text-white shadow-lg shadow-indigo-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">My Today's Log</p>
                    <p className="text-3xl font-bold">₹ 4.5 Lakhs</p>
                    <p className="text-sm mt-4 opacity-90 italic">Processed 24 transactions today</p>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Access</p>
                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">New Deposit</div>
                        <div className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">Withdrawal</div>
                        <div className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600">Mini Statement</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
