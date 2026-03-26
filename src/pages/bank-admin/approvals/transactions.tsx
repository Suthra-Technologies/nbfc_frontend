import { 
    Calendar as CalendarIcon, 
    Activity,
    CheckCircle2,
    XCircle,
    Save
} from 'lucide-react';
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
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export function ApprovalTransactions() {
    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
                
                {/* 1. Selection and Applicant Information Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md">
                    <CardContent className="p-8 space-y-8">
                        {/* Filters Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="date" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Date :</Label>
                                <div className="relative flex-1 group">
                                    <Input 
                                        id="date" 
                                        defaultValue="25/03/2026" 
                                        className="h-10 border-[#e2e8f0] group-hover:border-[#009bb0] transition-colors pr-10 bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                                    />
                                    <CalendarIcon className="absolute right-3 top-2.5 h-4.5 w-4.5 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="natureOfLoan" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Nature of loan :</Label>
                                <Select>
                                    <SelectTrigger id="natureOfLoan" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm font-medium">
                                        <SelectValue placeholder="Select Nature" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-[#e2e8f0]">
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                                        <SelectItem value="gold">Gold Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="applicantId" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Applicant id :</Label>
                                <Select>
                                    <SelectTrigger id="applicantId" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm font-medium">
                                        <SelectValue placeholder="Select Applicant id" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-[#e2e8f0]">
                                        <SelectItem value="APP-001">APP-001</SelectItem>
                                        <SelectItem value="APP-002">APP-002</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Informational Summary (Read-only) */}
                        <div className="border border-dashed border-[#e2e8f0] rounded-sm bg-[#f8fafc] p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                <div className="space-y-4">
                                     <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Applicant name :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Tenure of loan :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Amount requested :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">No.of Ratings :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Unique Id :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Nature of loan :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Interest rate expected :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Purpose of loan :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs h-4"></div> {/* Spacer */}
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">App Date :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Emi Type :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-[#64748b] uppercase tracking-tighter">Payment Mode :</span>
                                        <span className="font-semibold text-[#1e293b]">---</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Side-by-Side Approval Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Approval Box 1 */}
                    <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-8 pt-12 text-[#334155] shadow-sm">
                        <div className="absolute top-5 left-8 flex items-center gap-2">
                             <div className="bg-[#009bb0] p-1.5 rounded-sm">
                                <Activity className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Approval 1 Details</span>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="amount1" className="text-[10px] font-bold text-[#64748b] uppercase">Amount :</Label>
                                <Input id="amount1" placeholder="Enter Amount" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="pm1" className="text-[10px] font-bold text-[#64748b] uppercase">Payment Mode :<span className="text-red-500 ml-0.5">*</span></Label>
                                <Select>
                                    <SelectTrigger id="pm1" className="h-9 border-[#e2e8f0] bg-white rounded-sm text-sm">
                                        <SelectValue placeholder="Select Payment Mode" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="emi">EMI</SelectItem>
                                        <SelectItem value="bullet">Bullet</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="tenure1" className="text-[10px] font-bold text-[#64748b] uppercase">Tenure of loan :</Label>
                                <Input id="tenure1" placeholder="Enter Tenure" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label className="text-[10px] font-bold text-[#64748b] uppercase">Interest Type :</Label>
                                <RadioGroup defaultValue="year" className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="month" id="month1" className="border-[#009bb0] text-[#009bb0]" />
                                        <Label htmlFor="month1" className="text-xs font-semibold">Month</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="year" id="year1" className="border-[#009bb0] text-[#009bb0]" />
                                        <Label htmlFor="year1" className="text-xs font-semibold">Year</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="interest1" className="text-[10px] font-bold text-[#64748b] uppercase">Interest :</Label>
                                <Input id="interest1" placeholder="Enter Interest" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="emi1" className="text-[10px] font-bold text-[#64748b] uppercase">Emi Type :<span className="text-red-500 ml-0.5">*</span></Label>
                                <Select>
                                    <SelectTrigger id="emi1" className="h-9 border-[#e2e8f0] bg-white rounded-sm text-sm">
                                        <SelectValue placeholder="Select Emi Type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectItem value="fixed">Fixed</SelectItem>
                                        <SelectItem value="floating">Floating</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="doc1" className="text-[10px] font-bold text-[#64748b] uppercase">Document charges :</Label>
                                <Input id="doc1" placeholder="Enter Amount" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="proc1" className="text-[10px] font-bold text-[#64748b] uppercase">Processing fee :</Label>
                                <Input id="proc1" placeholder="Enter Amount" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-start gap-4 pt-1">
                                <Label htmlFor="remarks1" className="text-[10px] font-bold text-[#64748b] uppercase mt-2">Remarks :</Label>
                                <Textarea id="remarks1" placeholder="Enter Remarks" className="min-h-[60px] border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-xs" />
                            </div>
                        </div>
                    </div>

                    {/* Approval Box 2 */}
                    <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-8 pt-12 text-[#334155] shadow-sm">
                        <div className="absolute top-5 left-8 flex items-center gap-2">
                             <div className="bg-[#009bb0] p-1.5 rounded-sm">
                                <Activity className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Approval 2 Details</span>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="amount2" className="text-[10px] font-bold text-[#64748b] uppercase">Amount :</Label>
                                <Input id="amount2" placeholder="Enter Amount" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="pm2" className="text-[10px] font-bold text-[#64748b] uppercase">Payment Mode :<span className="text-red-500 ml-0.5">*</span></Label>
                                <Select>
                                    <SelectTrigger id="pm2" className="h-9 border-[#e2e8f0] bg-white rounded-sm text-sm">
                                        <SelectValue placeholder="Select Payment Mode" />
                                    </SelectTrigger>
                                </Select>
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="tenure2" className="text-[10px] font-bold text-[#64748b] uppercase">Tenure of loan :</Label>
                                <Input id="tenure2" placeholder="Enter Tenure" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label className="text-[10px] font-bold text-[#64748b] uppercase">Interest Type :</Label>
                                <RadioGroup defaultValue="year" className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="month" id="month2" className="border-[#009bb0] text-[#009bb0]" />
                                        <Label htmlFor="month2" className="text-xs font-semibold">Month</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="year" id="year2" className="border-[#009bb0] text-[#009bb0]" />
                                        <Label htmlFor="year2" className="text-xs font-semibold">Year</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label htmlFor="interest2" className="text-[10px] font-bold text-[#64748b] uppercase">Interest :</Label>
                                <Input id="interest2" placeholder="Enter Interest" className="h-9 border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-sm" />
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-start gap-4 pt-1">
                                <Label htmlFor="remarks2" className="text-[10px] font-bold text-[#64748b] uppercase mt-2">Remarks :</Label>
                                <Textarea id="remarks2" placeholder="Enter Remarks" className="min-h-[85px] border-[#e2e8f0] focus:border-[#009bb0] bg-white rounded-sm text-xs" />
                            </div>
                             <div className="grid grid-cols-[140px,1fr] items-center gap-4 pt-1">
                                <Label className="text-[10px] font-bold text-[#64748b] uppercase">Status :</Label>
                                <span className="text-xs font-semibold text-[#94a3b8] italic">Pending</span>
                            </div>
                            <div className="grid grid-cols-[140px,1fr] items-center gap-4">
                                <Label className="text-[10px] font-bold text-[#64748b] uppercase">Approved by :</Label>
                                <span className="text-xs font-semibold text-[#1e293b]">---</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button 
                        className="bg-[#10b981] hover:bg-[#059669] text-white flex items-center gap-2 px-10 h-10 rounded-sm shadow-sm transition-all active:scale-[0.98] font-semibold text-xs border-none"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Accept</span>
                    </Button>
                    <Button 
                        className="bg-[#009bb0] hover:bg-[#008ba0] text-white flex items-center gap-2 px-10 h-10 rounded-sm shadow-sm transition-all active:scale-[0.98] font-semibold text-xs border-none"
                    >
                        <Save className="h-4 w-4" />
                        <span>Approve</span>
                    </Button>
                    <Button 
                        variant="destructive"
                        className="bg-[#ff4d5a] hover:bg-[#e64450] text-white flex items-center gap-2 px-10 h-10 rounded-sm shadow-sm transition-all active:scale-[0.98] font-semibold text-xs border-none"
                    >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
