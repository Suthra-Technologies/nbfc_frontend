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

const PreClosure = () => {
    const [paymentMode, setPaymentMode] = useState('cash');

    return (
        <div className="flex flex-col h-full bg-white text-[#1e293b] font-sans">
            {/* Toolbar Removed */}

            <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-white">
                    <CardContent className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex items-center gap-4">
                                <Label htmlFor="date" className="w-40 text-[11px] font-bold text-[#64748b] uppercase">Date:</Label>
                                <div className="relative flex-1 group">
                                    <Input id="date" defaultValue="24/03/2026" className="h-10 border-[#e2e8f0] group-hover:border-[#009BB0] transition-colors pr-8 bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                                    <CalendarIcon className="absolute right-2 top-1.5 h-4 w-4 text-[#64748b]" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="nature" className="w-40 text-[11px] font-bold text-[#64748b] uppercase">Nature of loan :</Label>
                                <Select>
                                    <SelectTrigger id="nature" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Nature of loan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="gold">Gold Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="interest-expected" className="w-40 text-[11px] font-bold text-[#64748b] uppercase">
                                    Interest expected :<span className="text-red-500 ml-1 font-bold">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger id="interest-expected" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Percentage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="12">12%</SelectItem>
                                        <SelectItem value="14">14%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="account" className="w-40 text-[11px] font-bold text-[#64748b] uppercase">Loan account No.:</Label>
                                <Select>
                                    <SelectTrigger id="account" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Loan account No." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="acc1">LA-2026-001</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Application Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009BB0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#004e5a] font-bold text-xs">Application details</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12">
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Co-applicant1 :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Co-applicant2 :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Unique Id :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start lg:row-start-2">
                            <span className="text-[13px] font-bold text-[#475569]">Approved amount :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start lg:row-start-2">
                            <span className="text-[13px] font-bold text-[#475569]">Rate of interest :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start h-[20px]">
                            {/* Empty for spacing relative to image */}
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Disbursed Date :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-bold text-[#475569]">Tenor of loan :</span>
                            <span className="text-[13px] font-semibold w-1/2">---</span>
                        </div>
                    </div>
                </div>

                {/* Entry Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-6 pt-10 shadow-sm">
                    <div className="absolute top-4 left-6 flex items-center gap-2">
                        <div className="bg-[#009BB0] p-1.5 rounded-sm">
                            <Activity className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[#004e5a] font-bold text-xs">Entries</span>
                    </div>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4">
                            <div className="flex items-center gap-4 col-span-1 md:col-span-1">
                                <Label className="w-40 text-[13px] font-bold text-[#475569]">Last EMI Paid Date:</Label>
                                <Input className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
                            <div className="flex items-center gap-4">
                                <Label className="w-32 text-[13px] font-bold text-[#475569]">Loan Outstanding:</Label>
                                <Input className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label className="w-32 text-[13px] font-bold text-[#475569]">Interest :</Label>
                                <Input className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label className="w-32 text-[13px] font-bold text-[#475569]">Pre Closure Charges :</Label>
                                <Input className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Label className="w-32 text-[11px] font-bold text-[#64748b] uppercase">Total amount:</Label>
                                <Input className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <Label className="w-32 text-[13px] font-bold text-[#475569] pt-2">Narration :</Label>
                            <Textarea
                                className="bg-white border-[#cbd5e0] hover:border-[#a0aec0] transition-colors resize-none h-16 text-[13px] text-[#1e293b] flex-1 max-w-2xl"
                            />
                        </div>
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
                        <div className="flex flex-col md:flex-row md:items-center gap-x-12 gap-y-4">
                            <div className="flex items-center gap-8">
                                <span className="text-[13px] font-bold text-[#1e293b]">Mode of payment :</span>
                                <RadioGroup
                                    value={paymentMode}
                                    onValueChange={(value) => setPaymentMode(value)}
                                    className="flex items-center gap-6"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cash" id="p-cash" />
                                        <Label htmlFor="p-cash" className="text-[13px] font-semibold cursor-pointer">Cash</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cheque" id="p-cheque" />
                                        <Label htmlFor="p-cheque" className="text-[13px] font-semibold cursor-pointer">Cheque</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="direct" id="p-direct" />
                                        <Label htmlFor="p-direct" className="text-[13px] font-semibold cursor-pointer">Direct</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="transfer" id="p-transfer" />
                                        <Label htmlFor="p-transfer" className="text-[13px] font-semibold cursor-pointer">Transfer</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[13px] font-bold text-[#1e293b]">Pending Cheque Amount :</span>
                                <span className="text-[13px] font-semibold">---</span>
                            </div>
                        </div>

                        {paymentMode !== 'cash' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#cbd5e0]/30 p-4 rounded-md border border-[#cbd5e0] max-w-4xl">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Label className="w-32 text-[13px] font-bold text-[#475569]">Bank name:</Label>
                                        <Input placeholder="Enter Bank name" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="w-32 text-[13px] font-bold text-[#475569]">Cheque No.:</Label>
                                        <Input placeholder="Enter Cheque No." className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <Label className="w-32 text-[13px] font-bold text-[#475569]">Branch:</Label>
                                        <Input placeholder="Enter Branch" className="h-8 border-[#cbd5e0] bg-white text-[#1e293b] flex-1 text-[13px]" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Label className="w-32 text-[13px] font-bold text-[#475569]">Date:</Label>
                                        <div className="relative flex-1 group">
                                            <Input defaultValue="24/03/2026" className="h-8 border-[#cbd5e0] group-hover:border-[#a0aec0] transition-colors pr-8 bg-white text-[#1e293b] text-[13px]" />
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

export default PreClosure;