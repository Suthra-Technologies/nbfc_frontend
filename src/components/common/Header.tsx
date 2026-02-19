import {
    Bell,
    LogOut,
    User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/common/ModeToggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { UserRole } from "@/constants/roles"

export function Header() {
    const navigate = useNavigate();
    const { user, userRole, logout } = useAuth();

    const handleLogout = () => {
        const role = userRole;
        logout();
        if (role === UserRole.SUPER_ADMIN) {
            navigate('/auth/super-admin');
        } else {
            navigate('/auth/bank-admin');
        }
    };

    const getInitials = () => {
        if (!user) return "?";
        const first = user.firstName ? user.firstName[0] : "";
        const last = user.lastName ? user.lastName[0] : "";
        return (first + last).toUpperCase() || (user.email ? user.email[0].toUpperCase() : "?");
    }

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-4 border-b bg-background/95 backdrop-blur px-6 shadow-sm supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold tracking-tight">CoreBranch Admin</h1>
                </div>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <ModeToggle />

                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600"></span>
                    <span className="sr-only">Notifications</span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="gap-2 h-10 px-2 rounded-full hover:bg-muted transition-all">
                            <Avatar className="h-8 w-8 border border-purple-100 shadow-sm">
                                <AvatarFallback className="bg-purple-600 text-white text-xs font-bold">
                                    {getInitials()}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block text-left">
                                <p className="text-xs font-bold text-slate-900 leading-none">{user?.firstName} {user?.lastName}</p>
                                <p className="text-[10px] text-muted-foreground mt-1 leading-none">{userRole.replace('_', ' ')}</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2 shadow-xl border-purple-50">
                        <DropdownMenuLabel className="font-bold text-xs uppercase tracking-wider text-slate-400">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4 text-purple-600" />
                            <span>Profile Details</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer focus:bg-red-50 focus:text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span className="font-semibold">Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
