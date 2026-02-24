import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Building2,
    MapPin,
    Users,
    Loader2,
    MoreVertical,
    ArrowUpRight
} from 'lucide-react';
import { branchService, type Branch } from '@/services/branch.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import './Branches.css';

export function Branches() {
    const { toast } = useToast();
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        address: {
            line1: '',
            city: '',
            state: '',
            pincode: '',
        },
        manager: {
            fullName: '',
            email: '',
            mobile: '',
            password: 'Password123!', // Default password for new managers
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        setIsLoading(true);
        try {
            const data = await branchService.getAll();
            setBranches(data);
        } catch (error) {
            toast({
                title: 'Operation Failed',
                description: 'Unable to synchorize branch registry',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateBranch = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await branchService.create(formData);
            toast({
                title: 'Registry Updated',
                description: 'New node successfully provisioned on the network',
            });
            setIsDialogOpen(false);
            fetchBranches();
        } catch (error: any) {
            toast({
                title: 'Provisioning Error',
                description: error.response?.data?.message || 'Failed to instantiate new node',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredBranches = branches.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.branchCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="branches-container animate-fade-in">
            <header className="branches-header">
                <div className="header-info">
                    <h1>Network Infrastructure</h1>
                    <p>Manage physical nodes and branch distribution across regions.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Find branch by code or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-[#0f172a] hover:bg-[#1e293b] text-white gap-2 h-11 px-6 rounded-xl font-bold transition-all"
                    >
                        <Plus size={16} /> provision Node
                    </Button>
                </div>
            </header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                    <Loader2 size={40} className="animate-spin mb-4 opacity-20" />
                    <p className="text-sm font-medium animate-pulse">Scanning Geographic Nodes...</p>
                </div>
            ) : (
                <div className="branches-grid">
                    {filteredBranches.map(branch => (
                        <div key={branch._id} className="branch-card group">
                            <div className="branch-card-header">
                                <div className="branch-icon-wrapper">
                                    <Building2 size={20} className="text-[#009BB0]" />
                                </div>
                                <div className="branch-actions">
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-extrabold uppercase",
                                        branch.status === 'ACTIVE' ? "border-emerald-200 text-emerald-600 bg-emerald-50" : "border-slate-200 text-slate-400"
                                    )}>
                                        {branch.status}
                                    </Badge>
                                    <button className="text-slate-300 hover:text-slate-600">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="branch-card-body">
                                <p className="branch-code">{branch.branchCode}</p>
                                <h3 className="branch-name">{branch.name}</h3>
                                <div className="branch-detail">
                                    <MapPin size={14} className="text-slate-400" />
                                    <span>{branch.address?.city}, {branch.address?.state}</span>
                                </div>
                                <div className="branch-detail">
                                    <Users size={14} className="text-slate-400" />
                                    <span>Manager: {branch.managerId?.fullName || '--'}</span>
                                </div>
                            </div>

                            <div className="branch-card-footer">
                                <div className="manager-mini-info">
                                    <div className="manager-avatar-tiny">
                                        {branch.managerId?.fullName?.charAt(0) || '?'}
                                    </div>
                                    <p>{branch.managerId?.email || 'No manager assigned'}</p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={14} className="text-[#009BB0]" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {filteredBranches.length === 0 && (
                        <div className="col-span-full empty-registry">
                            <div className="empty-icon shadow-inner">
                                <Search size={24} className="text-slate-300" />
                            </div>
                            <h3>No nodes found</h3>
                            <p>Try refining your search parameters or provision a new branch node.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Create Branch Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[550px] rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
                    <DialogHeader className="p-8 bg-[#0f172a] text-white">
                        <DialogTitle className="text-2xl font-extrabold tracking-tight">Provision Branch Node</DialogTitle>
                        <DialogDescription className="text-slate-400">Initialize a new physical hub with a designated manager.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateBranch} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label className="text-xs font-bold uppercase text-slate-500">Node Designation</Label>
                                <Input
                                    placeholder="e.g. Mumbai Corporate Hub"
                                    className="h-12 rounded-xl border-slate-200"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">City</Label>
                                    <Input
                                        placeholder="Mumbai"
                                        className="h-12 rounded-xl border-slate-200"
                                        value={formData.address.city}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            address: { ...formData.address, city: e.target.value }
                                        })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">State</Label>
                                    <Input
                                        placeholder="Maharashtra"
                                        className="h-12 rounded-xl border-slate-200"
                                        value={formData.address.state}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            address: { ...formData.address, state: e.target.value }
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-6">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Designated Manager</p>
                                <div className="grid gap-4">
                                    <Input
                                        placeholder="Manager's Full Name"
                                        className="bg-white rounded-xl h-11 border-slate-200"
                                        value={formData.manager.fullName}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            manager: { ...formData.manager, fullName: e.target.value }
                                        })}
                                        required
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <Input
                                            type="email"
                                            placeholder="Work Email"
                                            className="bg-white rounded-xl h-11 border-slate-200"
                                            value={formData.manager.email}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                manager: { ...formData.manager, email: e.target.value }
                                            })}
                                            required
                                        />
                                        <Input
                                            placeholder="Mobile"
                                            className="bg-white rounded-xl h-11 border-slate-200"
                                            value={formData.manager.mobile}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                manager: { ...formData.manager, mobile: e.target.value }
                                            })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-4">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => setIsDialogOpen(false)}
                                className="font-bold text-slate-400"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#009BB0] hover:bg-[#008aa0] text-white font-extrabold px-8 rounded-xl h-12 shadow-lg shadow-[#009BB0]/20"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Instantiate Node'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
