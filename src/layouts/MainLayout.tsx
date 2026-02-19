import { useEffect } from "react"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { Sidebar } from "@/components/common/Sidebar"
import { Header } from "@/components/common/Header"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

export function MainLayout() {
    const { isAuthenticated, isLoading } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            if (location.pathname.startsWith('/super-admin')) {
                navigate("/auth/super-admin")
            } else {
                navigate("/auth/bank-admin")
            }
        }
    }, [isAuthenticated, navigate, location.pathname])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="h-8 w-8 border-4 border-slate-200 border-t-purple-600 rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAuthenticated) return null // Prevent flash

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-foreground">
            <Sidebar />
            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out ml-64"
                )}
            >
                <Header />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </div>
    )
}
