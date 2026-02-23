import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    ShieldCheck,
    Mail,
    Phone,
    Building2,
    Trash2,
    Edit2,
    Loader2,
} from 'lucide-react';
import {
    bankUserService,
    type BankUser,
    type BankRole,
    bankRoleService
} from '@/services/bank-user.service';
import { branchService, type Branch } from '@/services/branch.service';
import { useToast } from '@/hooks/use-toast';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import './Staff.css';

export function Staff() {
    const { toast } = useToast();
    const [staff, setStaff] = useState<BankUser[]>([]);
    const [roles, setRoles] = useState<BankRole[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');

    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        password: '',
        roleId: '',
        branchId: 'central_office',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [usersData, rolesData, branchesData] = await Promise.all([
                bankUserService.getAll(),
                bankRoleService.getAll(),
                branchService.getAll()
            ]);
            setStaff(usersData);
            setRoles(rolesData);
            setBranches(branchesData);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: 'Failed to fetch staff data',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            // Basic validation
            if (!formData.fullName || !formData.email || !formData.mobile || !formData.password || !formData.roleId) {
                toast({
                    title: 'Validation Error',
                    description: 'Please fill all required fields',
                    variant: 'destructive',
                });
                setIsSubmitting(false);
                return;
            }

            const payload = {
                ...formData,
                branchId: formData.branchId === 'central_office' ? '' : formData.branchId
            };
            await bankUserService.create(payload);
            toast({
                title: 'Success',
                description: 'Staff member added successfully',
            });
            setIsDialogOpen(false);
            setFormData({
                fullName: '',
                email: '',
                mobile: '',
                password: '',
                roleId: '',
                branchId: 'central_office',
            });
            fetchData();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to add staff member',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (!confirm('Are you sure you want to remove this staff member?')) return;
        try {
            await bankUserService.delete(id);
            toast({
                title: 'Success',
                description: 'Staff member removed',
            });
            fetchData();
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete user',
                variant: 'destructive',
            });
        }
    };

    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === 'all' || member.roleId?.code === roleFilter;
        return matchesSearch && matchesRole;
    });

    return (
        <div className="staff-container animate-fade-in">
            <header className="staff-header">
                <div className="header-info">
                    <h1>Staff Management</h1>
                    <p>Manage access and permissions for bank employees.</p>
                </div>
                <div className="header-actions">
                    <div className="search-group">
                        <div className="search-box">
                            <Search size={14} />
                            <input
                                type="text"
                                placeholder="Search staff..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px] h-10 border-slate-200">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                {roles.map(role => (
                                    <SelectItem key={role._id} value={role.code}>{role.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-[#009BB0] hover:bg-[#008aa0] text-white gap-2 h-10 px-6 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-[#009BB0]/20"
                    >
                        <Plus size={16} /> Add Member
                    </Button>
                </div>
            </header>

            <div className="stats-mini-grid mb-6">
                <div className="mini-card">
                    <span className="label">Total Staff</span>
                    <span className="value">{staff.length}</span>
                </div>
                <div className="mini-card">
                    <span className="label">Active Managers</span>
                    <span className="value">{staff.filter(s => s.roleId?.code.includes('MANAGER')).length}</span>
                </div>
                <div className="mini-card">
                    <span className="label">Available Branches</span>
                    <span className="value">{branches.length}</span>
                </div>
            </div>

            <div className="staff-list-card">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <Loader2 size={40} className="animate-spin mb-4 opacity-20" />
                        <p className="text-sm font-medium animate-pulse">Syncing Employee Records...</p>
                    </div>
                ) : filteredStaff.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="staff-table">
                            <thead>
                                <tr>
                                    <th>Staff Member</th>
                                    <th>Designation</th>
                                    <th>Branch Assignment</th>
                                    <th>Contact Info</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStaff.map(member => (
                                    <tr key={member._id} className="staff-row group">
                                        <td>
                                            <div className="member-info">
                                                <div className="member-avatar">
                                                    {member.fullName.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="member-name">{member.fullName}</p>
                                                    <p className="member-id">{member.userId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 font-bold text-[10px] uppercase tracking-wider">
                                                {member.roleId?.name || 'N/A'}
                                            </Badge>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                <Building2 size={13} />
                                                {member.branchId?.name || 'Central Office'}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="contact-info">
                                                <div className="flex items-center gap-2">
                                                    <Mail size={12} className="text-slate-400" />
                                                    <span>{member.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone size={12} className="text-slate-400" />
                                                    <span>{member.mobile}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-1.5">
                                                <span className={cn("status-dot", member.isActive ? "bg-emerald-500" : "bg-slate-300")}></span>
                                                <span className="text-xs font-bold text-slate-600">{member.isActive ? 'Active' : 'Suspended'}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#009BB0]">
                                                    <Edit2 size={14} />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-slate-400 hover:text-red-500"
                                                    onClick={() => handleDeleteUser(member._id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon-wrapper">
                            <ShieldCheck size={32} />
                        </div>
                        <h3>No records found</h3>
                        <p>No staff members match the current filters or search criteria.</p>
                        <Button variant="link" onClick={() => { setSearchTerm(''); setRoleFilter('all'); }}>Clear Filters</Button>
                    </div>
                )}
            </div>

            {/* Create Staff Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[480px] rounded-3xl overflow-hidden border-none shadow-2xl">
                    <DialogHeader className="p-6 bg-slate-50 border-b border-slate-100">
                        <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight">Onboard Staff Member</DialogTitle>
                        <DialogDescription className="text-slate-500 mt-1">Grant system access to a new employee.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateUser} className="space-y-4 p-6 overflow-y-auto max-h-[70vh]">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Legal Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="Jane Smith"
                                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-[#009BB0]"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Work Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="jane@bank.com"
                                        className="h-11 rounded-xl border-slate-200 focus-visible:ring-[#009BB0]"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mobile" className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone</Label>
                                    <Input
                                        id="mobile"
                                        placeholder="+91"
                                        className="h-11 rounded-xl border-slate-200 focus-visible:ring-[#009BB0]"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">Access Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-11 rounded-xl border-slate-200 focus-visible:ring-[#009BB0]"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <p className="text-[10px] text-slate-400 font-medium">Temporary password. User will be prompted to change on first login.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Role / Title</Label>
                                    <Select
                                        value={formData.roleId}
                                        onValueChange={(val) => setFormData({ ...formData, roleId: val })}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {roles.map(role => (
                                                <SelectItem key={role._id} value={role._id}>{role.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Branch (Optional)</Label>
                                    <Select
                                        value={formData.branchId}
                                        onValueChange={(val) => setFormData({ ...formData, branchId: val })}
                                    >
                                        <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select branch" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="central_office">Central / All</SelectItem>
                                            {branches.map(branch => (
                                                <SelectItem key={branch._id} value={branch._id}>{branch.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-6 border-t border-slate-100 flex gap-3">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                className="rounded-xl h-11 px-6 font-bold"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#009BB0] hover:bg-[#008aa0] rounded-xl h-11 px-8 font-bold text-white transition-all shadow-lg shadow-[#009BB0]/20"
                            >
                                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Complete Onboarding'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
