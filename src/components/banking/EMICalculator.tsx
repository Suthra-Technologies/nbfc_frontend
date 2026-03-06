import { useState, useEffect } from "react";
import {
    Calculator,
    TrendingUp,
    Calendar,
    IndianRupee,
    Info,
    ArrowRight,
    RotateCcw
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface EMICalculatorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

type EMIType = "FLAT" | "DIMINISHING";

export function EMICalculator({ open, onOpenChange }: EMICalculatorProps) {
    const [amount, setAmount] = useState<number>(5000000); // 50 Lakhs default
    const [interest, setInterest] = useState<number>(10.5);
    const [tenure, setTenure] = useState<number>(10); // 10 months default
    const [emiType, setEmiType] = useState<EMIType>("DIMINISHING");

    const [emi, setEmi] = useState<number>(0);
    const [totalInterest, setTotalInterest] = useState<number>(0);
    const [totalPayment, setTotalPayment] = useState<number>(0);

    const calculateEMI = () => {
        const p = amount;
        const r = interest / 12 / 100;
        const n = tenure;

        let emiValue = 0;
        let totalPayable = 0;

        if (emiType === "DIMINISHING") {
            // Reducing Balance Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
            if (r === 0) {
                emiValue = p / n;
            } else {
                emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            }
            totalPayable = emiValue * n;
        } else {
            // Flat Rate Formula: (P + (P * r_annual * t_years)) / N
            const totalInt = (p * (interest / 100) * (n / 12));
            totalPayable = p + totalInt;
            emiValue = totalPayable / n;
        }

        const totalInt = totalPayable - p;

        setEmi(emiValue);
        setTotalInterest(totalInt);
        setTotalPayment(totalPayable);
    };

    const handleClear = () => {
        setAmount(5000000);
        setInterest(10.5);
        setTenure(10);
        setEmiType("DIMINISHING");
    };

    useEffect(() => {
        calculateEMI();
    }, [amount, interest, tenure, emiType]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    const interestPercentage = (totalInterest / totalPayment) * 100 || 0;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[750px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
                <DialogHeader className="p-8 bg-gradient-to-br from-[#009BB0] to-[#008aa0] text-white relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Calculator size={120} />
                    </div>
                    <div className="relative z-10 flex items-center gap-4 mb-2">
                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                            <Calculator className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-black tracking-tight">EMI Tool</DialogTitle>
                            <DialogDescription className="text-white/80 font-medium">
                                Professional Credit Analysis & Repayment Projector
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-0 overflow-hidden bg-white">
                    {/* Input Section */}
                    <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto border-r border-slate-100">
                        {/* EMI Type Selection */}
                        <div className="space-y-4">
                            <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                <Info size={12} className="text-[#009BB0]" />
                                EMI Type / Interest Mode
                            </Label>
                            <Select
                                value={emiType}
                                onValueChange={(val: EMIType) => setEmiType(val)}
                            >
                                <SelectTrigger className="h-12 rounded-xl border-slate-200 font-bold focus:ring-[#009BB0]/20 bg-slate-50/50">
                                    <SelectValue placeholder="Select EMI Type" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                    <SelectItem value="DIMINISHING" className="font-medium">Diminishing (Reducing)</SelectItem>
                                    <SelectItem value="FLAT" className="font-medium">Flat Rate</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Principal Amount */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                    <IndianRupee size={12} className="text-[#009BB0]" />
                                    Amount Requested
                                </Label>
                                <span className="text-lg font-black text-[#009BB0]">{formatCurrency(amount)}</span>
                            </div>
                            <Slider
                                value={[amount]}
                                onValueChange={(vals) => setAmount(vals[0])}
                                min={100000}
                                max={10000000}
                                step={50000}
                                className="py-2 [&>span:first-child]:bg-slate-200 [&_[role=slider]]:bg-white [&_[role=slider]]:border-[#009BB0] [&_[role=slider]]:border-2"
                            />
                            <Input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="h-12 rounded-xl border-slate-200 font-bold bg-slate-50/30 text-center text-lg shadow-inner border-dashed"
                            />
                        </div>

                        {/* Interest Rate */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                    <TrendingUp size={12} className="text-emerald-500" />
                                    Interest Expected (%)
                                </Label>
                                <span className="text-lg font-black text-emerald-600">{interest}%</span>
                            </div>
                            <Slider
                                value={[interest]}
                                onValueChange={(vals) => setInterest(vals[0])}
                                min={1}
                                max={36}
                                step={0.1}
                                className="py-2 [&>span:first-child]:bg-slate-200 [&_[role=slider]]:bg-white [&_[role=slider]]:border-emerald-500 [&_[role=slider]]:border-2"
                            />
                            <Input
                                type="number"
                                value={interest}
                                step={0.1}
                                onChange={(e) => setInterest(Number(e.target.value))}
                                className="h-12 rounded-xl border-slate-200 font-bold bg-slate-50/30 text-center text-lg shadow-inner border-dashed"
                            />
                        </div>

                        {/* Tenure */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1.5">
                                    <Calendar size={12} className="text-amber-500" />
                                    Tenure of Loan (Months)
                                </Label>
                                <span className="text-lg font-black text-amber-600">{tenure} Mo</span>
                            </div>
                            <Slider
                                value={[tenure]}
                                onValueChange={(vals) => setTenure(vals[0])}
                                min={10}
                                max={120}
                                step={1}
                                className="py-2 [&>span:first-child]:bg-slate-200 [&_[role=slider]]:bg-white [&_[role=slider]]:border-amber-500 [&_[role=slider]]:border-2"
                            />
                            <Input
                                type="number"
                                value={tenure}
                                onChange={(e) => setTenure(Number(e.target.value))}
                                className="h-12 rounded-xl border-slate-200 font-bold bg-slate-50/30 text-center text-lg shadow-inner border-dashed"
                            />
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="bg-slate-50/50 p-8 flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 ring-4 ring-slate-50 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Calculated Monthly EMI</p>
                                <p className="text-4xl font-black text-[#009BB0]">{formatCurrency(emi)}</p>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-slate-300" />
                                        <span className="text-xs font-bold text-slate-500">Principal Requested</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-700">{formatCurrency(amount)}</span>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#009BB0]" />
                                        <span className="text-xs font-bold text-slate-500">Total Interest Payable</span>
                                    </div>
                                    <span className="text-sm font-black text-[#009BB0]">{formatCurrency(totalInterest)}</span>
                                </div>
                            </div>

                            {/* Visualization */}
                            <div className="relative pt-6">
                                <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase mb-3">
                                    <span>Interest Breakdown</span>
                                    <span className="text-[#009BB0]">{interestPercentage.toFixed(1)}% Interest Cost</span>
                                </div>
                                <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner text-center">
                                    <div
                                        className="h-full bg-slate-300 transition-all duration-700 ease-out"
                                        style={{ width: `${100 - interestPercentage}%` }}
                                    />
                                    <div
                                        className="h-full bg-[#009BB0] transition-all duration-700 ease-out"
                                        style={{ width: `${interestPercentage}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 space-y-4">
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={handleClear}
                                    className="flex-1 h-14 rounded-2xl font-bold border-slate-200 hover:bg-slate-50 text-slate-600 gap-2 transition-all active:scale-95"
                                >
                                    <RotateCcw size={18} /> Clear
                                </Button>
                                <Button
                                    className="flex-[2] bg-[#009BB0] hover:bg-[#008aa0] text-white h-14 rounded-2xl font-black text-lg gap-2 shadow-lg shadow-[#009BB0]/20 transition-all active:scale-95 group"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Get EMI Schedule <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                            <p className="text-[10px] font-bold text-center text-slate-400">
                                This is an estimate based on {emiType.toLowerCase()} interest calculation.
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
