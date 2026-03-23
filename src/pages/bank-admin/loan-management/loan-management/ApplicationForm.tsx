import React, { useState } from 'react';
import {
    Calendar,
    User,
    Smartphone,
    Shield,
    DollarSign,
    ArrowRightCircle,
    Save,
    RefreshCcw,
    Users,
    FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ApplicationForm: React.FC = () => {
    const [date, setDate] = useState<string>("2026-03-06");
    const primaryColor = "hsl(221, 83%, 53%)";
    const primaryColorLight = "hsla(221, 83%, 53%, 0.15)";

    return (
        <div className="flex flex-col h-full bg-[#f0f4f8] p-4 md:p-8 gap-6 animate-in fade-in duration-500">
            {/* Top Navigation / Status */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
                        <FileText className="w-8 h-8" style={{ color: primaryColor }} />
                        Loan Application Form
                    </h1>
                    <p className="text-slate-500 font-medium">Create and process new credit applications.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
                    <Label htmlFor="appDate" className="text-xs font-bold uppercase text-slate-400">Date of application:</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="appDate"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="h-9 border-none font-bold text-slate-700 focus-visible:ring-0 w-36"
                        />
                        <Calendar size={18} className="text-slate-400" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Applicant Details */}
                <Card className="xl:col-span-2 border-none shadow-xl rounded-3xl overflow-hidden">
                    <CardHeader className="p-0">
                        <div className="p-6 text-white" style={{ backgroundColor: primaryColor }}>
                            <CardTitle className="flex items-center gap-3 text-xl font-bold">
                                <User className="w-6 h-6" />
                                Applicant Details
                            </CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 space-y-8">
                        {/* Member Type & Entry Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Membership Type</Label>
                                <RadioGroup defaultValue="member" className="flex gap-8">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="member" id="member" className="border-2" style={{ color: primaryColor }} />
                                        <Label htmlFor="member" className="font-semibold text-slate-700 cursor-pointer">Member</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="non-member" id="non-member" className="border-2" />
                                        <Label htmlFor="non-member" className="font-semibold text-slate-700 cursor-pointer">Non-Member</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="space-y-4">
                                <Label className="text-sm font-bold text-slate-600 uppercase tracking-wider">Entry Type</Label>
                                <RadioGroup defaultValue="new" className="flex gap-8">
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="new" id="new" className="border-2" style={{ color: primaryColor }} />
                                        <Label htmlFor="new" className="font-semibold text-slate-700 cursor-pointer">New</Label>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <RadioGroupItem value="existing" id="existing" className="border-2" />
                                        <Label htmlFor="existing" className="font-semibold text-slate-700 cursor-pointer">Existing</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                        </div>

                        <Separator className="bg-slate-100" />

                        {/* Core Applicant Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Nature of Loan :*</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select Nature Of Loan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal Loan</SelectItem>
                                        <SelectItem value="business">Business Loan</SelectItem>
                                        <SelectItem value="vehicle">Vehicle Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Applicant Type :*</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select Applicant type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="joint">Joint</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Membership ID :*</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select Membership ID" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="m1">MEM-001</SelectItem>
                                        <SelectItem value="m2">MEM-002</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Service Center :*</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="GROUTH CENTER" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="growth">GROUTH CENTER</SelectItem>
                                        <SelectItem value="main">MAIN BRANCH</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Agent Type :*</Label>
                                <Select defaultValue="direct">
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select Agent Type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="direct">Direct</SelectItem>
                                        <SelectItem value="broker">Broker</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Company Name :*</Label>
                                <Select defaultValue="maha">
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select Company Name" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="maha">THE MAHA MAHA MUTUALLY AIDED ...</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Applicant Name :*</Label>
                                <Input placeholder="Enter Applicant Name" className="h-11 rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-indigo-500" />
                            </div>
                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Phone No. :*</Label>
                                <div className="relative">
                                    <Smartphone className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <Input placeholder="Enter MobileNo." className="pl-10 h-11 rounded-xl bg-slate-50 border-slate-200" />
                                </div>
                            </div>

                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Occupation Type :*</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl bg-slate-50 border-slate-200">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="salaried">Salaried</SelectItem>
                                        <SelectItem value="self-employed">Self Employed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2.5">
                                <Label className="font-bold text-slate-700 text-sm">Purpose of loan :*</Label>
                                <Input placeholder="Enter Purpose" className="h-11 rounded-xl bg-slate-50 border-slate-200" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Right Column: Financial & ID Details */}
                <div className="space-y-8">
                    {/* Financial Information */}
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="bg-slate-900 text-white p-5 border-none">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-400" />
                                Financial Terms
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 gap-5">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Interest Expected :*</Label>
                                    <Select>
                                        <SelectTrigger className="h-10 rounded-xl">
                                            <SelectValue placeholder="Select Percentage" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="12">12%</SelectItem>
                                            <SelectItem value="14">14%</SelectItem>
                                            <SelectItem value="16">16%</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-500 uppercase">EMI Type :*</Label>
                                        <Select>
                                            <SelectTrigger className="h-10 rounded-xl">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="monthly">Monthly</SelectItem>
                                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold text-slate-500 uppercase">Interest Mode :*</Label>
                                        <Select>
                                            <SelectTrigger className="h-10 rounded-xl">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="flat">Flat</SelectItem>
                                                <SelectItem value="reducing">Reducing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Tenure (Months) :*</Label>
                                    <Input placeholder="Enter Tenure" type="number" className="h-10 rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Amount Requested :*</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-2.5 text-slate-400 text-sm font-bold">₹</span>
                                        <Input placeholder="Enter Amount" type="number" className="pl-8 h-10 rounded-xl" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold text-slate-500 uppercase">Security Value :*</Label>
                                    <Input defaultValue="0" type="number" className="h-10 rounded-xl" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* ID Proof Details */}
                    <Card className="border-none shadow-xl rounded-2xl overflow-hidden">
                        <CardHeader className="p-5 border-none" style={{ backgroundColor: primaryColor, color: 'white' }}>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                ID Proof Verification
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-[10px] font-bold text-slate-400 uppercase">PAN Card Number</Label>
                                    <Input placeholder="ENTER PAN NO." className="h-10 rounded-xl uppercase tracking-widest text-xs" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-[10px] font-bold text-slate-400 uppercase">Aadhar Card Number</Label>
                                    <Input placeholder="Enter Adhar Card No." className="h-10 rounded-xl text-xs" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-[10px] font-bold text-slate-400 uppercase">Driving Licence</Label>
                                    <Input placeholder="ENTER LICENCE NO." className="h-10 rounded-xl text-xs" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <Label className="text-[10px] font-bold text-slate-400 uppercase">Voter ID</Label>
                                    <Input placeholder="ENTER VOTER ID" className="h-10 rounded-xl text-xs" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Bottom Section: Guardians & Co-Applicants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <Card className="border-none shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl" style={{ backgroundColor: primaryColorLight }}>
                                <Users className="w-6 h-6" style={{ color: primaryColor }} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-sm font-bold text-slate-700">Co-Applicants</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl">
                                        <SelectValue placeholder="Select No of co-applicants" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">None</SelectItem>
                                        <SelectItem value="1">1 Person</SelectItem>
                                        <SelectItem value="2">2 Persons</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg rounded-2xl">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-orange-100">
                                <Shield className="w-6 h-6 text-orange-600" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-sm font-bold text-slate-700">Guarantors</Label>
                                <Select>
                                    <SelectTrigger className="h-11 rounded-xl">
                                        <SelectValue placeholder="Select No of Guarantors" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">None</SelectItem>
                                        <SelectItem value="1">1 Person</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Action Bar */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md p-6 rounded-t-3xl border-t shadow-2xl flex items-center justify-between z-10">
                <div className="flex gap-4">
                    <Button variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Reset Form
                    </Button>
                </div>
                <div className="flex gap-4">
                    <Button variant="ghost" className="h-12 px-8 rounded-2xl text-slate-400 font-bold">
                        Cancel
                    </Button>
                    <Button className="h-12 px-12 rounded-2xl font-bold shadow-lg transition-all hover:scale-105 active:scale-95" style={{ backgroundColor: primaryColor }}>
                        <Save className="w-5 h-5 mr-2" />
                        Save Application
                        <ArrowRightCircle className="ml-3 w-5 h-5 opacity-50" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;
