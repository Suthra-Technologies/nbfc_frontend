import { useState, useEffect } from 'react';
import {
    Briefcase,
    Plus,
    Search,
    Clock,
    CheckCircle2,
    XCircle,
    TrendingUp,
    PieChart,
    Wallet,
    Loader2,
    Eye
} from 'lucide-react';
import { loanService, type Loan } from '@/services/loan.service';
import { customerService, type Customer } from '@/services/customer.service';
import { branchService, type Branch } from '@/services/branch.service';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
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
import './Loans.css';

export function Loans() {
    const { toast } = useToast();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        customerId: '',
        branchId: '',
        principalAmount: 0,
        interestRate: 12,
        tenureMonths: 12,
        interestType: 'REDUCING' as const,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setIsLoading(true);
        try {
            const [loanData, customerData, branchData] = await Promise.all([
                loanService.getAll(),
                customerService.getAll(),
                branchService.getAll()
            ]);
            setLoans(loanData);
            setCustomers(customerData);
            setBranches(branchData);
        } catch (error) {
            toast({
                title: 'Core Sync Failed',
                description: 'Unable to connect to financial ledgers.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateLoan = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await loanService.create({
                ...formData,
                principalAmount: Number(formData.principalAmount),
                interestRate: Number(formData.interestRate),
                tenureMonths: Number(formData.tenureMonths),
            });
            toast({
                title: 'Application Recorded',
                description: 'Loan request has been queued for verification.',
            });
            setIsDialogOpen(false);
            fetchInitialData();
        } catch (error: any) {
            toast({
                title: 'Protocol Error',
                description: error.response?.data?.message || 'Failed to submit loan application.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStatusUpdate = async (id: string, action: 'approve' | 'reject' | 'disburse') => {
        try {
            await loanService[action](id);
            toast({
                title: 'Ledger Updated',
                description: `Successfully executed ${action} transaction.`,
            });
            fetchInitialData();
        } catch (error: any) {
            toast({
                title: 'Transaction Declined',
                description: error.response?.data?.message || 'Action failed.',
                variant: 'destructive',
            });
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="loans-container animate-fade-in">
            <header className="loans-header">
                <div className="header-info">
                    <h1>Loan Portfolio</h1>
                    <p>Financial assets management and credit risk monitoring.</p>
                </div>
                <div className="header-actions">
                    <div className="search-box">
                        <Search size={14} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Filter by Loan ID or Customer..."
                            value={searchTerm}
                        />
                    </div>
                    <Button
                        onClick={() => setIsDialogOpen(true)}
                        className="bg-[#0f172a] hover:bg-[#1e293b] text-white gap-2 h-11 px-6 rounded-xl font-bold transition-all"
                    >
                        <Plus size={16} /> New Application
                    </Button>
                </div>
            </header>

            <div className="loans-summary-grid">
                {[
                    { label: 'AUM (Active Loans)', value: formatCurrency(loans.reduce((acc, l) => acc + l.principalAmount, 0)), icon: Wallet, trend: '+12.5%', isUp: true },
                    { label: 'Pending Apps', value: loans.filter(l => l.status === 'PENDING').length, icon: Clock, trend: '4 new today', isUp: true },
                    { label: 'Yield Rate', value: '14.2%', icon: TrendingUp, trend: 'Optimal', isUp: true },
                    { label: 'Risk Factor', value: '2.1%', icon: PieChart, trend: '-0.4%', isUp: false },
                ].map((stat, i) => (
                    <div key={i} className="summary-card">
                        <p className="summary-label">
                            <stat.icon size={12} className="text-[#009BB0]" />
                            {stat.label}
                        </p>
                        <p className="summary-value">{stat.value}</p>
                        <div className={cn("summary-trend", stat.isUp ? "trend-up" : "trend-down")}>
                            {stat.isUp ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                            {stat.trend}
                        </div>
                    </div>
                ))}
            </div>

            <div className="loan-list-card">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                        <Loader2 size={40} className="animate-spin mb-4 opacity-10" />
                        <p className="text-sm font-bold tracking-widest uppercase opacity-40">Decrypting Ledger Blocks...</p>
                    </div>
                ) : (
                    <table className="loan-table">
                        <thead>
                            <tr>
                                <th>Block ID</th>
                                <th>Borrower</th>
                                <th>Principal</th>
                                <th>Tenure</th>
                                <th>Status</th>
                                <th>Risk Indicator</th>
                                <th style={{ textAlign: 'right' }}>Execution</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loans.map((loan) => (
                                <tr key={loan._id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td>
                                        <span className="loan-id-cell">{loan.loanId}</span>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                {typeof loan.customerId === 'object' ? loan.customerId.personalInfo.fullName.charAt(0) : 'U'}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-800">
                                                    {typeof loan.customerId === 'object' ? loan.customerId.personalInfo.fullName : 'Verified User'}
                                                </p>
                                                <p className="text-[10px] text-slate-400 font-medium tracking-tight">Financial Node Alpha</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="amount-column">
                                        {formatCurrency(loan.principalAmount)}
                                    </td>
                                    <td>
                                        <div className="text-xs font-bold text-slate-600">
                                            {loan.tenureMonths} <span className="text-[10px] text-slate-400 font-medium">Months</span>
                                        </div>
                                        <div className="text-[9px] text-[#009BB0] font-bold">@ {loan.interestRate}% {loan.interestType}</div>
                                    </td>
                                    <td>
                                        <span className={cn(
                                            "status-pill-loan",
                                            `status-${loan.status}`
                                        )}>
                                            {loan.status === 'PENDING' && <Clock size={10} />}
                                            {loan.status === 'APPROVED' && <CheckCircle2 size={10} />}
                                            {loan.status === 'REJECTED' && <XCircle size={10} />}
                                            {loan.status === 'DISBURSED' && <TrendingUp size={10} />}
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="w-24 h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                                        </div>
                                        <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">Reliability Index: 0.85</p>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <div className="flex items-center justify-end gap-2">
                                            {loan.status === 'PENDING' && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleStatusUpdate(loan._id, 'approve')}
                                                        className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 text-[10px] font-bold"
                                                    >
                                                        Approve
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleStatusUpdate(loan._id, 'reject')}
                                                        className="h-8 text-rose-500 hover:bg-rose-50 rounded-lg px-2"
                                                    >
                                                        <XCircle size={14} />
                                                    </Button>
                                                </>
                                            )}
                                            {loan.status === 'APPROVED' && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleStatusUpdate(loan._id, 'disburse')}
                                                    className="h-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-3 text-[10px] font-bold"
                                                >
                                                    Disburse
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                                                <Eye size={14} />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {loans.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: 'center', padding: '100px 0' }}>
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                                <Briefcase size={24} className="text-slate-200" />
                                            </div>
                                            <h3 className="text-slate-800 font-bold">No Portfolio Data</h3>
                                            <p className="text-slate-400 text-sm">Initiate a credit request to start building your portfolio.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Negotiation Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[550px] rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
                    <DialogHeader className="p-8 bg-[#0f172a] text-white">
                        <DialogTitle className="text-2xl font-extrabold tracking-tight">Credit Application</DialogTitle>
                        <DialogDescription className="text-slate-400">Configure new credit asset for a registered client.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleCreateLoan} className="p-8 space-y-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">Service Branch</Label>
                                    <Select
                                        value={formData.branchId}
                                        onValueChange={(value) => setFormData({ ...formData, branchId: value })}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select branch..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches.map(b => (
                                                <SelectItem key={b._id} value={b._id}>{b.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label className="text-xs font-bold uppercase text-slate-500">Associate Client</Label>
                                    <Select
                                        value={formData.customerId}
                                        onValueChange={(value) => setFormData({ ...formData, customerId: value })}
                                    >
                                        <SelectTrigger className="h-12 rounded-xl border-slate-200">
                                            <SelectValue placeholder="Select client..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customers.map(c => (
                                                <SelectItem key={c._id} value={c._id}>
                                                    {c.personalInfo.fullName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="loan-form-section">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label className="text-xs font-bold uppercase text-slate-500">Principal (₹)</Label>
                                        <Input
                                            type="number"
                                            placeholder="5,00,000"
                                            className="h-11 rounded-xl bg-white border-slate-200"
                                            value={formData.principalAmount}
                                            onChange={(e) => setFormData({ ...formData, principalAmount: Number(e.target.value) })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-xs font-bold uppercase text-slate-500">Rate (%)</Label>
                                        <Input
                                            type="number"
                                            className="h-11 rounded-xl bg-white border-slate-200"
                                            value={formData.interestRate}
                                            onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div className="grid gap-2">
                                        <Label className="text-xs font-bold uppercase text-slate-500">Tenure (Months)</Label>
                                        <Input
                                            type="number"
                                            className="h-11 rounded-xl bg-white border-slate-200"
                                            value={formData.tenureMonths}
                                            onChange={(e) => setFormData({ ...formData, tenureMonths: Number(e.target.value) })}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-xs font-bold uppercase text-slate-500">Interest Type</Label>
                                        <Select
                                            value={formData.interestType}
                                            onValueChange={(val: any) => setFormData({ ...formData, interestType: val })}
                                        >
                                            <SelectTrigger className="h-11 rounded-xl bg-white border-slate-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="REDUCING">Reducing Balance</SelectItem>
                                                <SelectItem value="FLAT">Flat Rate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-[#009BB0]/5 rounded-2xl border border-[#009BB0]/10">
                                <div className="flex justify-between items-center text-xs font-bold">
                                    <span className="text-slate-500 uppercase">Estimated Monthly EMI</span>
                                    <span className="text-[#009BB0] text-lg">
                                        {formatCurrency(formData.principalAmount > 0 ? (formData.principalAmount * (1 + (formData.interestRate / 100))) / formData.tenureMonths : 0)}
                                    </span>
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
                                className="bg-[#0f172a] hover:bg-[#1e293b] text-white font-extrabold px-8 rounded-xl h-12"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : 'Instantiate Asset'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
