import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusType = "Pending" | "Under Review" | "Approved" | "Rejected" | "Disbursed" | "Delinquent" | "Completed" | "Failed" | "Active" | "Inactive"

interface StatusBadgeProps {
    status: StatusType | string
    className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    let variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" = "outline"

    switch (status) {
        case "Approved":
        case "Completed":
        case "Active":
        case "Disbursed":
        case "Verified":
            variant = "success"
            break
        case "Pending":
        case "Under Review":
        case "Draft":
            variant = "warning"
            break
        case "Rejected":
        case "Failed":
        case "Delinquent":
        case "High Risk":
            variant = "destructive"
            break
        case "Inactive":
            variant = "secondary"
            break
        case "New":
            variant = "info"
            break
        default:
            variant = "outline"
    }

    return (
        <Badge variant={variant} className={cn("uppercase text-[10px] tracking-wider font-bold", className)}>
            {status}
        </Badge>
    )
}
