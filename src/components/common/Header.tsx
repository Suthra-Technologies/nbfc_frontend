import {
    Bell,
    LogOut,
    User,
    ChevronDown,
    Search,
    Building2,
    Users,
    Plus,
    Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/constants/roles";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { demoRequestService } from "@/services/demo-request.service";

interface HeaderProps {
    onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
    const navigate = useNavigate();
    const { user, userRole, logout } = useAuth() ?? {
        user: null,
        userRole: null,
        logout: () => { },
    };

    const isSuperAdmin = userRole === UserRole.SUPER_ADMIN;
    // Adjust conditions based on your actual roles enum/logic
    const isBankAdmin = userRole === UserRole.BRANCH_ADMIN; // ← add this role if needed
    const isManager = userRole === UserRole.MANAGER || (!isSuperAdmin && !isBankAdmin);

    const safeUser = user ?? { firstName: "", lastName: "", email: "" };
    const displayName =
        [safeUser.firstName, safeUser.lastName].filter(Boolean).join(" ").trim() || "Admin";

    const getInitials = () => {
        const { firstName, lastName, email } = safeUser;
        const first = firstName?.[0] ?? "";
        const last = lastName?.[0] ?? "";
        const emailChar = email?.[0] ?? "";
        return (first + last).toUpperCase() || emailChar.toUpperCase() || "?";
    };

    const handleLogout = () => {
        logout();
        setTimeout(() => {
            navigate(isSuperAdmin ? "/auth/super-admin" : "/auth/bank-admin", { replace: true });
        }, 50);
    };

    const roleDisplay = userRole
        ? userRole
            .replace(/_/g, " ")
            .toLowerCase()
            .replace(/\b\w/g, (c) => c.toUpperCase())
        : "Unknown";

    // Optional: real search handling (you can connect to query params or context)
    const [searchQuery, setSearchQuery] = useState("");
    const [demoUnreadCount, setDemoUnreadCount] = useState(0);

    // Poll unread demo request count for super admin
    useEffect(() => {
        if (!isSuperAdmin) return;
        const fetchCount = async () => {
            try {
                const count = await demoRequestService.getUnreadCount();
                setDemoUnreadCount(count);
            } catch (_) { }
        };
        fetchCount();
        const interval = setInterval(fetchCount, 30000);
        return () => clearInterval(interval);
    }, [isSuperAdmin]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Example: navigate to search results
            // navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            console.log("Searching for:", searchQuery);
        }
    };

    // Determine button text/icon/path based on role
    let actionButton = null;
    if (isSuperAdmin) {
        actionButton = (
            <Button
                onClick={() => navigate("/super-admin/banks/create")}
                className="gap-1.5 bg-[#009BB0] hover:bg-[#008da0] text-white shadow-sm transition-all"
            >
                <Plus className="h-4 w-4" />
                Add Bank
            </Button>
        );
    } else if (isBankAdmin) {
        actionButton = (
            <Button
                onClick={() => navigate("/bank-admin/branches/new")}
                className="gap-1.5 bg-[#009BB0] hover:bg-[#008da0] text-white shadow-sm transition-all"
            >
                <Building2 className="h-4 w-4" />
                Add Branch
            </Button>
        );
    } else if (isManager) {
        actionButton = (
            <Button
                onClick={() => navigate("/manager/customers/new")}
                className="gap-1.5 bg-[#009BB0] hover:bg-[#008da0] text-white shadow-sm transition-all"
            >
                <Users className="h-4 w-4" />
                Add Customer
            </Button>
        );
    }

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-xl",
                "supports-[backdrop-filter]:bg-white/70"
            )}
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                {/* Left – Branding */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden text-gray-600 hover:text-[#009BB0]"
                        onClick={onMenuClick}
                        aria-label="Toggle Menu"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-semibold shadow-sm",
              isSuperAdmin ? "bg-[#009BB0]" : "bg-[#F18422]"
            )}
          >
            {isSuperAdmin ? "P" : "B"}
          </div> */}

                    {/* <h1 className="hidden sm:block text-lg font-semibold tracking-tight text-gray-900">
            {isSuperAdmin ? "Platform Control" : "Bank Operations"}
          </h1> */}
                    {/* Center – Search */}
                    <form
                        onSubmit={handleSearch}
                        className=" max-w-md mx-4 hidden md:flex items-center relative"
                    >
                        <Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
                        <Input
                            type="search"
                            placeholder="Search customers, branches, transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-white/70 border-gray-200 focus-visible:ring-[#009BB0]/50 focus-visible:border-[#009BB0]/70 transition-colors"
                        />
                    </form>
                </div>



                {/* Right – Controls + Action Button */}
                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
                    {/* Mobile search icon (optional) */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-600 hover:text-[#009BB0]"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" />
                    </Button>

                    {/* <ModeToggle /> */}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => isSuperAdmin && navigate("/super-admin/demo-requests")}
                        className="relative text-gray-600 hover:text-[#009BB0] hover:bg-gray-100/70 transition-colors"
                        aria-label="Notifications"
                    >
                        <Bell className="h-5 w-5" />
                        {(isSuperAdmin ? demoUnreadCount : 0) > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F18422] text-[10px] font-bold text-white shadow animate-pulse">
                                {demoUnreadCount > 9 ? '9+' : demoUnreadCount}
                            </span>
                        )}
                    </Button>

                    {actionButton}

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "group h-10 gap-2.5 rounded-full px-2.5 hover:bg-gray-100/70 transition-colors",
                                    "focus-visible:ring-2 focus-visible:ring-[#009BB0]/50 focus-visible:ring-offset-2 focus-visible:outline-none"
                                )}
                                aria-label="User menu"
                            >
                                <Avatar className="h-8 w-8 border border-gray-200 shadow-sm transition-transform group-hover:scale-105">
                                    <AvatarFallback
                                        className={cn(
                                            "text-white text-xs font-semibold uppercase",
                                            isSuperAdmin ? "bg-[#009BB0]" : "bg-[#F18422]"
                                        )}
                                    >
                                        {getInitials()}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="hidden lg:flex flex-col items-start text-left min-w-[140px]">
                                    <span className="text-sm font-medium leading-none text-gray-900">
                                        {displayName}
                                    </span>
                                    <span className="mt-0.5 text-xs text-gray-500 capitalize">
                                        {roleDisplay}
                                    </span>
                                </div>

                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 text-gray-400 transition-transform",
                                        "group-hover:text-[#009BB0] group-data-[state=open]:rotate-180"
                                    )}
                                />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            sideOffset={8}
                            className="w-64 rounded-xl border border-gray-200 bg-white/95 shadow-2xl backdrop-blur-sm"
                        >
                            <DropdownMenuLabel className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                                Account
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator className="bg-gray-100" />

                            <DropdownMenuItem className="gap-2.5 px-4 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-[#009BB0] cursor-pointer transition-colors">
                                <User className="h-4 w-4" />
                                <span>Profile & Settings</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-gray-100" />

                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 cursor-pointer transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="font-medium">Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}