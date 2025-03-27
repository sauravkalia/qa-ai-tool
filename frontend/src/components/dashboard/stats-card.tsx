
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <div className={cn("p-6 rounded-lg border glass glass-hover", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
          
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <div
                className={cn(
                  "flex items-center text-xs font-medium rounded-full px-1.5 py-0.5",
                  trend === "up" && "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400",
                  trend === "down" && "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400",
                  trend === "neutral" && "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                )}
              >
                {trend === "up" && (
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {trend === "down" && (
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {trend === "neutral" && (
                  <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                  </svg>
                )}
                {trendValue}
              </div>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
