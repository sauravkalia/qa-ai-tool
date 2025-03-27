
import { Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface TestRun {
  id: string;
  name: string;
  date: string;
  status: "running" | "passed" | "failed";
  duration: string;
  tests: {
    total: number;
    passed: number;
    failed: number;
  };
}

const mockTestRuns: TestRun[] = [
  {
    id: "1",
    name: "Login Flow Test",
    date: "Today, 10:45 AM",
    status: "passed",
    duration: "12s",
    tests: {
      total: 5,
      passed: 5,
      failed: 0
    }
  },
  {
    id: "2",
    name: "Product Checkout",
    date: "Today, 9:30 AM",
    status: "failed",
    duration: "28s",
    tests: {
      total: 8,
      passed: 6,
      failed: 2
    }
  },
  {
    id: "3",
    name: "User Registration",
    date: "Yesterday, 4:15 PM",
    status: "running",
    duration: "8s",
    tests: {
      total: 4,
      passed: 2,
      failed: 0
    }
  },
  {
    id: "4",
    name: "Admin Dashboard Navigation",
    date: "Yesterday, 2:40 PM",
    status: "passed",
    duration: "16s",
    tests: {
      total: 6,
      passed: 6,
      failed: 0
    }
  }
];

export function TestRunsTable() {
  return (
    <div className="rounded-lg border glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary/30">
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                Test Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                Date
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                Duration
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">
                Tests
              </th>
              <th className="text-right py-3 px-4 text-xs font-medium text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {mockTestRuns.map((run) => (
              <tr key={run.id} className="border-b last:border-0 hover:bg-secondary/20 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-medium text-sm">{run.name}</div>
                </td>
                <td className="py-3 px-4 text-sm text-muted-foreground">
                  {run.date}
                </td>
                <td className="py-3 px-4">
                  <div
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-medium rounded-full w-fit px-2.5 py-1",
                      run.status === "running" && "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                      run.status === "passed" && "bg-green-500/10 text-green-600 dark:text-green-400",
                      run.status === "failed" && "bg-red-500/10 text-red-600 dark:text-red-400"
                    )}
                  >
                    {run.status === "running" && <Clock className="h-3 w-3" />}
                    {run.status === "passed" && <Check className="h-3 w-3" />}
                    {run.status === "failed" && <X className="h-3 w-3" />}
                    <span className="capitalize">{run.status}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  {run.duration}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-medium">
                      {run.tests.passed}/{run.tests.total}
                    </div>
                    <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                      {run.status !== "running" ? (
                        <>
                          <div 
                            className="h-full bg-green-500 float-left"
                            style={{ width: `${(run.tests.passed / run.tests.total) * 100}%` }}
                          ></div>
                          <div 
                            className="h-full bg-red-500 float-left"
                            style={{ width: `${(run.tests.failed / run.tests.total) * 100}%` }}
                          ></div>
                        </>
                      ) : (
                        <div className="h-full bg-yellow-500 animate-pulse w-full"></div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
