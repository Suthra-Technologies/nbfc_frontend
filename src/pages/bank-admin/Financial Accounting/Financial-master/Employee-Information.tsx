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

export function EmployeeInformation() {
    // Mock data for table
    const [employees] = useState([]);

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] text-[#334155] font-sans">
            <div className="p-6 space-y-6 max-w-[1600px] mx-auto w-full">
                
                {/* 1. Header Information Section */}
                <Card className="border-[#e2e8f0] shadow-sm bg-white overflow-hidden rounded-md">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                            <div className="flex items-center gap-4">
                            <Label htmlFor="date" className="whitespace-nowrap w-19 text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Date:</Label>
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
                                <Label htmlFor="branch" className="whitespace-nowrap w-19 text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Branch :<span className="text-red-500 ml-0.5">*</span></Label>
                                <Select>
                                    <SelectTrigger id="branch" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm">
                                        <SelectValue placeholder="Select Branch" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-[#e2e8f0]">
                                        <SelectItem value="main">Main Branch</SelectItem>
                                        <SelectItem value="city">City Branch</SelectItem>
                                        <SelectItem value="rural">Rural Branch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center gap-4">
                                <Label htmlFor="designation" className="whitespace-nowrap w-36 text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Designation :<span className="text-red-500 ml-0.5">*</span></Label>
                                <Select>
                                    <SelectTrigger id="designation" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm">
                                        <SelectValue placeholder="Select Designation" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-[#e2e8f0]">
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="accountant">Accountant</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Employee Entry Details Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white p-8 pt-12 text-[#1e293b] shadow-sm">
                    <div className="absolute top-5 left-8 flex items-center gap-2">
                        <div className="bg-[#009bb0] p-1.5 rounded-sm">
                            <Activity className="h-3.5 w-3.5 text-white" />
                        </div>
                        <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Employee Details</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="firstName" className="whitespace-nowrap w-19 text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Name:<span className="text-red-500 ml-0.5">*</span></Label>
                            <Input 
                                id="firstName" 
                                placeholder="Enter First Name" 
                                className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <Label htmlFor="surname" className="whitespace-nowrap w-19 text-[11px] font-bold text-[#64748b] uppercase tracking-[0.05em]">Surname :<span className="text-red-500 ml-0.5">*</span></Label>
                            <Input 
                                id="surname" 
                                placeholder="Enter Surname" 
                                className="h-10 border-[#e2e8f0] focus:border-[#009bb0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none text-sm" 
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Listed Records (Table) Section */}
                <div className="relative border border-[#e2e8f0] rounded-sm bg-white overflow-hidden text-[#1e293b] shadow-sm">
                     <div className="px-8 py-5 border-b border-[#f1f5f9] flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#009bb0] p-1.5 rounded-sm">
                                <Activity className="h-3.5 w-3.5 text-white" />
                            </div>
                            <span className="text-[#009bb0] font-bold text-[11px] uppercase tracking-wide">Previous Records</span>
                        </div>
                        <span className="text-[10px] text-[#64748b] font-medium italic">Total records: 0</span>
                    </div>

                    <div className="overflow-x-auto min-h-[300px]">
                        <Table className="border-collapse">
                            <TableHeader className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                                <TableRow className="hover:bg-transparent uppercase">
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] w-12 text-center">Sno</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Employee Id</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Designation</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Employee Name</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 border-r border-[#e2e8f0] px-4">Surname</TableHead>
                                    <TableHead className="text-[10px] font-bold text-[#64748b] h-10 px-4">Branch Name</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-40 text-center text-[#94a3b8] italic text-sm">
                                            No employee records found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map((_, index) => (
                                        <TableRow key={index} className="hover:bg-[#f8fafc] transition-colors border-b border-dashed border-[#e2e8f0]">
                                            <TableCell className="text-center font-medium text-sm border-r border-dashed border-[#e2e8f0] h-10">{index + 1}</TableCell>
                                            {/* Data cells... */}
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Bar */}
                    <div className="bg-[#009bb0] text-white px-4 py-1.5 flex items-center justify-between text-[11px] font-semibold border-t border-[#334155]">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#009bb0] transition-colors">
                                <ChevronsLeft className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#009bb0] transition-colors">
                                <ChevronLeft className="h-4 w-4" />
                            </div>
                            <div className="h-3.5 w-[1px] bg-slate-500 mx-1"></div>
                            <div className="flex items-center gap-2">
                                <span>Page</span>
                                <input type="text" className="w-8 h-4.5 bg-white text-[#1e293b] text-center rounded-sm outline-none border-none shadow-inner" defaultValue="1" />
                                <span className="text-slate-300">of 1</span>
                            </div>
                            <div className="h-3.5 w-[1px] bg-slate-500 mx-1"></div>
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#009bb0] transition-colors">
                                <ChevronRight className="h-4 w-4" />
                            </div>
                            <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#009bb0] transition-colors">
                                <ChevronsRight className="h-4 w-4" />
                            </div>
                            <div className="h-3.5 w-[1px] bg-slate-500 mx-1"></div>
                            <div className="flex items-center gap-2 px-2">
                                <RotateCcw className="h-3.5 w-3.5 text-[#fde047] cursor-pointer hover:rotate-180 transition-transform duration-500" />
                                <span className="text-slate-200">Size:</span>
                                <select className="bg-white text-[#1e293b] rounded-sm h-4.5 min-w-[35px] outline-none px-1 text-[10px] font-bold cursor-pointer" defaultValue="18">
                                    <option value="18">18</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-slate-200 font-medium tracking-wide">
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
                        <span>Save Member Details</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}


