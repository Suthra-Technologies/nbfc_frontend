import { Save, Calendar as CalendarIcon, Activity, RotateCcw } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const LoanDisbursal = () => {
    return (
        <div className="flex flex-col h-full bg-white text-[#334155] font-sans">
            {/* Toolbar Removed */}

            <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-white">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="date" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Date:</Label>
                                <div className="relative flex-1 group">
                                    <Input id="date" defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] group-hover:border-[#009bb0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                                    <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="nature" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Nature of loan:</Label>
                                <Select>
                                    <SelectTrigger id="nature" className="h-10 border-[#e2e8f0] group-hover:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Nature" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="gold">Gold Loan</SelectItem>
                                        <SelectItem value="property">Property Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="account" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Loan account No.:</Label>
                                <Select>
                                    <SelectTrigger id="account" className="h-10 border-[#e2e8f0] group-hover:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select loan account No." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acc1">LA-2026-001</SelectItem>
                                        <SelectItem value="acc2">LA-2026-002</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="emi-date" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">EMI Date:</Label>
                                <div className="relative flex-1 group">
                                    <Input id="emi-date" defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] group-hover:border-[#009bb0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                                    <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Applicant Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 text-[#1e293b] shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009bb0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#009bb0] font-bold text-xs">Applicant details</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Applicant name:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Co applicant1:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Guarantor1:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Guarantor2:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Guarantor1ID:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Unique Id:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Co applicant2:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between h-5"></div>
                            <div className="flex justify-between h-5"></div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Guarantor2ID:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 pt-6 border-t border-[#e2e8f0] mt-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Approved amount:</span>
                                <span className="text-sm font-semibold w-1/2 text-right text-[#1e293b]">0.00</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Tenor of loan:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Approved Date:</span>
                                <span className="text-sm font-semibold w-1/2 text-right">---</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-dashed border-[#e2e8f0] pb-2">
                                <span className="text-[11px] font-bold text-[#64748b] uppercase">Rate of interest:</span>
                                <span className="text-sm font-semibold w-1/2 text-right text-[#1e293b]">0.00 %</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Entry Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 text-[#1e293b] shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009bb0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#009bb0] font-bold text-xs">Entry</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="total-amount" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Total Amount:</Label>
                            <Input id="total-amount" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="paid-amount" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Paid amount:</Label>
                            <Input id="paid-amount" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="text-[11px] font-bold text-[#64748b] uppercase whitespace-nowrap">Previous disbursed amount:</Label>
                            <span className="text-sm font-semibold text-[#1e293b] px-3 h-10 flex items-center bg-[#f8fafc] border border-[#e2e8f0] rounded-sm flex-1">0.00</span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <Label htmlFor="narration" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase pt-2">Narration</Label>
                        <Textarea
                            id="narration"
                            placeholder="Enter Narration"
                            className="bg-white border-[#e2e8f0] hover:border-[#009BB0] transition-colors resize-none h-24 text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 max-w-7xl mx-auto w-full flex justify-end gap-4">
                <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-[#ff4d52] hover:bg-[#ff4d52] text-white  h-10 px-6 font-semibold shadow-sm"
                >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset Form</span>
                </Button>
                <Button
                    className="flex items-center gap-2 bg-[#009bb0] hover:bg-[#007a8a] text-white h-10 px-6 font-semibold shadow-sm"
                >
                    <Save className="h-4 w-4" />
                    <span>Save Member Details</span>
                </Button>
            </div>
        </div>
    );
};

export default LoanDisbursal;