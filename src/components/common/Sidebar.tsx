import {
    Home,
    Building2,
    Settings,
    FileText,
    IndianRupee,
    Briefcase,
    ChevronRight,
    ChevronDown,
    LogOut,
    CalendarCheck,
    ShieldCheck,
    Coins,
    CreditCard,
    Activity,
    Mail,
    LayoutDashboard,
    PieChart,
} from "lucide-react";
import { useEffect, useState } from "react";
import { demoRequestService } from "@/services/demo-request.service";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserRole } from "@/constants/roles";
import logo from "../../assets/png/Finware.png";

interface SubMenuItem {
    label: string;
    path: string;
    roles: string[];
    subItems?: SubMenuItem[];
}

interface MenuItem {
    label: string;
    path: string;
    icon: React.ElementType;
    roles: string[];
    subItems?: SubMenuItem[];
}

const CORE_MENU: MenuItem[] = [
    {
        label: "Overview",
        path: "/dashboard",
        icon: Home,
        roles: [
            UserRole.SUPER_ADMIN,
            UserRole.BANK_ADMIN,
            UserRole.BRANCH_ADMIN,
            UserRole.MANAGER,
            UserRole.STAFF,
            UserRole.CASHIER,
            UserRole.ACCOUNTANT,
        ],
    },
];

const SUPER_ADMIN_MENU: MenuItem[] = [
    { label: "Bank Management", path: "/super-admin/banks", icon: Building2, roles: [UserRole.SUPER_ADMIN] },
    { label: "Demo Requests", path: "/super-admin/demo-requests", icon: CalendarCheck, roles: [UserRole.SUPER_ADMIN] },
    { label: "Audit Logs", path: "/super-admin/audit-logs", icon: FileText, roles: [UserRole.SUPER_ADMIN] },
    { label: "Settings", path: "/super-admin/settings", icon: Settings, roles: [UserRole.SUPER_ADMIN] },
];

