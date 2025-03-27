
import { cn } from "@/lib/utils";
import { Check, Clock, X } from "lucide-react";

type Status = "processing" | "completed" | "failed";

interface CardStatusProps {
  status: Status;
  className?: string;
}

export function CardStatus({ status, className }: CardStatusProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        status === "processing" && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
        status === "completed" && "bg-green-500/10 text-green-600 dark:text-green-400",
        status === "failed" && "bg-red-500/10 text-red-600 dark:text-red-400",
        className
      )}
    >
      {status === "processing" && <Clock className="h-3 w-3" />}
      {status === "completed" && <Check className="h-3 w-3" />}
      {status === "failed" && <X className="h-3 w-3" />}
      <span className="capitalize">{status}</span>
    </div>
  );
}
