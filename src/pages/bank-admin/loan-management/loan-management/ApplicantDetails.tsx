import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, User, Briefcase, IndianRupee, Save, RefreshCw, Send } from 'lucide-react';

export default function ApplicantDetails() {
    const [activeTab, setActiveTab] = useState("personal");

    // Form states
    const [personalDetails, setPersonalDetails] = useState({
        natureOfLoan: '',
        applicantId: '',
        applicantName: '',
        fatherHusbandName: '',
        residentialAddress: '',
        permanentAddress: '',
        city: '',
        state: '',
        pinCode: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        dependentsChildren: '',
        dependentsOthers: '',
        qualification: '',
        relationWithCoApplicant1: '',
        relationWithCoApplicant2: '',
        presentAccomodation: '',
        stayPeriodYears: '',
        stayPeriodMonths: '',
        phoneResidence: '',
        phoneMobile: '',
        email: '',
        nomineeName: '',
        nomineeAge: '',
        nomineeRelationship: ''
    });

    const [occupationDetails, setOccupationDetails] = useState({
        // Employer Details
        empCategory: 'Employer',
        employerName: '',
        officeAddress: '',
        totalExpYears: '',
        empSinceYears: '',
        empSinceMonths: '',
        empPhone: '',
        empExtn: '',
        empStatus: '',
        empDesignation: '',
        empCode: '',
        empDepartment: '',
        empDoj: '',
        empDor: '',

        // Business Details
        busCategory: 'Business',
        businessName: '',
        businessAddress: '',
        busSinceYears: '',
        busSinceMonths: '',
        busDoc: '',
        businessType: '',
        profDoc: '',
        profession: '',
        busPhone: '',
        busExtn: '',
        annualIncome: '',
        busDesignation: ''
    });

    const [financialDetails, setFinancialDetails] = useState({
        panNo: '',
        panNotAvail: false,
        passportNo: '',
        passportNotAvail: false,
        drivingLicenceNo: '',
        dlNotAvail: false,
        adharCardNo: '',
        adharNotAvail: false,
        voterIdNo: '',
        voterNotAvail: false,
        grossIncome: '',
        netIncome: '',
        avgMonthlyExpenses: '',
        estAnnualIncome: '',

        // Commitments
        employerLoans: '',
        homeLoans: '',
        vehicleLoans: '',
        personalLoans: '',
        insurance: '',
        otherIncome: ''
    });

    return (
        <div className="w-full min-h-screen bg-slate-50/50 p-6 animate-in fade-in duration-500">
            <div className="max-w-[1200px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Applicant Details</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Manage borrower personal, occupational and financial profiles.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-10 rounded-xl gap-2 text-slate-600 font-semibold border-slate-200">
                            <RefreshCw size={16} /> Refresh
                        </Button>
                        <Button className="h-10 rounded-xl gap-2 font-semibold shadow-sm" style={{ backgroundColor: 'hsl(221, 83%, 53%)', color: 'white' }}>
                            <Save size={16} /> Save
                        </Button>
                        <Button className="h-10 rounded-xl gap-2 font-bold shadow-md hover:opacity-90 transition-opacity" style={{ backgroundColor: '#0f172a', color: 'white' }}>
                            <Send size={16} /> Save & Submit
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <div className="border-b border-slate-100 bg-slate-50/80 px-4 pt-4">
                            <TabsList className="h-12 bg-transparent p-0 flex gap-6 w-full justify-start overflow-x-auto custom-scrollbar">
                                <TabsTrigger
                                    value="personal"
                                    className={`h-12 rounded-none border-b-2 px-4 pb-4 pt-2 font-bold transition-all data-[state=active]:border-[hsl(221,83%,53%)] data-[state=active]:text-[hsl(221,83%,53%)] data-[state=active]:bg-transparent data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 hover:text-slate-800`}
                                >
                                    <div className="flex items-center gap-2">
                                        <User size={16} />
                                        <span>Personal Details</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="occupation"
                                    className={`h-12 rounded-none border-b-2 px-4 pb-4 pt-2 font-bold transition-all data-[state=active]:border-[hsl(221,83%,53%)] data-[state=active]:text-[hsl(221,83%,53%)] data-[state=active]:bg-transparent data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 hover:text-slate-800`}
                                >
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={16} />
                                        <span>Occupation Details</span>
                                    </div>
                                </TabsTrigger>
                                <TabsTrigger
                                    value="financial"
                                    className={`h-12 rounded-none border-b-2 px-4 pb-4 pt-2 font-bold transition-all data-[state=active]:border-[hsl(221,83%,53%)] data-[state=active]:text-[hsl(221,83%,53%)] data-[state=active]:bg-transparent data-[state=inactive]:border-transparent data-[state=inactive]:text-slate-500 hover:text-slate-800`}
                                >
                                    <div className="flex items-center gap-2">
                                        <IndianRupee size={16} />
                                        <span>Financial Details</span>
                                    </div>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Common Top Bar across all tabs */}
                        <div className="p-6 bg-slate-50 border-b border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4">
                                <Label className="text-sm font-semibold text-slate-600 whitespace-nowrap min-w-[120px]">Nature of loan:</Label>
                                <Select value={personalDetails.natureOfLoan} onValueChange={(val) => setPersonalDetails({ ...personalDetails, natureOfLoan: val })}>
                                    <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PERSONAL">Personal Loan</SelectItem>
                                        <SelectItem value="VEHICLE">Vehicle Loan</SelectItem>
                                        <SelectItem value="HOME">Home Loan</SelectItem>
                                        <SelectItem value="GOLD">Gold Loan</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center gap-4">
                                <Label className="text-sm font-semibold text-slate-600 whitespace-nowrap min-w-[120px]">Applicant id :</Label>
                                <Select value={personalDetails.applicantId} onValueChange={(val) => setPersonalDetails({ ...personalDetails, applicantId: val })}>
                                    <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200">
                                        <SelectValue placeholder="Select Applicant id" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="APP001">APP001 - John Doe</SelectItem>
                                        <SelectItem value="APP002">APP002 - Jane Smith</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tab Contents */}
                        <div className="p-8">
                            <TabsContent value="personal" className="mt-0 outline-none space-y-6">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                                    <div className="lg:col-span-8 space-y-5">
                                        {/* Row 1 */}
                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Applicant name :</Label>
                                            <Input placeholder="Enter Applicant name" className="h-11 rounded-xl" value={personalDetails.applicantName} onChange={e => setPersonalDetails({ ...personalDetails, applicantName: e.target.value })} />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Father/Husband name :</Label>
                                            <Input placeholder="Enter Father name" className="h-11 rounded-xl" value={personalDetails.fatherHusbandName} onChange={e => setPersonalDetails({ ...personalDetails, fatherHusbandName: e.target.value })} />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Residential Address :</Label>
                                            <Input placeholder="Enter Residence address" className="h-11 rounded-xl" value={personalDetails.residentialAddress} onChange={e => setPersonalDetails({ ...personalDetails, residentialAddress: e.target.value })} />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Permanent address :</Label>
                                            <div className="flex gap-2">
                                                <Input placeholder="Enter Permanent address" className="h-11 rounded-xl" value={personalDetails.permanentAddress} onChange={e => setPersonalDetails({ ...personalDetails, permanentAddress: e.target.value })} />
                                                <Button size="icon" variant="outline" className="h-11 w-11 rounded-xl shrink-0" title="Copy from Residential" onClick={() => setPersonalDetails({ ...personalDetails, permanentAddress: personalDetails.residentialAddress })}>
                                                    <Copy size={16} className="text-slate-500" />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Multi-column row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">City :</Label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input placeholder="Enter City" className="h-11 rounded-xl" value={personalDetails.city} onChange={e => setPersonalDetails({ ...personalDetails, city: e.target.value })} />
                                                <div className="flex items-center gap-3">
                                                    <Label className="text-sm font-semibold text-slate-700 whitespace-nowrap">State :</Label>
                                                    <Select value={personalDetails.state} onValueChange={val => setPersonalDetails({ ...personalDetails, state: val })}>
                                                        <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                                            <SelectValue placeholder="Select State Name" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="MH">Maharashtra</SelectItem>
                                                            <SelectItem value="TN">Tamil Nadu</SelectItem>
                                                            <SelectItem value="KA">Karnataka</SelectItem>
                                                            <SelectItem value="DL">Delhi</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">PinCode :</Label>
                                            <Input placeholder="Enter PinCode" className="h-11 rounded-xl max-w-[200px]" value={personalDetails.pinCode} onChange={e => setPersonalDetails({ ...personalDetails, pinCode: e.target.value })} />
                                        </div>

                                        {/* DOB, Gender, Marital */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4 md:col-span-3 lg:col-span-2">
                                                <Label className="text-sm font-semibold text-slate-700">Date of birth :</Label>
                                                <Input type="date" className="h-11 rounded-xl" value={personalDetails.dob} onChange={e => setPersonalDetails({ ...personalDetails, dob: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4 md:col-span-3 lg:col-span-2">
                                                <Label className="text-sm font-semibold text-slate-700">Gender :</Label>
                                                <Select value={personalDetails.gender} onValueChange={val => setPersonalDetails({ ...personalDetails, gender: val })}>
                                                    <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                                        <SelectValue placeholder="Select Gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="MALE">Male</SelectItem>
                                                        <SelectItem value="FEMALE">Female</SelectItem>
                                                        <SelectItem value="OTHER">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4 md:col-span-3 lg:col-span-2">
                                                <Label className="text-sm font-semibold text-slate-700">Marital status :</Label>
                                                <Select value={personalDetails.maritalStatus} onValueChange={val => setPersonalDetails({ ...personalDetails, maritalStatus: val })}>
                                                    <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                                        <SelectValue placeholder="Select Marital Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="SINGLE">Single</SelectItem>
                                                        <SelectItem value="MARRIED">Married</SelectItem>
                                                        <SelectItem value="WIDOWED">Widowed</SelectItem>
                                                        <SelectItem value="DIVORCED">Divorced</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4 pt-2">
                                            <Label className="text-sm font-semibold text-slate-700">No of family dependents:</Label>
                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600">Childrens</Label>
                                                    <Input type="number" className="h-11 w-20 rounded-xl" value={personalDetails.dependentsChildren} onChange={e => setPersonalDetails({ ...personalDetails, dependentsChildren: e.target.value })} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600">Others</Label>
                                                    <Input type="number" className="h-11 w-20 rounded-xl" value={personalDetails.dependentsOthers} onChange={e => setPersonalDetails({ ...personalDetails, dependentsOthers: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Qualification :</Label>
                                            <Input placeholder="Enter Qualification" className="h-11 rounded-xl max-w-md" value={personalDetails.qualification} onChange={e => setPersonalDetails({ ...personalDetails, qualification: e.target.value })} />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Relationship with (Co-applicant) :</Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input placeholder="Enter Co-Applicant1" className="h-11 rounded-xl" value={personalDetails.relationWithCoApplicant1} onChange={e => setPersonalDetails({ ...personalDetails, relationWithCoApplicant1: e.target.value })} />
                                                <Input placeholder="Enter Co-Applicant2" className="h-11 rounded-xl" value={personalDetails.relationWithCoApplicant2} onChange={e => setPersonalDetails({ ...personalDetails, relationWithCoApplicant2: e.target.value })} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Present accommodation:</Label>
                                            <Select value={personalDetails.presentAccomodation} onValueChange={val => setPersonalDetails({ ...personalDetails, presentAccomodation: val })}>
                                                <SelectTrigger className="h-11 rounded-xl border-slate-200 max-w-xs">
                                                    <SelectValue placeholder="Select Present accommodation" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="OWNED">Owned</SelectItem>
                                                    <SelectItem value="RENTED">Rented</SelectItem>
                                                    <SelectItem value="COMPANY">Company Provided</SelectItem>
                                                    <SelectItem value="PARENTS">Parent's House</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Period of stay :</Label>
                                            <div className="flex gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600">Years</Label>
                                                    <Input type="number" className="h-11 w-20 rounded-xl" value={personalDetails.stayPeriodYears} onChange={e => setPersonalDetails({ ...personalDetails, stayPeriodYears: e.target.value })} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600">Months</Label>
                                                    <Input type="number" className="h-11 w-20 rounded-xl" max={11} value={personalDetails.stayPeriodMonths} onChange={e => setPersonalDetails({ ...personalDetails, stayPeriodMonths: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] items-center gap-4">
                                            <Label className="text-sm font-semibold text-slate-700">Phone No.:</Label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center w-full">
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600 whitespace-nowrap">Residence No.</Label>
                                                    <Input placeholder="Enter Residence No" className="h-11 rounded-xl" value={personalDetails.phoneResidence} onChange={e => setPersonalDetails({ ...personalDetails, phoneResidence: e.target.value })} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600 font-bold whitespace-nowrap">Mobile No.</Label>
                                                    <Input placeholder="Enter MobileNo." className="h-11 rounded-xl border-slate-300" value={personalDetails.phoneMobile} onChange={e => setPersonalDetails({ ...personalDetails, phoneMobile: e.target.value })} />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Label className="text-sm text-slate-600 whitespace-nowrap">E-mail Id :</Label>
                                                    <Input placeholder="Enter Email Id" type="email" className="h-11 rounded-xl" value={personalDetails.email} onChange={e => setPersonalDetails({ ...personalDetails, email: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Nominee Details Box */}
                                    <div className="lg:col-span-4 border rounded-2xl p-5 bg-[#f8fafc]">
                                        <h3 className="text-sm font-bold text-[hsl(221,83%,53%)] mb-4 flex items-center gap-2">
                                            <div className="w-1.5 h-4 bg-[hsl(221,83%,53%)] rounded-full"></div>
                                            Nominee Details
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-slate-700">Nominee Name :</Label>
                                                <Input placeholder="Enter Nominee Name" className="h-11 rounded-xl bg-white" value={personalDetails.nomineeName} onChange={e => setPersonalDetails({ ...personalDetails, nomineeName: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-slate-700">Age:</Label>
                                                <Input placeholder="Enter Age" type="number" className="h-11 rounded-xl bg-white w-24" value={personalDetails.nomineeAge} onChange={e => setPersonalDetails({ ...personalDetails, nomineeAge: e.target.value })} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-slate-700">Relationship With Applicant:</Label>
                                                <Input placeholder="Enter Applicant Relationship" className="h-11 rounded-xl bg-white" value={personalDetails.nomineeRelationship} onChange={e => setPersonalDetails({ ...personalDetails, nomineeRelationship: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="occupation" className="mt-0 outline-none">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Employer Details Panel */}
                                    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                                        <div className="bg-[#3b4b6b] px-5 py-3 flex items-center">
                                            <h3 className="font-bold text-white tracking-wide text-sm">Employer Details</h3>
                                        </div>
                                        <div className="p-6 space-y-5 bg-white">
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Occupational category :</Label>
                                                <Input className="h-11 rounded-xl bg-slate-50 font-medium text-slate-600" value={occupationDetails.empCategory} readOnly />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Employer name :</Label>
                                                <Input placeholder="Enter Employer name" className="h-11 rounded-xl" value={occupationDetails.employerName} onChange={e => setOccupationDetails({ ...occupationDetails, employerName: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-start gap-4">
                                                <Label className="text-sm font-semibold text-slate-700 pt-3">Office address:</Label>
                                                <Input placeholder="Enter Office address" className="h-20 rounded-xl" value={occupationDetails.officeAddress} onChange={e => setOccupationDetails({ ...occupationDetails, officeAddress: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Total work experience :</Label>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600">Years</Label>
                                                        <Input type="number" className="h-11 w-16 rounded-xl" value={occupationDetails.totalExpYears} onChange={e => setOccupationDetails({ ...occupationDetails, totalExpYears: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Employment since :</Label>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600">Years</Label>
                                                        <Input type="number" className="h-11 w-16 rounded-xl" value={occupationDetails.empSinceYears} onChange={e => setOccupationDetails({ ...occupationDetails, empSinceYears: e.target.value })} />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600">Months</Label>
                                                        <Input type="number" className="h-11 w-16 rounded-xl" max={11} value={occupationDetails.empSinceMonths} onChange={e => setOccupationDetails({ ...occupationDetails, empSinceMonths: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Phone No. (incl STD code) :</Label>
                                                <div className="flex gap-4 items-center">
                                                    <Input placeholder="Enter Phone No." className="h-11 rounded-xl" value={occupationDetails.empPhone} onChange={e => setOccupationDetails({ ...occupationDetails, empPhone: e.target.value })} />
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600 whitespace-nowrap">Extn No:</Label>
                                                        <Input className="h-11 w-20 rounded-xl" value={occupationDetails.empExtn} onChange={e => setOccupationDetails({ ...occupationDetails, empExtn: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Status of employer :</Label>
                                                <Select value={occupationDetails.empStatus} onValueChange={val => setOccupationDetails({ ...occupationDetails, empStatus: val })}>
                                                    <SelectTrigger className="h-11 rounded-xl border-slate-200">
                                                        <SelectValue placeholder="Select Status of emp" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="GOVT">Government</SelectItem>
                                                        <SelectItem value="PRIVATE">Private</SelectItem>
                                                        <SelectItem value="MNC">MNC</SelectItem>
                                                        <SelectItem value="STARTUP">Startup</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Designation :</Label>
                                                <Input placeholder="Enter Designation" className="h-11 rounded-xl" value={occupationDetails.empDesignation} onChange={e => setOccupationDetails({ ...occupationDetails, empDesignation: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Employee code :</Label>
                                                <Input placeholder="Enter Employee code" className="h-11 rounded-xl" value={occupationDetails.empCode} onChange={e => setOccupationDetails({ ...occupationDetails, empCode: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Department :</Label>
                                                <Input placeholder="Department" className="h-11 rounded-xl" value={occupationDetails.empDepartment} onChange={e => setOccupationDetails({ ...occupationDetails, empDepartment: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Date of joining :</Label>
                                                <Input type="date" className="h-11 rounded-xl w-40" value={occupationDetails.empDoj} onChange={e => setOccupationDetails({ ...occupationDetails, empDoj: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Date of retiring :</Label>
                                                <Input type="date" className="h-11 rounded-xl w-40" value={occupationDetails.empDor} onChange={e => setOccupationDetails({ ...occupationDetails, empDor: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Business Details Panel */}
                                    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-fit">
                                        <div className="bg-[#3b4b6b] px-5 py-3 flex items-center">
                                            <h3 className="font-bold text-white tracking-wide text-sm">Business Details</h3>
                                        </div>
                                        <div className="p-6 space-y-5 bg-[#f8fafc]/50">
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Occupational category :</Label>
                                                <Input className="h-11 rounded-xl bg-slate-50 font-medium text-slate-600" value={occupationDetails.busCategory} readOnly />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Business name :</Label>
                                                <Input placeholder="Enter Business name" className="h-11 rounded-xl bg-white" value={occupationDetails.businessName} onChange={e => setOccupationDetails({ ...occupationDetails, businessName: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-[160px_1fr] items-start gap-4">
                                                <Label className="text-sm font-semibold text-slate-700 pt-3">Business address :</Label>
                                                <Input placeholder="Enter Business address" className="h-20 rounded-xl bg-white" value={occupationDetails.businessAddress} onChange={e => setOccupationDetails({ ...occupationDetails, businessAddress: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Business since :</Label>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600">Years</Label>
                                                        <Input type="number" className="h-11 w-16 rounded-xl bg-white" value={occupationDetails.busSinceYears} onChange={e => setOccupationDetails({ ...occupationDetails, busSinceYears: e.target.value })} />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600">Months</Label>
                                                        <Input type="number" className="h-11 w-16 rounded-xl bg-white" max={11} value={occupationDetails.busSinceMonths} onChange={e => setOccupationDetails({ ...occupationDetails, busSinceMonths: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Date of commencement of business :</Label>
                                                <Input type="date" className="h-11 rounded-xl w-40 bg-white" value={occupationDetails.busDoc} onChange={e => setOccupationDetails({ ...occupationDetails, busDoc: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Business :</Label>
                                                <Select value={occupationDetails.businessType} onValueChange={val => setOccupationDetails({ ...occupationDetails, businessType: val })}>
                                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white">
                                                        <SelectValue placeholder="Select Business" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="TRADING">Trading</SelectItem>
                                                        <SelectItem value="MANUFACTURING">Manufacturing</SelectItem>
                                                        <SelectItem value="SERVICES">Services</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Date of commencement of profession :</Label>
                                                <Input type="date" className="h-11 rounded-xl w-40 bg-white" value={occupationDetails.profDoc} onChange={e => setOccupationDetails({ ...occupationDetails, profDoc: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Profession :</Label>
                                                <Select value={occupationDetails.profession} onValueChange={val => setOccupationDetails({ ...occupationDetails, profession: val })}>
                                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white">
                                                        <SelectValue placeholder="Select Profession" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                                                        <SelectItem value="LAWYER">Lawyer</SelectItem>
                                                        <SelectItem value="CA">Charted Accountant</SelectItem>
                                                        <SelectItem value="ENGINEER">Engineer</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Phone No. :</Label>
                                                <div className="flex gap-4 items-center">
                                                    <Input placeholder="Enter Phone No." className="h-11 rounded-xl bg-white" value={occupationDetails.busPhone} onChange={e => setOccupationDetails({ ...occupationDetails, busPhone: e.target.value })} />
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-sm text-slate-600 whitespace-nowrap">Extn No :</Label>
                                                        <Input className="h-11 w-20 rounded-xl bg-white" value={occupationDetails.busExtn} onChange={e => setOccupationDetails({ ...occupationDetails, busExtn: e.target.value })} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Annual income :</Label>
                                                <Input placeholder="Enter Annual income" className="h-11 rounded-xl bg-white max-w-[200px]" value={occupationDetails.annualIncome} onChange={e => setOccupationDetails({ ...occupationDetails, annualIncome: e.target.value })} />
                                            </div>

                                            <div className="grid grid-cols-[160px_1fr] items-center gap-4">
                                                <Label className="text-sm font-semibold text-slate-700">Designation :</Label>
                                                <Input placeholder="Enter Designation" className="h-11 rounded-xl bg-white max-w-[200px]" value={occupationDetails.busDesignation} onChange={e => setOccupationDetails({ ...occupationDetails, busDesignation: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="financial" className="mt-0 outline-none">
                                <div className="space-y-8 max-w-4xl">
                                    {/* IT Assessment Details */}
                                    <div>
                                        <h3 className="font-extrabold text-slate-800 text-base mb-5 pb-2 border-b border-slate-200 tracking-tight">IT assessment details :</h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px_150px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">PAN No. :</Label>
                                                <Input placeholder="Enter PAN No." className="h-11 rounded-xl font-medium tracking-wide uppercase placeholder:normal-case" disabled={financialDetails.panNotAvail} value={financialDetails.panNo} onChange={e => setFinancialDetails({ ...financialDetails, panNo: e.target.value })} />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="pan-not-avail" checked={financialDetails.panNotAvail} onCheckedChange={(val) => setFinancialDetails({ ...financialDetails, panNotAvail: !!val, panNo: val ? '' : financialDetails.panNo })} />
                                                    <label htmlFor="pan-not-avail" className="text-sm font-medium leading-none text-slate-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Not Available
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px_150px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Passport No. :</Label>
                                                <Input placeholder="Enter Passport No." className="h-11 rounded-xl font-medium tracking-wide uppercase placeholder:normal-case" disabled={financialDetails.passportNotAvail} value={financialDetails.passportNo} onChange={e => setFinancialDetails({ ...financialDetails, passportNo: e.target.value })} />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="passport-not-avail" checked={financialDetails.passportNotAvail} onCheckedChange={(val) => setFinancialDetails({ ...financialDetails, passportNotAvail: !!val, passportNo: val ? '' : financialDetails.passportNo })} />
                                                    <label htmlFor="passport-not-avail" className="text-sm font-medium leading-none text-slate-600">Not Available</label>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px_150px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Driving Licence No. :</Label>
                                                <Input placeholder="Enter Driving Licence No." className="h-11 rounded-xl" disabled={financialDetails.dlNotAvail} value={financialDetails.drivingLicenceNo} onChange={e => setFinancialDetails({ ...financialDetails, drivingLicenceNo: e.target.value })} />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="dl-not-avail" checked={financialDetails.dlNotAvail} onCheckedChange={(val) => setFinancialDetails({ ...financialDetails, dlNotAvail: !!val, drivingLicenceNo: val ? '' : financialDetails.drivingLicenceNo })} />
                                                    <label htmlFor="dl-not-avail" className="text-sm font-medium leading-none text-slate-600">Not Available</label>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px_150px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Adhar Card No. :</Label>
                                                <Input placeholder="Enter Adhar Card No." className="h-11 rounded-xl font-medium tracking-widest placeholder:tracking-normal" disabled={financialDetails.adharNotAvail} value={financialDetails.adharCardNo} onChange={e => setFinancialDetails({ ...financialDetails, adharCardNo: e.target.value })} />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="adhar-not-avail" checked={financialDetails.adharNotAvail} onCheckedChange={(val) => setFinancialDetails({ ...financialDetails, adharNotAvail: !!val, adharCardNo: val ? '' : financialDetails.adharCardNo })} />
                                                    <label htmlFor="adhar-not-avail" className="text-sm font-medium leading-none text-slate-600">Not Available</label>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px_150px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Voter ID No. :</Label>
                                                <Input placeholder="Enter Voter ID No." className="h-11 rounded-xl" disabled={financialDetails.voterNotAvail} value={financialDetails.voterIdNo} onChange={e => setFinancialDetails({ ...financialDetails, voterIdNo: e.target.value })} />
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox id="voter-not-avail" checked={financialDetails.voterNotAvail} onCheckedChange={(val) => setFinancialDetails({ ...financialDetails, voterNotAvail: !!val, voterIdNo: val ? '' : financialDetails.voterIdNo })} />
                                                    <label htmlFor="voter-not-avail" className="text-sm font-medium leading-none text-slate-600">Not Available</label>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6 pt-2">
                                                <Label className="text-sm font-semibold text-slate-700">Gross monthly income :</Label>
                                                <Input placeholder="Enter Gross monthly income" type="number" className="h-11 rounded-xl text-center" value={financialDetails.grossIncome} onChange={e => setFinancialDetails({ ...financialDetails, grossIncome: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Net monthly income :</Label>
                                                <Input placeholder="Enter Net monthly income" type="number" className="h-11 rounded-xl text-center font-bold text-[#009BB0]" value={financialDetails.netIncome} onChange={e => setFinancialDetails({ ...financialDetails, netIncome: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Average monthly expenses:</Label>
                                                <Input placeholder="Enter Average monthly expenses" type="number" className="h-11 rounded-xl text-center text-rose-500 font-bold" value={financialDetails.avgMonthlyExpenses} onChange={e => setFinancialDetails({ ...financialDetails, avgMonthlyExpenses: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Estimated annual income :</Label>
                                                <Input placeholder="Enter Estimated annual income" type="number" className="h-11 rounded-xl text-center" value={financialDetails.estAnnualIncome} onChange={e => setFinancialDetails({ ...financialDetails, estAnnualIncome: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Monthly Commitments */}
                                    <div className="pt-4">
                                        <h3 className="font-extrabold text-slate-800 text-base mb-5 pb-2 border-b border-slate-200 tracking-tight">Monthly commitments :</h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Employer loans :</Label>
                                                <Input placeholder="Enter Employer Loans" type="number" className="h-11 rounded-xl text-right" value={financialDetails.employerLoans} onChange={e => setFinancialDetails({ ...financialDetails, employerLoans: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Home loans :</Label>
                                                <Input placeholder="Enter Home loans" type="number" className="h-11 rounded-xl text-right" value={financialDetails.homeLoans} onChange={e => setFinancialDetails({ ...financialDetails, homeLoans: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Vehicle loans :</Label>
                                                <Input placeholder="Enter Vehicle loans" type="number" className="h-11 rounded-xl text-right" value={financialDetails.vehicleLoans} onChange={e => setFinancialDetails({ ...financialDetails, vehicleLoans: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Personal loans :</Label>
                                                <Input placeholder="Enter Personal loans" type="number" className="h-11 rounded-xl text-right" value={financialDetails.personalLoans} onChange={e => setFinancialDetails({ ...financialDetails, personalLoans: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Insurance :</Label>
                                                <Input placeholder="Enter Insurance" type="number" className="h-11 rounded-xl text-right" value={financialDetails.insurance} onChange={e => setFinancialDetails({ ...financialDetails, insurance: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-[200px_300px] items-center gap-6">
                                                <Label className="text-sm font-semibold text-slate-700">Others,if any :</Label>
                                                <Input placeholder="Enter Other income, if any" className="h-11 rounded-xl text-right" value={financialDetails.otherIncome} onChange={e => setFinancialDetails({ ...financialDetails, otherIncome: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
