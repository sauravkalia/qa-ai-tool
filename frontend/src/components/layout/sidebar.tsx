
import { cn } from "@/lib/utils";
import { Calendar, FileVideo, Home, Play } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Videos",
    href: "/videos",
    icon: FileVideo,
  },
  {
    title: "Test Runs",
    href: "/test-runs",
    icon: Play,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "w-[240px] h-screen flex flex-col border-r border-border/50 glass",
        className
      )}
    >
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
          Overview
        </h2>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                  "hover:bg-secondary/80 hover:text-foreground",
                  "focus:bg-secondary focus:text-foreground",
                  isActive
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