const ADMIN_MENU: MenuItem[] = [
    {
        label: "1. Admin",
        path: "/admin",
        icon: ShieldCheck,
        roles: [UserRole.SUPER_ADMIN, UserRole.BANK_ADMIN],
        subItems: [
            {
                label: "Administration",
                path: "/admin/administration",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "User Rights", path: "/bank-admin/user-rights", roles: [UserRole.BANK_ADMIN] },
                    { label: "Date Lock & Unlock", path: "/bank-admin/admin/date-lock", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const PRODUCER_COMPANY_MENU: MenuItem[] = [
    {
        label: "2. Producer Company",
        path: "/bank-admin/producer-company",
        icon: Coins,
        roles: [UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER],
        subItems: [
            {
                label: "Applications",
                path: "/bank-admin/producer-company/applications",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Member Details", path: "/bank-admin/producer-company/member-details", roles: [UserRole.BANK_ADMIN] },
                    { label: "Share Capital", path: "/bank-admin/producer-company/share-capital", roles: [UserRole.BANK_ADMIN] },
                    { label: "Introduced Details", path: "/bank-admin/producer-company/introduced-details", roles: [UserRole.BANK_ADMIN] },
                    { label: "Saving/Current Bank Creation", path: "/bank-admin/producer-company/bank-creation", roles: [UserRole.BANK_ADMIN] },
                    { label: "Fixed Deposits", path: "/bank-admin/producer-company/fixed-deposits", roles: [UserRole.BANK_ADMIN] },
                    { label: "Recurring Deposits", path: "/bank-admin/producer-company/recurring-deposits", roles: [UserRole.BANK_ADMIN] },
                    { label: "Insurance", path: "/bank-admin/producer-company/insurance", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Receipts / Withdrawal",
                path: "/bank-admin/producer-company/receipts-withdrawal",
                roles: [UserRole.BANK_ADMIN, UserRole.CASHIER],
                subItems: [
                    { label: "Receipts", path: "/bank-admin/producer-company/receipts", roles: [UserRole.BANK_ADMIN] },
                    { label: "Recurring Deposit Receipt", path: "/bank-admin/producer-company/rd-receipt", roles: [UserRole.BANK_ADMIN] },
                    { label: "Passbook Cancellation", path: "/bank-admin/producer-company/passbook-cancel", roles: [UserRole.BANK_ADMIN] },
                    { label: "FD Monthly Payment", path: "/bank-admin/producer-company/fd-monthly", roles: [UserRole.BANK_ADMIN] },
                    { label: "Trim or Mobile App Receipts", path: "/bank-admin/producer-company/app-receipts", roles: [UserRole.BANK_ADMIN] },
                    { label: "Share Capital Withdrawal", path: "/bank-admin/producer-company/share-withdrawal", roles: [UserRole.BANK_ADMIN] },
                    {
                        label: "Share And Bonds Duplicate Prints",
                        path: "/bank-admin/producer-company/bonds",
                        roles: [UserRole.BANK_ADMIN],
                        subItems: [
                            { label: "Bonds Print", path: "/bank-admin/producer-company/bonds/print", roles: [UserRole.BANK_ADMIN] },
                            { label: "Duplicate Bonds Print", path: "/bank-admin/producer-company/bonds/duplicate", roles: [UserRole.BANK_ADMIN] },
                        ]
                    }
                ]
            },
            {
                label: "Surrenders",
                path: "/bank-admin/producer-company/surrenders",
                roles: [UserRole.BANK_ADMIN, UserRole.MANAGER],
                subItems: [
                    { label: "Maturity Bonds", path: "/bank-admin/producer-company/surrenders/bonds", roles: [UserRole.BANK_ADMIN] },
                    { label: "Customer Payment", path: "/bank-admin/producer-company/surrenders/payment", roles: [UserRole.BANK_ADMIN] },
                    { label: "FD Renewal", path: "/bank-admin/producer-company/surrenders/renewal", roles: [UserRole.BANK_ADMIN] },
                    { label: "Maturity Paid Details Report", path: "/bank-admin/producer-company/surrenders/report", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Admin Level Edit",
                path: "/bank-admin/producer-company/edit",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "PassBook Regeneration", path: "/bank-admin/producer-company/passbook/regen", roles: [UserRole.BANK_ADMIN] },
                    { label: "Customer Edit", path: "/bank-admin/producer-company/customer-edit", roles: [UserRole.BANK_ADMIN] },
                    { label: "Change Password", path: "/bank-admin/producer-company/password-change", roles: [UserRole.BANK_ADMIN] },
                    { label: "Receipts Delete or Date Modification", path: "/bank-admin/producer-company/receipts-mod", roles: [UserRole.BANK_ADMIN] },
                    { label: "Documents Upload", path: "/bank-admin/producer-company/docs-upload", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Daily And Monthly Collection Reports",
                path: "/bank-admin/producer-company/collection-reports",
                roles: [UserRole.BANK_ADMIN, UserRole.ACCOUNTANT],
                subItems: [
                    { label: "Payment And Receipt Details", path: "/bank-admin/producer-company/collection-reports/details", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Group Entry",
                path: "/bank-admin/producer-company/group-entry-section",
                roles: [UserRole.BANK_ADMIN, UserRole.STAFF],
                subItems: [
                    { label: "Group Entry", path: "/bank-admin/producer-company/group-entry", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Savings Account",
                path: "/bank-admin/producer-company/savings-section",
                roles: [UserRole.BANK_ADMIN, UserRole.CASHIER],
                subItems: [
                    { label: "Cash Deposit", path: "/bank-admin/producer-company/cash-deposit", roles: [UserRole.BANK_ADMIN] },
                    { label: "Withdrawal", path: "/bank-admin/producer-company/withdrawal", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Reports",
                path: "/bank-admin/producer-company/reports-section",
                roles: [UserRole.BANK_ADMIN, UserRole.ACCOUNTANT],
                subItems: [
                    { label: "PassBook", path: "/bank-admin/producer-company/passbook-report", roles: [UserRole.BANK_ADMIN] },
                ]
            },
        ]
    }
];

const PRODUCER_REPORTS_MENU: MenuItem[] = [
    {
        label: "3. Producer Company Reports",
        path: "/bank-admin/producer-company-reports",
        icon: PieChart,
        roles: [UserRole.BANK_ADMIN, UserRole.ACCOUNTANT],
        subItems: [
            {
                label: "Member Reports",
                path: "/bank-admin/producer-company-reports/members",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Member Wise Details Report", path: "/bank-admin/reports/producer/members/wise", roles: [UserRole.BANK_ADMIN] },
                    { label: "Member Details Report", path: "/bank-admin/reports/producer/members/details", roles: [UserRole.BANK_ADMIN] },
                    { label: "Member Details Search", path: "/bank-admin/reports/producer/members/search", roles: [UserRole.BANK_ADMIN] },
                    { label: "Group Details Report", path: "/bank-admin/reports/producer/members/group", roles: [UserRole.BANK_ADMIN] },
                    { label: "Member Account Statement", path: "/bank-admin/reports/producer/members/statement", roles: [UserRole.BANK_ADMIN] },
                    { label: "Monthly Maturity Details", path: "/bank-admin/reports/producer/members/maturity", roles: [UserRole.BANK_ADMIN] },
                    { label: "Passbook Cancellation", path: "/bank-admin/reports/producer/members/passbook-cancel", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Deposit Reports",
                path: "/bank-admin/producer-company-reports/deposits",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "RD Instalments Report", path: "/bank-admin/reports/producer/deposits/rd-installments", roles: [UserRole.BANK_ADMIN] },
                    { label: "FD Details Report", path: "/bank-admin/reports/producer/deposits/fd-details", roles: [UserRole.BANK_ADMIN] },
                    { label: "RD Renewal Details", path: "/bank-admin/reports/producer/deposits/rd-renewal", roles: [UserRole.BANK_ADMIN] },
                    { label: "RD Instalments Advance Paid List", path: "/bank-admin/reports/producer/deposits/rd-advance", roles: [UserRole.BANK_ADMIN] },
                    { label: "RD Due Instalments Report", path: "/bank-admin/reports/producer/deposits/rd-due", roles: [UserRole.BANK_ADMIN] },
                    { label: "FD Monthly Interest Payment Report", path: "/bank-admin/reports/producer/deposits/fd-interest", roles: [UserRole.BANK_ADMIN] },
                    { label: "Saving Account Statement", path: "/bank-admin/reports/producer/deposits/saving-statement", roles: [UserRole.BANK_ADMIN] },
                    { label: "Deposits And Withdrawal Details", path: "/bank-admin/reports/producer/deposits/details", roles: [UserRole.BANK_ADMIN] },
                    { label: "FD Cumulative Interest Details", path: "/bank-admin/reports/producer/deposits/fd-cumulative", roles: [UserRole.BANK_ADMIN] },
                    { label: "Saving or Share Withdrawal Details", path: "/bank-admin/reports/producer/deposits/withdrawal", roles: [UserRole.BANK_ADMIN] },
                    { label: "Receipts Delete Report", path: "/bank-admin/reports/producer/deposits/receipt-delete", roles: [UserRole.BANK_ADMIN] },
                    { label: "Deposit Interest Certificate", path: "/bank-admin/reports/producer/deposits/interest-cert", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Daily And Monthly Collection Report",
                path: "/bank-admin/producer-company-reports/collection",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Day Closing Report", path: "/bank-admin/reports/producer/collection/day-closing", roles: [UserRole.BANK_ADMIN] },
                    { label: "Mobile App Collection Report", path: "/bank-admin/reports/producer/collection/mobile-app", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const LOAN_MANAGEMENT_MENU: MenuItem[] = [
    {
        label: "4. Loan Management",
        path: "/bank-admin/loans",
        icon: Briefcase,
        roles: [UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.MANAGER],
        subItems: [
            {
                label: "Client Masters",
                path: "/bank-admin/loans/masters",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "DO Management", path: "/bank-admin/loans/do-mgmt", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Loan Management",
                path: "/bank-admin/loans/mgmt",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Application Form", path: "/bank-admin/loans/app-form", roles: [UserRole.BANK_ADMIN] },
                    { label: "Applicant Details", path: "/bank-admin/loans/applicant-details", roles: [UserRole.BANK_ADMIN] },
                    { label: "CoApplicant Details", path: "/bank-admin/loans/co-applicant", roles: [UserRole.BANK_ADMIN] },
                    { label: "Savings & EMI Receipt", path: "/bank-admin/loans/emi-receipt", roles: [UserRole.BANK_ADMIN] },
                    { label: "Group Loan Application Form", path: "/bank-admin/loans/group-app", roles: [UserRole.BANK_ADMIN] },
                    { label: "Guarantor Details", path: "/bank-admin/loans/guarantors", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Loan Management Reports",
                path: "/bank-admin/loans/reports",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Applicant Search", path: "/bank-admin/loans/reports/search", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Account Summary", path: "/bank-admin/loans/reports/summary", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Installment Generation", path: "/bank-admin/loans/reports/installment", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Interest Details Report", path: "/bank-admin/loans/reports/interest", roles: [UserRole.BANK_ADMIN] },
                    { label: "All Loans Dues Report", path: "/bank-admin/loans/reports/dues", roles: [UserRole.BANK_ADMIN] },
                    { label: "Gold Loan Tenor Wise Data", path: "/bank-admin/loans/reports/gold-tenor", roles: [UserRole.BANK_ADMIN] },
                    { label: "Gold Loan Application Report", path: "/bank-admin/loans/reports/gold-app", roles: [UserRole.BANK_ADMIN] },
                    { label: "Gold Loan Stock Report", path: "/bank-admin/loans/reports/gold-stock", roles: [UserRole.BANK_ADMIN] },
                    { label: "Gold Loan Due Date Intimation Letter", path: "/bank-admin/loans/reports/gold-notice", roles: [UserRole.BANK_ADMIN] },
                    { label: "Gold Loan Dues Summary Report", path: "/bank-admin/loans/reports/gold-summary", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const DMS_MENU: MenuItem[] = [
    {
        label: "5. Document Management System",
        path: "/bank-admin/dms",
        icon: FileText,
        roles: [UserRole.BANK_ADMIN, UserRole.STAFF],
        subItems: [
            {
                label: "Document Transactions",
                path: "/bank-admin/dms/transactions",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Additional Information", path: "/bank-admin/dms/extra-info", roles: [UserRole.BANK_ADMIN] },
                    { label: "Online DO", path: "/bank-admin/dms/online-do", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Document Reports",
                path: "/bank-admin/dms/reports",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Duplicate Online DO", path: "/bank-admin/dms/reports/duplicate-do", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const APPROVALS_MENU: MenuItem[] = [
    {
        label: "6. Approvals",
        path: "/bank-admin/approvals",
        icon: CalendarCheck,
        roles: [UserRole.BANK_ADMIN, UserRole.MANAGER],
        subItems: [
            { label: "Transactions", path: "/bank-admin/approvals/transactions", roles: [UserRole.BANK_ADMIN] },
        ]
    }
];

const DISBURSAL_MENU: MenuItem[] = [
    {
        label: "7. Loan Disbursal / EMI Receipt",
        path: "/bank-admin/disbursal-emi",
        icon: CreditCard,
        roles: [UserRole.BANK_ADMIN, UserRole.CASHIER],
        subItems: [
            {
                label: "Loan Disbursal / EMI Receipt",
                path: "/bank-admin/disbursal-emi/section",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Loan Disbursal / EMI Receipt", path: "/bank-admin/loans/disbursal", roles: [UserRole.BANK_ADMIN] },
                    { label: "Processing Charges Receipt", path: "/bank-admin/loans/processing-receipt", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Disbursal", path: "/bank-admin/loans/disburse", roles: [UserRole.BANK_ADMIN] },
                    { label: "EMI Date Change", path: "/bank-admin/loans/emi-date-change", roles: [UserRole.BANK_ADMIN] },
                    { label: "EMI Calculator", path: "/bank-admin/loans/calculator", roles: [UserRole.BANK_ADMIN] },
                    { label: "Pre Closure", path: "/bank-admin/loans/pre-closure", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const FINANCE_ACCOUNTS_MENU: MenuItem[] = [
    {
        label: "8. Financial Accounting",
        path: "/bank-admin/accounting",
        icon: IndianRupee,
        roles: [UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.ACCOUNTANT],
        subItems: [
            {
                label: "Financial Masters",
                path: "/bank-admin/accounting/masters",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "SubCategory", path: "/bank-admin/accounting/masters/subcategory", roles: [UserRole.BANK_ADMIN] },
                    { label: "Bank Information", path: "/bank-admin/accounting/masters/bank-info", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheque Management", path: "/bank-admin/accounting/masters/cheque-mgmt", roles: [UserRole.BANK_ADMIN] },
                    { label: "Dealer Incentive Master", path: "/bank-admin/accounting/masters/dealer-incentive", roles: [UserRole.BANK_ADMIN] },
                    { label: "Employee Information", path: "/bank-admin/accounting/masters/employee-info", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Financial Transactions",
                path: "/bank-admin/accounting/transactions",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "General Receipt", path: "/bank-admin/accounting/vouchers/receipt", roles: [UserRole.BANK_ADMIN] },
                    { label: "Payment Voucher", path: "/bank-admin/accounting/vouchers/payment", roles: [UserRole.BANK_ADMIN] },
                    { label: "Journal Voucher", path: "/bank-admin/accounting/vouchers/journal", roles: [UserRole.BANK_ADMIN] },
                    { label: "Bank Entries", path: "/bank-admin/accounting/bank-entries", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheques on Hand", path: "/bank-admin/accounting/cheques-hand", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheques in Bank", path: "/bank-admin/accounting/cheques-bank", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheques issued", path: "/bank-admin/accounting/cheques-issued", roles: [UserRole.BANK_ADMIN] },
                    { label: "Vehicle Seized", path: "/bank-admin/accounting/vehicle-seized", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Financial Reports",
                path: "/bank-admin/accounting/reports",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Account Ledger", path: "/bank-admin/reports/ledgers/account", roles: [UserRole.BANK_ADMIN] },
                    { label: "Bank Book", path: "/bank-admin/reports/ledgers/bank-book", roles: [UserRole.BANK_ADMIN] },
                    { label: "BRS", path: "/bank-admin/reports/ledgers/brs", roles: [UserRole.BANK_ADMIN] },
                    { label: "BRS Statements", path: "/bank-admin/reports/ledgers/brs-statements", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cash Transactions", path: "/bank-admin/reports/ledgers/cash", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheque Cancel", path: "/bank-admin/reports/ledgers/cheque-cancel", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheque Enquiry", path: "/bank-admin/reports/ledgers/cheque-enquiry", roles: [UserRole.BANK_ADMIN] },
                    { label: "Cheque Returns", path: "/bank-admin/reports/ledgers/cheque-returns", roles: [UserRole.BANK_ADMIN] },
                    { label: "Day Book", path: "/bank-admin/reports/ledgers/day-book", roles: [UserRole.BANK_ADMIN] },
                    { label: "Duplicate Advises", path: "/bank-admin/reports/ledgers/advises", roles: [UserRole.BANK_ADMIN] },
                    { label: "Duplicate Voucher", path: "/bank-admin/reports/ledgers/vouchers", roles: [UserRole.BANK_ADMIN] },
                    { label: "Issued Cheques", path: "/bank-admin/reports/ledgers/issued-cheques", roles: [UserRole.BANK_ADMIN] },
                    { label: "Ledger Summary", path: "/bank-admin/reports/ledgers/summary", roles: [UserRole.BANK_ADMIN] },
                    { label: "Jv List", path: "/bank-admin/reports/ledgers/jv-list", roles: [UserRole.BANK_ADMIN] },
                    { label: "Vehicle Invoice Status", path: "/bank-admin/reports/ledgers/vehicle-invoice", roles: [UserRole.BANK_ADMIN] },
                    { label: "Vehicle Seizure Status", path: "/bank-admin/reports/ledgers/vehicle-seizure", roles: [UserRole.BANK_ADMIN] },
                    { label: "Account Statement", path: "/bank-admin/reports/ledgers/statement", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const COLLECTION_MENU: MenuItem[] = [
    {
        label: "9. Collection Management System",
        path: "/bank-admin/collection-mgmt",
        icon: Activity,
        roles: [UserRole.BANK_ADMIN, UserRole.MANAGER, UserRole.ACCOUNTANT],
        subItems: [
            {
                label: "Loan Collection Reports",
                path: "/bank-admin/collection-mgmt/reports",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Loan Receipt Paid details", path: "/bank-admin/reports/collections/receipt-paid", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Disbursed & Closed", path: "/bank-admin/reports/collections/disbursed-closed", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Wise Dues", path: "/bank-admin/reports/collections/loan-dues", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Wise Dues Summary", path: "/bank-admin/reports/collections/dues-summary", roles: [UserRole.BANK_ADMIN] },
                    { label: "Collection Details", path: "/bank-admin/reports/collections/details", roles: [UserRole.BANK_ADMIN] },
                    { label: "Vehicle Loan Dues", path: "/bank-admin/reports/collections/vehicle-dues", roles: [UserRole.BANK_ADMIN] },
                    { label: "Interest Collection Loans", path: "/bank-admin/reports/collections/interest", roles: [UserRole.BANK_ADMIN] },
                    { label: "Loan Wise Day Closing Report", path: "/bank-admin/reports/collections/day-closing", roles: [UserRole.BANK_ADMIN] },
                    { label: "Gold Loan Dues Report", path: "/bank-admin/reports/collections/gold-dues", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const NOTICES_MENU: MenuItem[] = [
    {
        label: "10. Notices And Letters",
        path: "/bank-admin/notices-letters",
        icon: Mail,
        roles: [UserRole.BANK_ADMIN, UserRole.MANAGER],
        subItems: [
            {
                label: "Notices And Letters",
                path: "/bank-admin/notices-letters/section",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Seizure Letter 1", path: "/bank-admin/loans/notices/seizure1", roles: [UserRole.BANK_ADMIN] },
                    { label: "Seizure Letter 2", path: "/bank-admin/loans/notices/seizure2", roles: [UserRole.BANK_ADMIN] },
                    { label: "Hypothecation Release", path: "/bank-admin/loans/notices/hypo-release", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];

const ANALYTICAL_REPORTS_MENU: MenuItem[] = [
    {
        label: "11. Analytical Reports",
        path: "/bank-admin/analytical-reports",
        icon: LayoutDashboard,
        roles: [UserRole.BANK_ADMIN, UserRole.BRANCH_ADMIN, UserRole.ACCOUNTANT],
        subItems: [
            {
                label: "MIS Reports",
                path: "/bank-admin/analytics/mis",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Trial Balance", path: "/bank-admin/reports/trial-balance", roles: [UserRole.BANK_ADMIN] },
                    { label: "Comparison TB", path: "/bank-admin/reports/trial-balance-comp", roles: [UserRole.BANK_ADMIN] },
                    { label: "Schedule TB", path: "/bank-admin/reports/trial-balance-sched", roles: [UserRole.BANK_ADMIN] },
                    { label: "Balance Sheet", path: "/bank-admin/reports/balance-sheet", roles: [UserRole.BANK_ADMIN] },
                    { label: "Profit And Loss", path: "/bank-admin/reports/profit-loss", roles: [UserRole.BANK_ADMIN] },
                ]
            },
            {
                label: "Consolidated Reports",
                path: "/bank-admin/analytics/consolidated",
                roles: [UserRole.BANK_ADMIN],
                subItems: [
                    { label: "Trial Balance", path: "/bank-admin/reports/consolidated/trial-balance", roles: [UserRole.BANK_ADMIN] },
                    { label: "Comparison TB", path: "/bank-admin/reports/consolidated/trial-balance-comp", roles: [UserRole.BANK_ADMIN] },
                    { label: "Schedule TB", path: "/bank-admin/reports/consolidated/trial-balance-sched", roles: [UserRole.BANK_ADMIN] },
                    { label: "Balance Sheet", path: "/bank-admin/reports/consolidated/balance-sheet", roles: [UserRole.BANK_ADMIN] },
                    { label: "Profit And Loss", path: "/bank-admin/reports/consolidated/profit-loss", roles: [UserRole.BANK_ADMIN] },
                ]
            }
        ]
    }
];


interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
    const { user, userRole, userName, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [demoUnreadCount, setDemoUnreadCount] = useState(0);
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

    const toggleSubmenu = (label: string) => {
        setOpenSubmenus(prev => ({ ...prev, [label]: !prev[label] }));
    };

    const isPathActiveRecursive = (items: (MenuItem | SubMenuItem)[], currentPath: string): boolean => {
        return items.some(item => {
            if (item.path === currentPath) return true;
            if (item.subItems) return isPathActiveRecursive(item.subItems, currentPath);
            return false;
        });
    };

    // Auto-expand submenu if current path is a sub-item
    useEffect(() => {
        const expandRecursive = (items: (MenuItem | SubMenuItem)[], currentPath: string): boolean => {
            return items.some(item => {
                if (item.path === currentPath) return true;
                if (item.subItems) {
                    const childMatch = expandRecursive(item.subItems, currentPath);
                    if (childMatch) {
                        setOpenSubmenus(prev => ({ ...prev, [item.label]: true }));
                        return true;
                    }
                }
                return false;
            });
        };

        const allRootMenus = [
            ...CORE_MENU,
            ...SUPER_ADMIN_MENU,
            ...ADMIN_MENU,
            ...PRODUCER_COMPANY_MENU,
            ...PRODUCER_REPORTS_MENU,
            ...LOAN_MANAGEMENT_MENU,
            ...DMS_MENU,
            ...APPROVALS_MENU,
            ...DISBURSAL_MENU,
            ...FINANCE_ACCOUNTS_MENU,
            ...COLLECTION_MENU,
            ...NOTICES_MENU,
            ...ANALYTICAL_REPORTS_MENU
        ];

        expandRecursive(allRootMenus, location.pathname);
    }, [location.pathname]);

    const isSuperAdmin = userRole === UserRole.SUPER_ADMIN;

    const filterMenu = (menu: MenuItem[]) => menu.filter((item) => item.roles.includes(userRole ?? ""));

    const coreItems = filterMenu(CORE_MENU);
    const superAdminItems = filterMenu(SUPER_ADMIN_MENU);
    const adminItems = filterMenu(ADMIN_MENU);
    const pcItems = filterMenu(PRODUCER_COMPANY_MENU);
    const pcReportItems = filterMenu(PRODUCER_REPORTS_MENU);
    const loanItems = filterMenu(LOAN_MANAGEMENT_MENU);
    const dmsItems = filterMenu(DMS_MENU);
    const approvalItems = filterMenu(APPROVALS_MENU);
    const disbursalItems = filterMenu(DISBURSAL_MENU);
    const financeItems = filterMenu(FINANCE_ACCOUNTS_MENU);
    const collectionItems = filterMenu(COLLECTION_MENU);
    const noticeItems = filterMenu(NOTICES_MENU);
    const analyticalItems = filterMenu(ANALYTICAL_REPORTS_MENU);

    // Fetch unread demo request count for super admin
    useEffect(() => {
        if (!isSuperAdmin) return;
        const fetchCount = async () => {
            try {
                const count = await demoRequestService.getUnreadCount();
                setDemoUnreadCount(count);
            } catch (_) { }
        };
        fetchCount();
        const interval = setInterval(fetchCount, 30000); // refresh every 30s
        return () => clearInterval(interval);
    }, [isSuperAdmin]);

    const handleLogout = () => {
        logout();
        navigate(isSuperAdmin ? "/auth/super-admin" : "/auth/bank-admin", { replace: true });
    };

    const renderSubItems = (items: SubMenuItem[], level: number = 0) => {
        return (
            <div className={cn(
                "mt-1 space-y-1 border-l-2 border-slate-100 pl-2",
                level === 0 ? "ml-9" : "ml-4"
            )}>
                {items.map((subItem) => {
                    const hasGrandChildren = subItem.subItems && subItem.subItems.length > 0;
                    const isOpen = openSubmenus[subItem.label];
                    const isActive = location.pathname === subItem.path ||
                        (hasGrandChildren && isPathActiveRecursive(subItem.subItems!, location.pathname));

                    return (
                        <div key={subItem.path} className="flex flex-col">
                            {hasGrandChildren ? (
                                <Button
                                    variant="ghost"
                                    onClick={() => toggleSubmenu(subItem.label)}
                                    className={cn(
                                        "w-full justify-start h-9 px-3 text-xs transition-all duration-200",
                                        isActive ? "text-[#009BB0] font-bold bg-[#009BB0]/5" : "text-slate-500 hover:text-[#009BB0]"
                                    )}
                                >
                                    <span className="flex-1 text-left truncate">{subItem.label}</span>
                                    <ChevronDown className={cn(
                                        "ml-auto h-3 w-3 transition-transform duration-200",
                                        isOpen && "rotate-180"
                                    )} />
                                </Button>
                            ) : (
                                <Link to={subItem.path} onClick={onClose}>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start h-9 px-3 text-xs transition-all duration-200",
                                            isActive
                                                ? "text-[#009BB0] font-bold bg-[#009BB0]/5"
                                                : "text-slate-500 hover:text-[#009BB0] hover:bg-[#009BB0]/5"
                                        )}
                                    >
                                        <span className="truncate">{subItem.label}</span>
                                    </Button>
                                </Link>
                            )}
                            {hasGrandChildren && isOpen && renderSubItems(subItem.subItems!, level + 1)}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderMenuItems = (items: MenuItem[], title: string) => {
        if (items.length === 0) return null;

        return (
            <div className="mb-6 animate-fade-in">
                <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                    {title}
                </p>
                <nav className="space-y-1">
                    {items.map((item) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isSubmenuOpen = openSubmenus[item.label];
                        const isActive = location.pathname === item.path ||
                            (hasSubItems && isPathActiveRecursive(item.subItems!, location.pathname));

                        const isDemoRequests = item.path === "/super-admin/demo-requests";
                        const badgeCount = isDemoRequests ? demoUnreadCount : 0;

                        return (
                            <div key={item.path} className="flex flex-col">
                                {hasSubItems ? (
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleSubmenu(item.label)}
                                        className={cn(
                                            "group relative w-full justify-start h-11 px-3 transition-all duration-250 ease-out",
                                            isActive
                                                ? "bg-[#009BB0]/10 text-[#009BB0] border-r-4 border-[#009BB0] rounded-r-none shadow-sm"
                                                : "text-slate-600 hover:bg-[#009BB0]/5 hover:text-[#009BB0] hover:shadow-sm hover:translate-x-1"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "mr-3 h-5 w-5 transition-all duration-250",
                                                isActive
                                                    ? "scale-110 text-[#009BB0]"
                                                    : "group-hover:scale-110 group-hover:text-[#009BB0]"
                                            )}
                                        />
                                        <span className="font-medium text-sm flex-1 text-left truncate">{item.label}</span>
                                        <ChevronDown className={cn(
                                            "ml-auto h-4 w-4 transition-transform duration-200",
                                            isSubmenuOpen && "rotate-180"
                                        )} />
                                    </Button>
                                ) : (
                                    <Link to={item.path} onClick={() => {
                                        if (isDemoRequests) setDemoUnreadCount(0);
                                        onClose?.();
                                    }}>
                                        <Button
                                            variant="ghost"
                                            className={cn(
                                                "group relative w-full justify-start h-11 px-3 transition-all duration-250 ease-out",
                                                isActive
                                                    ? "bg-[#009BB0]/10 text-[#009BB0] border-r-4 border-[#009BB0] rounded-r-none shadow-sm"
                                                    : "text-slate-600 hover:bg-[#009BB0]/5 hover:text-[#009BB0] hover:shadow-sm hover:translate-x-1"
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "mr-3 h-5 w-5 transition-all duration-250",
                                                    isActive
                                                        ? "scale-110 text-[#009BB0]"
                                                        : "group-hover:scale-110 group-hover:text-[#009BB0]"
                                                )}
                                            />
                                            <span className="font-medium text-sm truncate">{item.label}</span>

                                            {badgeCount > 0 && (
                                                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F18422] text-[10px] font-bold text-white px-1.5 shadow-sm">
                                                    {badgeCount > 99 ? '99+' : badgeCount}
                                                </span>
                                            )}

                                            {isActive && badgeCount === 0 && (
                                                <ChevronRight className="ml-auto h-4 w-4 text-[#009BB0] opacity-70 animate-pulse-slow" />
                                            )}
                                        </Button>
                                    </Link>
                                )}

                                {hasSubItems && isSubmenuOpen && renderSubItems(item.subItems!)}
                            </div>
                        );
                    })}
                </nav>
            </div>
        );
    };

    return (
        <aside
            className={cn(
                "border-r bg-white w-64 flex flex-col h-screen fixed left-0 top-0 z-50 transition-all duration-300 shadow-[4px_0_24px_rgba(0,0,0,0.04)]",
                "animate-slide-in-left lg:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}
        >
            {/* Header / Logo */}
            <div className="h-16 flex items-center px-6 border-b bg-gradient-to-r from-white to-[#009BB0]/5 relative">
                <div
                    className={cn(
                        "flex items-center justify-center w-full h-full rounded-lg text-white shadow-sm transition-transform duration-300 hover:scale-110"
                    )}
                >
                    <img
                        src={logo}
                        alt="CoreBranch Logo"
                        className="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Close Button for Mobile */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden absolute right-2 text-slate-400 hover:text-slate-600"
                    onClick={onClose}
                >
                    <ChevronRight className="h-5 w-5 rotate-180" />
                </Button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {renderMenuItems(coreItems, "Core Interface")}
                {renderMenuItems(superAdminItems, "Platform Control")}
                {renderMenuItems(adminItems, "System Administration")}
                {renderMenuItems(pcItems, "Producer Company Operations")}
                {renderMenuItems(pcReportItems, "Producer Company Reports")}
                {renderMenuItems(loanItems, "Loan Management")}
                {renderMenuItems(dmsItems, "Document Management")}
                {renderMenuItems(approvalItems, "Approvals")}
                {renderMenuItems(disbursalItems, "Loan Disbursal / EMI")}
                {renderMenuItems(financeItems, "Financial Accounting")}
                {renderMenuItems(collectionItems, "Collection Management")}
                {renderMenuItems(noticeItems, "Notices And Letters")}
                {renderMenuItems(analyticalItems, "Analytical Reports")}
            </div>

            {/* Footer / User Info */}
            <div className="p-4 border-t bg-gradient-to-t from-[#009BB0]/5 to-transparent">
                <div className="rounded-xl overflow-hidden shadow-md border border-[#009BB0]/10">
                    <div className="bg-[#009BB0] px-4 py-3 text-white">
                        <p className="text-[10px] font-medium opacity-85 uppercase tracking-wider">Connected as</p>
                        <p className="text-sm font-bold truncate">
                            {userName || 'Global Administrator'}
                        </p>
                    </div>
                    <div className="bg-white px-4 py-3 flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-[#F18422]">
                                {userRole?.replace(/_/g, " ") || "Role"}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                                {user?.email || "—"}
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-500 hover:text-red-600 hover:bg-red-50/80 transition-colors"
                            onClick={handleLogout}
                            aria-label="Sign out"
                        >
                            <LogOut className="h-4.5 w-4.5" />
                        </Button>
                    </div>
                </div>

                <p className="mt-5 text-center text-[10px] text-slate-400">
                    © {new Date().getFullYear()} Suthra Technologies Pvt. Ltd.
                </p>
            </div>
        </aside>
    );
}