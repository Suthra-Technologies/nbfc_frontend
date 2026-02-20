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
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "@/constants/roles";
import logo from "../../assets/png/Finware.png";

interface MenuItem {
    label: string;
    path: string;
    icon: React.ElementType;
    roles: string[];
}

const CORE_MENU: MenuItem[] = [
    {
        label: "Overview",
        path: "/dashboard",
        icon: Home,
        roles: [
            UserRole.SUPER_ADMIN,
            UserRole.BRANCH_ADMIN,
            UserRole.MANAGER,
            UserRole.STAFF,
            UserRole.CASHIER,
            UserRole.ACCOUNTANT,
        ],
    },
];

const SUPER_ADMIN_MENU: MenuItem[] = [
    { label: "Bank Management", path: "/super-admin/banks", icon: Building2, roles: [UserRole.SUPER_ADMIN] },
    { label: "Audit Logs", path: "/super-admin/audit-logs", icon: FileText, roles: [UserRole.SUPER_ADMIN] },
    { label: "Settings", path: "/super-admin/settings", icon: Settings, roles: [UserRole.SUPER_ADMIN] },
];

const OPERATIONS_MENU: MenuItem[] = [
    { label: "Manage Branches", path: "/bank-admin/branches", icon: Building2, roles: [UserRole.BRANCH_ADMIN] },
    { label: "Staff Directory", path: "/bank-admin/staff", icon: Users, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
    { label: "Customer Registry", path: "/bank-admin/customers", icon: Users, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER, UserRole.STAFF] },
    { label: "Account Openings", path: "/bank-admin/accounts", icon: CreditCard, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.ACCOUNTANT] },
    { label: "Financial Ledger", path: "/bank-admin/transactions", icon: IndianRupee, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER, UserRole.CASHIER, UserRole.ACCOUNTANT] },
    { label: "Loan Portfolio", path: "/bank-admin/loans", icon: Briefcase, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
];

const INSIGHTS_MENU: MenuItem[] = [
    { label: "Performance Analytics", path: "/bank-admin/analytics", icon: PieChart, roles: [UserRole.BRANCH_ADMIN, UserRole.MANAGER] },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { user, userRole, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isSuperAdmin = userRole === UserRole.SUPER_ADMIN;

    const filterMenu = (menu: MenuItem[]) => menu.filter((item) => item.roles.includes(userRole ?? ""));

    const coreItems = filterMenu(CORE_MENU);
    const superAdminItems = filterMenu(SUPER_ADMIN_MENU);
    const operationsItems = filterMenu(OPERATIONS_MENU);
    const insightsItems = filterMenu(INSIGHTS_MENU);

    const handleLogout = () => {
        logout();
        navigate(isSuperAdmin ? "/auth/super-admin" : "/auth/bank-admin", { replace: true });
    };

    const renderMenuItems = (items: MenuItem[], title: string) => {
        if (items.length === 0) return null;

        return (
            <div className="mb-6 animate-fade-in">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    {title}
                </p>
                <nav className="space-y-1">
                    {items.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link to={item.path} key={item.path} onClick={onClose}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "group relative w-full justify-start h-11 px-3 transition-all duration-250 ease-out",
                                        isActive
                                            ? "bg-[#009BB0]/10 text-[#009BB0] border-r-4 border-[#009BB0] rounded-r-none shadow-sm"
                                            : "text-slate-600 hover:bg-[#009BB0]/5 hover:text-[#009BB0] hover:shadow-sm hover:translate-x-1"
                                    )}
                                >
                                    <item.icon
                                        className={cn(
                                            "mr-3 h-5 w-5 transition-all duration-250",
                                            isActive
                                                ? "scale-110 text-[#009BB0]"
                                                : "group-hover:scale-110 group-hover:text-[#009BB0]"
                                        )}
                                    />
                                    <span className="font-medium text-sm">{item.label}</span>

                                    {isActive && (
                                        <ChevronRight className="ml-auto h-4 w-4 text-[#009BB0] opacity-70 animate-pulse-slow" />
                                    )}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        );
    };

    return (
        <aside
            className={cn(
                "border-r bg-white w-64 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.04)]",
                "animate-slide-in-left lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            {/* Header / Logo */}
            <div className="h-16 flex items-center px-6 border-b bg-gradient-to-r from-white to-[#009BB0]/5 relative">
                <div
                    className={cn(
                        "flex items-center justify-center w-full h-full rounded-lg text-white shadow-sm transition-transform duration-300 hover:scale-110"
                    )}
                >
                    <img
                        src={logo}
                        alt="CoreBranch Logo"
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Close Button for Mobile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden absolute right-2 text-slate-400 hover:text-slate-600"
                    onClick={onClose}
                >
                    <ChevronRight className="h-5 w-5 rotate-180" />
                </Button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {renderMenuItems(coreItems, "Core Interface")}
                {renderMenuItems(superAdminItems, "Platform Control")}
                {renderMenuItems(operationsItems, "Branch Operations")}
                {renderMenuItems(insightsItems, "Data Insights")}
            </div>

            {/* Footer / User Info */}
            <div className="p-4 border-t bg-gradient-to-t from-[#009BB0]/5 to-transparent">
                <div className="rounded-xl overflow-hidden shadow-md border border-[#009BB0]/10">
                    <div className="bg-[#009BB0] px-4 py-3 text-white">
                        <p className="text-[10px] font-medium opacity-85">Connected as</p>
                        <p className="text-sm font-semibold truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                    </div>
                    <div className="bg-white px-4 py-3 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-[#F18422]">
                                {userRole?.replace(/_/g, " ") || "Role"}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                                {user?.email || "—"}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-500 hover:text-red-600 hover:bg-red-50/80 transition-colors"
                            onClick={handleLogout}
                            aria-label="Sign out"
                        >
                            <LogOut className="h-4.5 w-4.5" />
                        </Button>
                    </div>
                </div>

                <p className="mt-5 text-center text-[10px] text-slate-400">
                    © {new Date().getFullYear()} CoreBranch
                </p>
            </div>
        </aside>
    );
}