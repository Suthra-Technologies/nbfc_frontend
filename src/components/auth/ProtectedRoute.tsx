import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { UserRole } from "@/constants/roles"

interface ProtectedRouteProps {
    allowedRoles?: UserRole[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, userRole } = useAuth()
    const location = useLocation()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="h-8 w-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        // Redirect to the appropriate login page
        const loginPath = location.pathname.startsWith('/super-admin')
            ? "/auth/super-admin"
            : "/auth/bank-admin"

        return <Navigate to={loginPath} state={{ from: location }} replace />
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        // User is authenticated but doesn't have the right role
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
