import { Save, RotateCcw } from 'lucide-react';
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

const EmiCalculator = () => {
    return (
        <div className="flex flex-col h-full bg-white text-[#1e293b] font-sans">
            {/* Toolbar Removed */}
            <div className="p-12 max-w-4xl mx-auto w-full">
                <Card className="border-[#e2e8f0] shadow-sm bg-white">
                    <CardContent className="p-8 space-y-8">
                        {/* EMI Form */}
                        <div className="space-y-6 max-w-2xl">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="emi-type" className="w-48 text-[11px] font-bold text-[#64748b] uppercase">
                                    Emi Type :<span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger id="emi-type" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Emi Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="reducing">Reducing Balance</SelectItem>
                                        <SelectItem value="flat">Flat Rate</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="interest" className="w-48 text-[11px] font-bold text-[#64748b] uppercase">
                                    Interest expected :<span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger id="interest" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Percentage" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10%</SelectItem>
                                        <SelectItem value="12">12%</SelectItem>
                                        <SelectItem value="14">14%</SelectItem>
                                        <SelectItem value="16">16%</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="interest-mode" className="w-48 text-[11px] font-bold text-[#64748b] uppercase">
                                    Interest Mode :<span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Select>
                                    <SelectTrigger id="interest-mode" className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none">
                                        <SelectValue placeholder="Select Payment Mode" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                        <SelectItem value="quarterly">Quarterly</SelectItem>
                                        <SelectItem value="yearly">Yearly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="tenure" className="w-48 text-[11px] font-bold text-[#64748b] uppercase">
                                    Tenure of loan :<span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Input
                                    id="tenure"
                                    placeholder="Enter Tenure"
                                    className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Label htmlFor="amount" className="w-48 text-[11px] font-bold text-[#64748b] uppercase">
                                    Amount requested:<span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Input
                                    id="amount"
                                    placeholder="Enter Amount"
                                    className="h-10 border-[#e2e8f0] bg-white text-[#1e293b] flex-1 rounded-sm hover:border-[#009bb0] transition-colors shadow-none"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Actions */}
            <div className="p-12 pt-0 max-w-4xl mx-auto w-full flex justify-end gap-4">
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

export default EmiCalculator;