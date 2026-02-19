import { cn } from "@/lib/utils"
import { Check, Circle, Clock } from "lucide-react"

export type TimelineEvent = {
    id: string
    title: string
    description?: string
    timestamp: string
    status: "completed" | "current" | "pending" | "failed"
    user?: string
}

interface TimelineProps {
    events: TimelineEvent[]
    className?: string
}

export function Timeline({ events, className }: TimelineProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {events.map((event, index) => (
                <div key={event.id} className="relative flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className={cn(
                            "h-6 w-6 rounded-full border-2 flex items-center justify-center z-10 bg-background",
                            event.status === "completed" ? "border-primary bg-primary text-primary-foreground" :
                                event.status === "current" ? "border-primary text-primary animate-pulse" :
                                    event.status === "failed" ? "border-destructive text-destructive" :
                                        "border-muted-foreground text-muted-foreground"
                        )}>
                            {event.status === "completed" && <Check className="h-3 w-3" />}
                            {event.status === "current" && <Circle className="h-3 w-3 fill-current" />}
                            {event.status === "pending" && <Circle className="h-3 w-3" />}
                            {event.status === "failed" && <Clock className="h-3 w-3" />}
                        </div>
                        {index !== events.length - 1 && (
                            <div className={cn(
                                "w-0.5 grow mt-1",
                                event.status === "completed" ? "bg-primary" : "bg-muted"
                            )} />
                        )}
                    </div>
                    <div className="pb-6 pt-0.5">
                        <h4 className="text-sm font-semibold">{event.title}</h4>
                        {event.description && <p className="text-sm text-muted-foreground mt-1">{event.description}</p>}
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <span className="font-mono">{event.timestamp}</span>
                            {event.user && <span>• by {event.user}</span>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
