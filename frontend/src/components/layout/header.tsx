
import { ThemeToggle } from "../theme-toggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("w-full px-6 py-4 flex items-center justify-between border-b border-border/50 glass", className)}>
      <div className="flex items-center gap-2">
        <div className="text-primary h-8 w-8 flex items-center justify-center rounded-md bg-primary/10">
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-5 w-5"
          >
            <path d="M17 6.1H3M21 12.1H3M15.1 18.1H3" />
          </svg>
        </div>
        <h1 className="text-lg font-semibold tracking-tight">QA Testing Dashboard</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Settings className="h-5 w-5" />
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
