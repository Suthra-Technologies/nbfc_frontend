import {
    Home,
    Building2,
    Settings,
    FileText,
    Users,
    CreditCard,
    IndianRupee,
    Briefcase,
    Shield,
    PieChart,
    ChevronRight,
    LogOut,
} from "lucide-react"

import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { UserRole } from "@/constants/roles"

interface MenuItem {
    label: string
    path: string
    icon: React.ElementType
    roles: string[]
}

const MENU_ITEMS: MenuItem[] = [
    // Super Admin Menu
    { label: "Admin Dashboard", path: "/super-admin/dashboard", icon: Home, roles: [UserRole.SUPER_ADMIN] },
    { label: "Bank Management", path: "/super-admin/banks", icon: Building2, roles: [UserRole.SUPER_ADMIN] },
    { label: "Audit Logs", path: "/super-admin/audit-logs", icon: FileText, roles: [UserRole.SUPER_ADMIN] },
    { label: "Platform Settings", path: "/super-admin/settings", icon: Settings, roles: [UserRole.SUPER_ADMIN] },

    // Bank Admin Menu
    { label: "Bank Dashboard", path: "/dashboard", icon: Home, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
    { label: "Manage Branches", path: "/bank-admin/branches", icon: Building2, roles: [UserRole.BRANCH_ADMIN] },
    { label: "Staff & Users", path: "/bank-admin/staff", icon: Users, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
    { label: "Customers", path: "/bank-admin/customers", icon: Users, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER] },
    { label: "Account Openings", path: "/bank-admin/accounts", icon: CreditCard, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.ACCOUNTANT] },
    { label: "Transactions", path: "/bank-admin/transactions", icon: IndianRupee, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER, UserRole.ACCOUNTANT] },
    { label: "Loans & Credit", path: "/bank-admin/loans", icon: Briefcase, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
    { label: "Analytics", path: "/bank-admin/analytics", icon: PieChart, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
]

export function Sidebar() {
    const { user, userRole, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const filteredMenu = MENU_ITEMS.filter((item) => item.roles.includes(userRole))

    const handleLogout = () => {
        const role = userRole;
        logout();
        if (role === UserRole.SUPER_ADMIN) {
            navigate('/auth/super-admin');
        } else {
            navigate('/auth/bank-admin');
        }
    }

    return (
        <aside className="border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-64 flex flex-col h-screen fixed left-0 top-0 transition-all z-20 shadow-lg">
            <div className="h-16 flex items-center px-6 border-b bg-gradient-to-r from-purple-700 to-indigo-800">
                <Shield className="h-6 w-6 text-white mr-2" />
                <span className="font-bold text-lg tracking-tight text-white">CoreBranch</span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto">
                <div className="mb-4">
                    <p className="px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
                        Main Navigation
                    </p>
                    <nav className="space-y-1">
                        {filteredMenu.length > 0 ? (
                            filteredMenu.map((item) => {
                                const isActive = location.pathname.startsWith(item.path)
                                return (
                                    <Link to={item.path} key={item.path}>
                                        <Button
                                            variant={isActive ? "secondary" : "ghost"}
                                            className={cn(
                                                "w-full justify-start relative group transition-all duration-200",
                                                isActive
                                                    ? "bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 border-r-4 border-purple-600 rounded-r-none"
                                                    : "text-muted-foreground hover:bg-purple-50 hover:text-purple-600"
                                            )}
                                        >
                                            <item.icon className={cn(
                                                "mr-3 h-5 w-5 transition-transform duration-200",
                                                isActive ? "scale-110 text-purple-600" : "group-hover:scale-110 group-hover:text-purple-500"
                                            )} />
                                            <span className="font-medium text-sm">{item.label}</span>
                                            {isActive && (
                                                < ChevronRight className="ml-auto h-4 w-4" />
                                            )}
                                        </Button>
                                    </Link>
                                )
                            })
                        ) : (
                            <div className="px-4 py-2 text-xs text-muted-foreground italic">
                                Limited access mode
                            </div>
                        )}
                    </nav>
                </div>
            </div>

            <div className="p-4 border-t bg-muted/20">
                <div className="rounded-xl overflow-hidden shadow-sm border border-purple-100">
                    <div className="bg-purple-600 p-3 text-white">
                        <p className="text-[10px] font-medium opacity-80">Connected as</p>
                        <p className="text-sm font-bold truncate">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div className="bg-white p-3 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">{userRole.replace('_', ' ')}</span>
                            <span className="text-[9px] text-muted-foreground truncate max-w-[100px]">{user?.email}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                            onClick={handleLogout}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-[10px] font-medium text-muted-foreground">© 2024 CoreBranch v3.0</p>
                </div>
            </div>
        </aside>
    )
}
