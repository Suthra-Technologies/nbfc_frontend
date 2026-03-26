import { useState } from 'react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const ProcessingChargesReceipt = () => {
    const [paymentMode, setPaymentMode] = useState('cash');

    return (
        <div className="flex flex-col h-full bg-white text-[#1e293b] font-sans">
            {/* Toolbar Removed */}

            <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row gap-6">
                    <Card className="flex-1 border-[#e2e8f0] shadow-sm bg-white">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="date" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Date:</Label>
                                <div className="relative flex-1 group">
                                    <Input id="date" defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none" />
                                    <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="nature" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Nature of loan:</Label>
                                <Select>
                                    <SelectTrigger id="nature" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm shadow-none">
                                        <SelectValue placeholder="Select Nature" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="gold">Gold Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="account" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Loan account No.:</Label>
                                <Select>
                                    <SelectTrigger id="account" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm shadow-none">
                                        <SelectValue placeholder="Select Loan account No." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acc1">LA-2026-001</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Applicant name:</Label>
                                <span className="text-sm font-semibold text-[#1e293b]">---</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Previous Receipts Table */}
                    <div className="lg:w-1/3 border border-[#009bb0] rounded-md overflow-hidden bg-white shadow-sm flex flex-col">
                        <div className="bg-[#009bb0] px-3 py-1.5 text-white text-sm font-bold">
                            Previous Receipts
                        </div>
                        <div className="flex-1 overflow-auto bg-[#e2e8f0]">
                            <Table>
                                <TableHeader className="bg-[#cbd5e0]">
                                    <TableRow className="h-8 hover:bg-transparent">
                                        <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-2 text-center">Date</TableHead>
                                        <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-2 text-center">Process.charges</TableHead>
                                        <TableHead className="h-8 text-[12px] font-bold text-[#334155] px-2 text-center">Doc.charges</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="h-12">
                                        <TableCell colSpan={3} className="text-center font-bold text-[#64748b] bg-white"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="bg-[#cbd5e0] px-3 py-1 flex justify-between items-center text-[12px] font-bold text-[#334155]">
                            <span>Total:</span>
                            <span>0</span>
                        </div>
                    </div>
                </div>

                {/* Applicant Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009BB0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#004e5a] font-bold text-xs">Applicant details</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Co Applicant1:</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Co Applicant2:</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start lg:row-start-2">
                            <span className="text-[13px] font-bold text-[#475569]">Approved amount:</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start lg:row-start-2">
                            <span className="text-[13px] font-bold text-[#475569]">Approved Date:</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start lg:row-start-2">
                            <span className="text-[13px] font-bold text-[#475569]">Tenor of loan:</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Rate of interest:</span>
                            <span className="text-[13px] font-semibold w-1/2 text-[#1e293b]">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569] leading-tight">Pending Processing fee:</span>
                            <span className="text-[13px] font-semibold w-1/2 text-[#1e293b]">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[11px] font-bold text-[#64748b] uppercase leading-tight">Pending Document charges:</span>
                            <span className="text-[13px] font-semibold w-1/2 text-[#1e293b]">---</span>
                        </div>
                    </div>
                </div>

                {/* Entry Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009BB0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#004e5a] font-bold text-xs">Entry details</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
                        <div className="flex items-center gap-4">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Processing fee:</Label>
                            <Input placeholder="Enter Processing fee" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Doc.charges:</Label>
                            <Input placeholder="Enter Doc. Charges" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Non Judical Stamps:</Label>
                            <Input placeholder="Enter Nonjudicalstam" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Referral Commission:</Label>
                            <Input placeholder="Enter RefCommission" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Other Income:</Label>
                            <Input placeholder="Enter OtherIncome" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                        </div>
                        <div className="flex items-center gap-4 font-bold">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Total Amount:</Label>
                            <Input placeholder="Enter TotalAmount" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px] font-bold" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="w-36 text-[13px] font-bold text-[#475569]">Financial Charges:</Label>
                            <Input placeholder="Financial Charges" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Insurance Charges:</Label>
                            <Input placeholder="Insurance Charges" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm shadow-none" />
                        </div>
                    </div>
                    <div className="mt-6 flex gap-4">
                        <Label className="w-36 text-[13px] font-bold text-[#475569] pt-2">Narration:</Label>
                        <Textarea
                            placeholder="Enter Narration"
                            className="bg-white border-[#cbd5e0] hover:border-[#a0aec0] transition-colors resize-none h-20 text-[13px] text-[#1e293b]"
                        />
                    </div>
                </div>

                {/* Payment Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009BB0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#004e5a] font-bold text-xs">Payment details</span>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-8">
                            <span className="text-[13px] font-bold text-[#334155]">Mode of payment:</span>
                            <RadioGroup
                                value={paymentMode}
                                onValueChange={(value) => setPaymentMode(value)}
                                className="flex items-center gap-6"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cash" id="cash" />
                                    <Label htmlFor="cash" className="text-[13px] font-semibold cursor-pointer">Cash</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cheque" id="cheque" />
                                    <Label htmlFor="cheque" className="text-[13px] font-semibold cursor-pointer">Cheque</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="draft" id="draft" />
                                    <Label htmlFor="draft" className="text-[13px] font-semibold cursor-pointer">Draft</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="direct" id="direct" />
                                    <Label htmlFor="direct" className="text-[13px] font-semibold cursor-pointer">Direct</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {paymentMode !== 'cash' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#f8fafc] p-4 rounded-md border border-[#e2e8f0] shadow-sm">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Bank name:</Label>
                                        <Input placeholder="Enter Bank name" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm shadow-none" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Cheque No.:</Label>
                                        <Input placeholder="Enter ChequeNo" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm shadow-none" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Branch:</Label>
                                        <Input placeholder="Enter Branch" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm shadow-none" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase">Date:</Label>
                                        <div className="relative flex-1 group">
                                            <Input defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm shadow-none" />
                                            <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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

export default ProcessingChargesReceipt;