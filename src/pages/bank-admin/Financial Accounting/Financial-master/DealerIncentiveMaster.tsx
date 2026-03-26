import { useState } from 'react';
import { 
    Calendar as CalendarIcon, 
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    RotateCcw,
    Activity,
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function DealerIncentiveMaster() {
    // Mock data for table
    const [incentives] = useState([]);

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
                
                {/* 1. Listed Records (Table) Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white overflow-hidden text-[#1e293b] shadow-sm">
                     <div className="px-8 py-5 border-b border-[#f1f5f9] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#009bb0] p-1.5 rounded-sm">
                                <Activity className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Dealer Incentive Records</span>
                        </div>
                        <span className="text-[10px] text-[#64748b] font-medium italic">Total records: 0</span>
                    </div>

                    <div className="overflow-x-auto min-h-[350px]">
                        <Table className="border-collapse">
                            <TableHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                                <TableRow className="hover:bg-transparent uppercase">
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] w-12 text-center">Sno</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Scheme Name</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Loan Type</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">Flat/Perc</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">Date</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">Amt Type</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">Limit Type</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-right">From Amt</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 px-4 text-right">To Amt</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {incentives.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="h-60 text-center text-[#94a3b8] italic text-sm">
                                            No incentive records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    incentives.map((_, index) => (
                                        <TableRow key={index} className="hover:bg-[#f8fafc] transition-colors border-b border-dashed border-[#e2e8f0]">
                                            <TableCell className="text-center font-medium text-sm border-r border-dashed border-[#e2e8f0] h-11">{index + 1}</TableCell>
                                            {/* Data cells... */}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Bar (TEAL THEME) */}
                    <div className="bg-[#009bb0] text-white px-4 py-1.5 flex items-center justify-between text-[11px] font-semibold border-t border-[#008ba0]">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">
                                <ChevronsLeft className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </div>
                            <div className="h-3.5 w-[1px] bg-white/20 mx-1"></div>
                            <div className="flex items-center gap-2 text-white">
                                <span>Page</span>
                                <input type="text" className="w-8 h-4.5 bg-white text-[#1e293b] text-center rounded-sm outline-none border-none shadow-inner" defaultValue="1" />
                                <span className="opacity-80">of 1</span>
                            </div>
                            <div className="h-3.5 w-[1px] bg-white/20 mx-1"></div>
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 transition-colors">
                                <ChevronsRight className="h-4 w-4" />
                            </div>
                            <div className="h-3.5 w-[1px] bg-white/20 mx-1"></div>
                            <div className="flex items-center gap-2 px-2">
                                <RotateCcw className="h-3.5 w-3.5 text-[#fde047] cursor-pointer hover:rotate-180 transition-transform duration-500" />
                                <span className="opacity-90">Size:</span>
                                <select className="bg-white text-[#1e293b] rounded-sm h-4.5 min-w-[35px] outline-none px-1 text-[10px] font-bold cursor-pointer" defaultValue="18">
                                    <option value="18">18</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-white/80 font-medium tracking-wide">
                            No data to display
                        </div>
                    </div>
                </div>

                {/* 2. Incentive Entry Form Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-8 pt-12 text-[#334155] shadow-sm">
                    <div className="absolute top-5 left-8 flex items-center gap-2">
                        <div className="bg-[#009bb0] p-1.5 rounded-sm">
                            <Activity className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Dealer Incentive Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                        {/* Left Column */}
                        <div className="space-y-5">
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
                                <Label htmlFor="loanType" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Loan Type :</Label>
                                <Select>
                                    <SelectTrigger id="loanType" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm font-medium">
                                        <SelectValue placeholder="Select Loan type" className="text-slate-400" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-[#e2e8f0]">
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="gold">Gold Loan</SelectItem>
                                        <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-4">
                                <Label htmlFor="schemeName" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Scheme Name :</Label>
                                <Input 
                                    id="schemeName" 
                                    placeholder="Enter Scheme Name" 
                                    className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm uppercase placeholder:text-slate-300" 
                                />
                            </div>
                        </div>

                        {/* Middle Column */}
                        <div className="space-y-5">
                            <div className="flex items-center gap-6">
                                <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Amount Type :</Label>
                                <RadioGroup defaultValue="flat" className="flex items-center gap-8">
                                    <div className="flex items-center space-x-2.5">
                                        <RadioGroupItem value="flat" id="flat" className="border-[#009bb0] text-[#009bb0] ring-offset-[#009bb0]" />
                                        <Label htmlFor="flat" className="text-xs font-bold text-[#1e293b] cursor-pointer">Flat</Label>
                                    </div>
                                    <div className="flex items-center space-x-2.5">
                                        <RadioGroupItem value="percentage" id="percentage" className="border-[#009bb0] text-[#009bb0] ring-offset-[#009bb0]" />
                                        <Label htmlFor="percentage" className="text-xs font-bold text-[#1e293b] cursor-pointer">Percentage</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="flatAmount" className="text-[10px] font-bold text-[#94a3b8] uppercase">Flat :</Label>
                                    <Input id="flatAmount" placeholder="Enter Flat amount" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="percentageVal" className="text-[10px] font-bold text-[#94a3b8] uppercase">Percentage (%) :</Label>
                                    <Input id="percentageVal" placeholder="(%)" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" />
                                </div>
                            </div>
                            <div className="flex items-center gap-6 pt-2">
                                <Label className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Limit/Unlimit :</Label>
                                <RadioGroup defaultValue="limit" className="flex items-center gap-8">
                                    <div className="flex items-center space-x-2.5">
                                        <RadioGroupItem value="limit" id="limit" className="border-[#009bb0] text-[#009bb0] ring-offset-[#009bb0]" />
                                        <Label htmlFor="limit" className="text-xs font-bold text-[#1e293b] cursor-pointer">Limit</Label>
                                    </div>
                                    <div className="flex items-center space-x-2.5">
                                        <RadioGroupItem value="unlimit" id="unlimit" className="border-[#009bb0] text-[#009bb0] ring-offset-[#009bb0]" />
                                        <Label htmlFor="unlimit" className="text-xs font-bold text-[#1e293b] cursor-pointer">Unlimit</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        {/* Right Column */}
                         <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fromAmt" className="text-[10px] font-bold text-[#94a3b8] uppercase">From :</Label>
                                    <Input id="fromAmt" placeholder="Enter From amount" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm font-semibold" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="toAmt" className="text-[10px] font-bold text-[#94a3b8] uppercase">To :</Label>
                                    <Input id="toAmt" placeholder="Enter To amount" className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm font-semibold" />
                                </div>
                            </div>
                            <div className="h-10"></div> {/* Spacer to align with rows */}
                            <div className="h-10"></div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <Button 
                        variant="destructive"
                        className="bg-[#ff4d5a] hover:bg-[#e64450] text-white flex items-center gap-2 px-8 h-10 rounded-sm shadow-sm transition-all active:scale-[0.98] font-semibold text-xs border-none"
                    >
                        <RotateCcw className="h-4 w-4" />
                        <span>Reset Form</span>
                    </Button>
                    <Button 
                        className="bg-[#009bb0] hover:bg-[#008ba0] text-white flex items-center gap-2 px-8 h-10 rounded-sm shadow-sm transition-all active:scale-[0.98] font-semibold text-xs border-none"
                    >
                        <Save className="h-4 w-4" />
                        <span>Save Dealer details</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
