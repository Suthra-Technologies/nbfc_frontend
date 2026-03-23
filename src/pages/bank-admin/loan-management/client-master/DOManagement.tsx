import React, { useState } from 'react';
import { 
    Save, 
    RefreshCcw, 
    ChevronLeft, 
    ChevronRight, 
    ChevronsLeft, 
    ChevronsRight,
    BookOpen,
    Hash,
    ArrowRightLeft,
    Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from '@/components/ui/table';

interface DOEntry {
    bookId: string;
    noOfDos: string;
    doFrom: string;
    doTo: string;
}

const DOManagement: React.FC = () => {
    const [entries, setEntries] = useState<DOEntry[]>([]);
    const [formData, setFormData] = useState<DOEntry>({
        bookId: '1',
        noOfDos: '',
        doFrom: '',
        doTo: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.bookId || !formData.noOfDos || !formData.doFrom || !formData.doTo) return;
        setEntries(prev => [...prev, formData]);
        setFormData({ bookId: (parseInt(formData.bookId) + 1).toString(), noOfDos: '', doFrom: '', doTo: '' });
    };

    const handleRefresh = () => {
        setFormData({ bookId: '1', noOfDos: '', doFrom: '', doTo: '' });
    };

    return (
        <div className="flex flex-col h-full bg-[#f8fafc] p-6 gap-6 animate-in fade-in duration-500">
            {/* Header section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">DO Management</h1>
                <p className="text-slate-500 text-sm">Manage delivery order books and series ranges.</p>
            </div>

            {/* Data Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="overflow-x-auto min-h-[400px]">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-[150px] font-bold text-slate-700">DO Book Id</TableHead>
                                <TableHead className="w-[150px] font-bold text-slate-700">NO Of DO's</TableHead>
                                <TableHead className="w-[150px] font-bold text-slate-700">DO From</TableHead>
                                <TableHead className="w-[150px] font-bold text-slate-700">DO To</TableHead>
                                <TableHead className="text-slate-700"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {entries.length > 0 ? (
                                entries.map((entry, index) => (
                                    <TableRow key={index} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="font-medium text-slate-900">{entry.bookId}</TableCell>
                                        <TableCell className="text-slate-600">{entry.noOfDos}</TableCell>
                                        <TableCell className="text-slate-600">{entry.doFrom}</TableCell>
                                        <TableCell className="text-slate-600">{entry.doTo}</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                                            <BookOpen size={48} className="opacity-10 mb-2" />
                                            <p className="text-sm font-medium">No data to display</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination area */}
                <div className="bg-slate-800 text-white p-2 flex items-center justify-between px-4 text-xs font-medium">
                    <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors opacity-50 cursor-not-allowed">
                            <ChevronsLeft size={14} />
                        </button>
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors opacity-50 cursor-not-allowed">
                            <ChevronLeft size={14} />
                        </button>
                        <span className="mx-2">Page</span>
                        <input 
                            type="text" 
                            className="w-10 bg-white text-slate-900 text-center rounded px-1 h-5 outline-none font-bold"
                            value="1"
                            readOnly
                        />
                        <span className="mx-2">of 1</span>
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors opacity-50 cursor-not-allowed">
                            <ChevronRight size={14} />
                        </button>
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors opacity-50 cursor-not-allowed">
                            <ChevronsRight size={14} />
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <RefreshCcw size={14} className="text-orange-400 animate-spin-slow" />
                            <span>Page size:</span>
                            <select className="bg-white text-slate-900 rounded px-1 h-5 font-bold outline-none border-none">
                                <option>18</option>
                                <option>50</option>
                                <option>100</option>
                            </select>
                        </div>
                        <span className="opacity-70">No data to display</span>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <div className="bg-[#cbd5e1] p-8 rounded-xl shadow-inner border border-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-4xl">
                    <div className="flex items-center gap-6">
                        <Label htmlFor="bookId" className="w-32 text-sm font-bold text-slate-700 flex items-center gap-2">
                            <BookOpen size={14} className="text-slate-400" />
                            DO BookId:
                        </Label>
                        <Input
                            id="bookId"
                            name="bookId"
                            value={formData.bookId}
                            onChange={handleInputChange}
                            className="bg-white border-slate-300 h-9 rounded shadow-sm focus-visible:ring-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Label htmlFor="noOfDos" className="w-32 text-sm font-bold text-slate-700 flex items-center gap-2">
                            <Hash size={14} className="text-slate-400" />
                            NO. Of DO's:
                        </Label>
                        <Input
                            id="noOfDos"
                            name="noOfDos"
                            value={formData.noOfDos}
                            onChange={handleInputChange}
                            className="bg-white border-slate-300 h-9 rounded shadow-sm focus-visible:ring-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Label htmlFor="doFrom" className="w-32 text-sm font-bold text-slate-700 flex items-center gap-2">
                            <ArrowRightLeft size={14} className="text-slate-400" />
                            DO From:
                        </Label>
                        <Input
                            id="doFrom"
                            name="doFrom"
                            value={formData.doFrom}
                            onChange={handleInputChange}
                            className="bg-white border-slate-300 h-9 rounded shadow-sm focus-visible:ring-slate-400"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <Label htmlFor="doTo" className="w-32 text-sm font-bold text-slate-700 flex items-center gap-2">
                            <ArrowRightLeft size={14} className="text-slate-400 rotate-180" />
                            DO To:
                        </Label>
                        <Input
                            id="doTo"
                            name="doTo"
                            value={formData.doTo}
                            onChange={handleInputChange}
                            className="bg-white border-slate-300 h-9 rounded shadow-sm focus-visible:ring-slate-400"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <Button 
                        onClick={handleSave}
                        className="bg-slate-700 hover:bg-slate-800 text-white flex items-center gap-2 px-6 h-10 shadow-md transition-all active:scale-95"
                    >
                        <Save size={16} className="text-green-400" />
                        Save
                    </Button>
                    <Button 
                        onClick={handleRefresh}
                        variant="secondary"
                        className="bg-slate-500 hover:bg-slate-600 text-white flex items-center gap-2 px-6 h-10 shadow-md transition-all active:scale-95 border-none"
                    >
                        <RefreshCcw size={16} className="text-blue-300" />
                        Refresh
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DOManagement;
