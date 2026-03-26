import { useState } from 'react';
import { 
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    RotateCcw,
    Activity,
    Save,
    PlusCircle,
    Copy,
    Landmark
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

export function ChequeManagement() {
    // Mock data for table
    const [chequeBooks] = useState([]);

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
                
                {/* 1. Toolbar and Quick Actions Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md">
                    <div className="bg-[#f8fafc] px-6 py-2 border-b border-[#e2e8f0] flex items-center justify-between">
                         <div className="flex items-center gap-1">
                            <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold text-[#009bb0] uppercase tracking-wider flex items-center gap-2 hover:bg-[#009bb0]/5 rounded-sm">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span>Add Cheque Book</span>
                            </Button>
                            <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold text-[#009bb0] uppercase tracking-wider flex items-center gap-2 hover:bg-[#009bb0]/5 rounded-sm">
                                <Copy className="h-3.5 w-3.5" />
                                <span>Generate Cheques</span>
                            </Button>
                            <Button variant="ghost" className="h-8 px-3 text-[10px] font-bold text-[#009bb0] uppercase tracking-wider flex items-center gap-2 hover:bg-[#009bb0]/5 rounded-sm">
                                <Landmark className="h-3.5 w-3.5" />
                                <span>All Banks</span>
                            </Button>
                        </div>
                    </div>
                    <CardContent className="p-8 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                            {/* Left Column */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="bankName" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Bank Name:</Label>
                                    <Select>
                                        <SelectTrigger id="bankName" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm">
                                            <SelectValue placeholder="Select Bank Name" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="sbi">State Bank of India</SelectItem>
                                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                                            <SelectItem value="icici">ICICI Bank</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="location" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Location:</Label>
                                    <Input 
                                        id="location" 
                                        placeholder="Enter Location" 
                                        className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="filterBy" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Filter by:</Label>
                                    <Select defaultValue="running">
                                        <SelectTrigger id="filterBy" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm">
                                            <SelectValue placeholder="Filter By" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-[#e2e8f0]">
                                            <SelectItem value="running">Running</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Middle Column */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="accountType" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Account Type:</Label>
                                    <Input 
                                        id="accountType" 
                                        placeholder="Account Type" 
                                        className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="accountNo" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Account No.:</Label>
                                    <Input 
                                        id="accountNo" 
                                        placeholder="Account Number" 
                                        className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                             <div className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="accountName" className="whitespace-nowrap min-w-max text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Account Name:</Label>
                                    <Input 
                                        id="accountName" 
                                        placeholder="Account Name" 
                                        className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Listed Records (Book Entry Table) Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white overflow-hidden text-[#1e293b] shadow-sm">
                     <div className="px-8 py-5 border-b border-[#f1f5f9] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#009bb0] p-1.5 rounded-sm">
                                <Activity className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Book Entry Details</span>
                        </div>
                        <span className="text-[10px] text-[#64748b] font-medium italic">Total book entries: 0</span>
                    </div>

                    <div className="overflow-x-auto min-h-[350px]">
                        <Table className="border-collapse">
                            <TableHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                                <TableRow className="hover:bg-transparent uppercase">
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Book Id</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">From</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">To</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4 text-center">No. of Cheques</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Status Name</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 px-4">Bank Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {chequeBooks.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-60 text-center text-[#94a3b8] italic text-sm">
                                            No cheque book entries found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    chequeBooks.map((_, index) => (
                                        <TableRow key={index} className="hover:bg-[#f8fafc] transition-colors border-b border-dashed border-[#e2e8f0]">
                                            <TableCell className="text-sm font-semibold border-r border-dashed border-[#e2e8f0] h-11 px-4 text-[#009bb0]">B-00{index + 1}</TableCell>
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
                        <span>Save Cheque Details</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
