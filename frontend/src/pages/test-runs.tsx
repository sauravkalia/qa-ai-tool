
import { MainLayout } from "@/components/layout/main-layout";
import { TestRunsTable } from "@/components/dashboard/test-runs-table";

export default function TestRunsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Test Runs</h1>
          <p className="text-muted-foreground mt-1">
            View and analyze your test execution results
          </p>
        </div>
        
        <div className="space-y-4">
          <TestRunsTable />
        </div>
      </div>
    </MainLayout>
  );
}
