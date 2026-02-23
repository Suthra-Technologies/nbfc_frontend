import { useState, useEffect, useCallback } from "react";
import { demoRequestService } from "@/services/demo-request.service";
import type { DemoRequest } from "@/services/demo-request.service";
import {
    Calendar,
    Mail,
    Phone,
    Building2,
    CheckCircle2,
    XCircle,
    Clock,
    Trash2,
    Eye,
    RefreshCcw,
    MessageSquare,
    ChevronDown,
    Search,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<
    string,
    { label: string; color: string; icon: React.ElementType }
> = {
    pending: {
        label: "Pending",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        icon: Clock,
    },
    contacted: {
        label: "Contacted",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: Phone,
    },
    scheduled: {
        label: "Scheduled",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
        icon: Calendar,
    },
    completed: {
        label: "Completed",
        color: "bg-emerald-100 text-emerald-800 border-emerald-200",
        icon: CheckCircle2,
    },
    rejected: {
        label: "Rejected",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: XCircle,
    },
};

const ALL_STATUSES = ["pending", "contacted", "scheduled", "completed", "rejected"];

export function DemoRequests() {
    const [requests, setRequests] = useState<DemoRequest[]>([]);
    const [filtered, setFiltered] = useState<DemoRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [selectedRequest, setSelectedRequest] = useState<DemoRequest | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            const data = await demoRequestService.getAll();
            setRequests(data);
        } catch (err) {
            console.error("Failed to fetch demo requests", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    useEffect(() => {
        let data = [...requests];
        if (statusFilter !== "all") {
            data = data.filter((r) => r.status === statusFilter);
        }
        if (search.trim()) {
            const q = search.toLowerCase();
            data = data.filter(
                (r) =>
                    r.fullName.toLowerCase().includes(q) ||
                    r.email.toLowerCase().includes(q) ||
                    r.organization.toLowerCase().includes(q)
            );
        }
        setFiltered(data);
    }, [requests, search, statusFilter]);

    const handleView = async (req: DemoRequest) => {
        setSelectedRequest(req);
        setDetailOpen(true);
        if (!req.isRead) {
            try {
                await demoRequestService.markAsRead(req._id);
                setRequests((prev) =>
                    prev.map((r) => (r._id === req._id ? { ...r, isRead: true } : r))
                );
            } catch (_) { }
        }
    };

    const handleStatusChange = async (id: string, status: DemoRequest["status"]) => {
        try {
            const updated = await demoRequestService.updateStatus(id, status);
            setRequests((prev) => prev.map((r) => (r._id === id ? updated : r)));
            if (selectedRequest?._id === id) {
                setSelectedRequest(updated);
            }
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await demoRequestService.delete(id);
            setRequests((prev) => prev.filter((r) => r._id !== id));
            if (selectedRequest?._id === id) setDetailOpen(false);
            setDeleteConfirm(null);
        } catch (err) {
            console.error("Failed to delete request", err);
        }
    };

    const stats = {
        total: requests.length,
        pending: requests.filter((r) => r.status === "pending").length,
        contacted: requests.filter((r) => r.status === "contacted").length,
        completed: requests.filter((r) => r.status === "completed").length,
        unread: requests.filter((r) => !r.isRead).length,
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="p-6 space-y-6 animate-fade-in">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Demo Requests</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage and track incoming demo booking requests from the landing page.
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={fetchRequests}
                    disabled={loading}
                    className="gap-2 border-[#009BB0]/30 text-[#009BB0] hover:bg-[#009BB0]/5"
                >
                    <RefreshCcw className={cn("h-4 w-4", loading && "animate-spin")} />
                    Refresh
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                    { label: "Total Requests", value: stats.total, color: "text-slate-700", bg: "bg-slate-50 border-slate-200" },
                    { label: "Pending", value: stats.pending, color: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
                    { label: "Contacted", value: stats.contacted, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
                    { label: "Unread", value: stats.unread, color: "text-[#009BB0]", bg: "bg-teal-50 border-teal-200" },
                ].map(({ label, value, color, bg }) => (
                    <div key={label} className={cn("rounded-xl border px-5 py-4 shadow-sm", bg)}>
                        <p className={cn("text-2xl font-bold", color)}>{value}</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    <Input
                        placeholder="Search by name, email or organization..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 focus-visible:ring-[#009BB0]/50"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 min-w-[150px]">
                            <Filter className="h-4 w-4" />
                            {statusFilter === "all" ? "All Statuses" : STATUS_CONFIG[statusFilter]?.label}
                            <ChevronDown className="h-4 w-4 ml-auto" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                            All Statuses
                        </DropdownMenuItem>
                        {ALL_STATUSES.map((s) => (
                            <DropdownMenuItem key={s} onClick={() => setStatusFilter(s)}>
                                {STATUS_CONFIG[s].label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <RefreshCcw className="h-8 w-8 text-[#009BB0] animate-spin" />
                        <p className="text-slate-500 text-sm">Loading requests...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <MessageSquare className="h-12 w-12 text-slate-200" />
                        <p className="text-slate-500 font-medium">No demo requests found</p>
                        <p className="text-slate-400 text-sm">
                            {search || statusFilter !== "all"
                                ? "Try adjusting your filters"
                                : "Demo requests from your landing page will appear here"}
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Applicant</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Organization</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden md:table-cell">Contact</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Received</th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map((req) => {
                                    const statusCfg = STATUS_CONFIG[req.status];
                                    const StatusIcon = statusCfg.icon;
                                    return (
                                        <tr
                                            key={req._id}
                                            className={cn(
                                                "hover:bg-slate-50/80 transition-colors",
                                                !req.isRead && "bg-[#009BB0]/3 border-l-4 border-l-[#009BB0]"
                                            )}
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#009BB0] to-[#009BB0]/70 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                                                        {req.fullName.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className={cn("font-semibold text-slate-800", !req.isRead && "font-bold")}>
                                                            {req.fullName}
                                                            {!req.isRead && (
                                                                <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-[#009BB0] align-middle" />
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-slate-500">{req.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 hidden sm:table-cell">
                                                <div className="flex items-center gap-1.5 text-slate-600">
                                                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                                                    {req.organization}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 hidden md:table-cell">
                                                <div className="flex items-center gap-1.5 text-slate-600 text-xs">
                                                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                                                    {req.phone}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <button
                                                            className={cn(
                                                                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer transition-opacity hover:opacity-80",
                                                                statusCfg.color
                                                            )}
                                                        >
                                                            <StatusIcon className="h-3 w-3" />
                                                            {statusCfg.label}
                                                            <ChevronDown className="h-3 w-3 ml-0.5" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-44">
                                                        {ALL_STATUSES.map((s) => (
                                                            <DropdownMenuItem
                                                                key={s}
                                                                onClick={() => handleStatusChange(req._id, s as DemoRequest["status"])}
                                                                className={cn(req.status === s && "bg-slate-50 font-semibold")}
                                                            >
                                                                {STATUS_CONFIG[s].label}
                                                            </DropdownMenuItem>
                                                        ))}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                            <td className="px-5 py-4 text-xs text-slate-500 hidden lg:table-cell">
                                                {formatDate(req.createdAt)}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-[#009BB0] hover:bg-[#009BB0]/10"
                                                        onClick={() => handleView(req)}
                                                        aria-label="View details"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50"
                                                        onClick={() => setDeleteConfirm(req._id)}
                                                        aria-label="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Detail Dialog */}
            <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Demo Request Details</DialogTitle>
                        <DialogDescription>Full information about this demo request.</DialogDescription>
                    </DialogHeader>
                    {selectedRequest && (
                        <div className="space-y-5 mt-2">
                            {/* Applicant Info */}
                            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#009BB0]/5 to-slate-50 rounded-xl border border-[#009BB0]/10">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#009BB0] to-[#009BB0]/70 flex items-center justify-center text-white font-bold text-xl shadow-md">
                                    {selectedRequest.fullName.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-lg">{selectedRequest.fullName}</p>
                                    <p className="text-sm text-slate-500">{selectedRequest.organization}</p>
                                </div>
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                        <Mail className="h-3.5 w-3.5" />
                                        Email
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800 break-all">{selectedRequest.email}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                        <Phone className="h-3.5 w-3.5" />
                                        Phone
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800">{selectedRequest.phone}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                        <Calendar className="h-3.5 w-3.5" />
                                        Received
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800">{formatDate(selectedRequest.createdAt)}</p>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        Status
                                    </div>
                                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border", STATUS_CONFIG[selectedRequest.status].color)}>
                                        {STATUS_CONFIG[selectedRequest.status].label}
                                    </span>
                                </div>
                            </div>

                            {/* Message */}
                            {selectedRequest.message && (
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                                        <MessageSquare className="h-3.5 w-3.5" />
                                        Message
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">{selectedRequest.message}</p>
                                </div>
                            )}

                            {/* Status Update */}
                            <div className="flex items-center gap-2 pt-2">
                                <span className="text-xs text-slate-500 font-medium">Update Status:</span>
                                <div className="flex flex-wrap gap-1.5">
                                    {ALL_STATUSES.map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => handleStatusChange(selectedRequest._id, s as DemoRequest["status"])}
                                            className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-semibold border transition-all",
                                                selectedRequest.status === s
                                                    ? STATUS_CONFIG[s].color + " shadow-sm"
                                                    : "border-slate-200 text-slate-500 hover:border-slate-300"
                                            )}
                                        >
                                            {STATUS_CONFIG[s].label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirm Dialog */}
            <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle className="text-red-600">Delete Demo Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this demo request? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-3 justify-end mt-4">
                        <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                        >
                            Delete
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
