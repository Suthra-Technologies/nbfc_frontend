import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "@/components/common/Sidebar"
import { Header } from "@/components/common/Header"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"

export function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
    const closeSidebar = () => setIsSidebarOpen(false)

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-foreground">
            {/* Sidebar with mobile state */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Mobile Backdrop Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-10 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
                    onClick={closeSidebar}
                />
            )}

            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-300 ease-in-out",
                    "lg:ml-80" // Offset only on large screens
                )}
            >
                <Header onMenuClick={toggleSidebar} />
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
            <Toaster />
        </div>
    )
}
