
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={cn(
        "rounded-full transition-all duration-300",
        theme === "dark" ? "bg-secondary/50" : "bg-secondary/80",
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className={cn("h-5 w-5 rotate-0 scale-100 transition-all duration-300", theme === "dark" ? "opacity-0 -rotate-90 scale-0" : "opacity-100")} />
      <Moon className={cn("absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300", theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0")} />
    </Button>
  );
}
