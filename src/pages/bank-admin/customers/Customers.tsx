import { useState, useEffect } from 'react';
import {
    Users,
    Search,
    Plus,
    MoreVertical,
    Activity,
    Shield,
    TrendingUp,
    Download,
    Mail,
    Phone,
    Calendar,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { customerService, type Customer } from '@/services/customer.service';
import { branchService, type Branch } from '@/services/branch.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import './Customers.css';

export function Customers() {
    const { toast } = useToast();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        branchId: '',
        personalInfo: {
            fullName: '',
            mobile: '',
            email: '',
            dob: '',
            gender: 'Male',
        },
        financialInfo: {
            occupation: '',
            monthlyIncome: 0,
        },
        kyc: {
            panNumber: '',
            aadhaarMasked: '',
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const [customerData, branchData] = await Promise.all([
                customerService.getAll(),
                branchService.getAll()
            ]);
            setCustomers(customerData);
            setBranches(branchData);
        } catch (error) {
            toast({
                title: 'Data Sync Error',
                description: 'Failed to retrieve registry data from the core.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await customerService.create(formData);
            toast({
                title: 'Client Registered',
                description: 'New customer profile successfully added to the registry.',
            });
            setIsDialogOpen(false);
            fetchCustomers();
        } catch (error: any) {
            toast({
                title: 'Registration Error',
                description: error.response?.data?.message || 'Failed to onboard new client.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredCustomers = customers.filter(c =>
        c.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.personalInfo.mobile.includes(searchTerm)
    );

    return (
        <div className="customers-container animate-fade-in">
            <header className="customers-header">
                <div className="header-info">
                    <h1>Client Registry</h1>
                    <p>Manage retail customers and their financial profiles.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={14} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find client by ID, name or mobile..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-slate-600 gap-2 h-11 px-6"
                    >
                        <Download size={16} /> Export
                    </Button>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-[#009BB0] hover:bg-[#008aa0] text-white gap-2 h-11 px-6 rounded-xl font-bold transition-all shadow-lg shadow-[#009BB0]/20"
                    >
                        <Plus size={16} /> Add Customer
                    </Button>
                </div>
            </header>

            <div className="customers-stats-grid">
                {[
                    { label: 'Total Clients', value: customers.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Active KYC', value: customers.length, icon: Shield, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'High Value', value: '12%', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
                    { label: 'Registry Load', value: 'Optimal', icon: Activity, color: 'bg-indigo-50 text-indigo-600' },
                ].map((stat, i) => (
                    <div key={i} className="stat-card">
                        <div className={cn("stat-icon-wrapper", stat.color)}>
                            <stat.icon size={20} />
                        </div>
                        <p className="stat-label">{stat.label}</p>
                        <p className="stat-value">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="customer-table-card">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                        <Loader2 size={40} className="animate-spin mb-4 opacity-20" />
                        <p className="text-sm font-medium animate-pulse">Syncing Distributed Registry...</p>
                    </div>
                ) : (
                    <table className="customer-table">
                        <thead>
                            <tr>
                                <th>Client Profile</th>
                                <th>Contact Details</th>
                                <th>Risk Score</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th style={{ textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.map((customer) => (
                                <tr key={customer._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td>
                                        <div className="customer-profile">
                                            <div className="avatar-initials">
                                                {customer.personalInfo.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="customer-name">{customer.personalInfo.fullName}</p>
                                                <p className="customer-id">{customer.customerId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Phone size={10} className="text-[#009BB0]" />
                                                <span>{customer.personalInfo.mobile}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <Mail size={10} className="text-[#009BB0]" />
                                                <span className="truncate max-w-[150px]">{customer.personalInfo.email || '--'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <span className={cn(
                                                "risk-tag",
                                                `risk-${customer.riskProfile?.category || 'LOW'}`
                                            )}>
                                                {customer.riskProfile?.category || 'LOW'}
                                            </span>
                                            <span className="text-xs font-bold text-slate-400">{customer.riskProfile?.score || '0'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Calendar size={12} className="text-slate-400" />
                                            {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '--'}
                                        </div>
                                    </td>
                                    <td>
                                        <Badge className={cn(
                                            "rounded-lg text-[10px] font-extrabold px-2 py-0.5",
                                            customer.isActive ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                                        )} variant="outline">
                                            {customer.isActive ? 'ACTIVE' : 'INACTIVE'}
                                        </Badge>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#009BB0]">
                                                <ArrowRight size={14} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                                <MoreVertical size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '100px 0' }}>
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                                                <Users size={24} className="text-slate-200" />
                                            </div>
                                            <h3 className="text-slate-800 font-bold">Registry Entry Missing</h3>
                                            <p className="text-slate-400 text-sm">Initiate client onboarding to populate this registry.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Registration Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[650px] rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
                    <DialogHeader className="p-8 bg-[#009BB0] text-white">
                        <DialogTitle className="text-2xl font-extrabold tracking-tight">Onboard New Client</DialogTitle>
                        <DialogDescription className="text-blue-50/70">Initialize a new secure financial profile in the system.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateCustomer} className="p-8 space-y-6 overflow-y-auto max-h-[70vh]">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label className="text-xs font-bold uppercase text-slate-500">Service Branch</Label>
                                <Select
                                    value={formData.branchId}
                                    onValueChange={(value) => setFormData({ ...formData, branchId: value })}
                                >
                                    <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                        <SelectValue placeholder="Select originating branch..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {branches.map(b => (
                                            <SelectItem key={b._id} value={b._id}>{b.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">Legal Full Name</Label>
                                    <Input
                                        placeholder="Johnathan Doe"
                                        className="h-12 rounded-xl border-slate-200"
                                        value={formData.personalInfo.fullName}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                                        })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">Mobile Number</Label>
                                    <Input
                                        placeholder="+91 98765 43210"
                                        className="h-12 rounded-xl border-slate-200"
                                        value={formData.personalInfo.mobile}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            personalInfo: { ...formData.personalInfo, mobile: e.target.value }
                                        })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">Email Address</Label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-12 rounded-xl border-slate-200"
                                        value={formData.personalInfo.email}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            personalInfo: { ...formData.personalInfo, email: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">Date of Birth</Label>
                                    <Input
                                        type="date"
                                        className="h-12 rounded-xl border-slate-200"
                                        value={formData.personalInfo.dob}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            personalInfo: { ...formData.personalInfo, dob: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-6">
                                <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Financial Credentials</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        placeholder="PAN Card Number"
                                        className="bg-white rounded-xl h-11 border-slate-200"
                                        value={formData.kyc.panNumber}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            kyc: { ...formData.kyc, panNumber: e.target.value }
                                        })}
                                    />
                                    <Input
                                        placeholder="Aadhaar (Last 4 digits)"
                                        className="bg-white rounded-xl h-11 border-slate-200"
                                        maxLength={4}
                                        value={formData.kyc.aadhaarMasked}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            kyc: { ...formData.kyc, aadhaarMasked: e.target.value }
                                        })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4 mt-3">
                                    <Input
                                        placeholder="Current Occupation"
                                        className="bg-white rounded-xl h-11 border-slate-200"
                                        value={formData.financialInfo.occupation}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            financialInfo: { ...formData.financialInfo, occupation: e.target.value }
                                        })}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Monthly Income (₹)"
                                        className="bg-white rounded-xl h-11 border-slate-200"
                                        value={formData.financialInfo.monthlyIncome}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            financialInfo: { ...formData.financialInfo, monthlyIncome: Number(e.target.value) }
                                        })}
                                    />
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
                                Discard
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-[#009BB0] hover:bg-[#008aa0] text-white font-extrabold px-8 rounded-xl h-12 shadow-lg shadow-[#009BB0]/20"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Finalize Profile'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
