
import { FileVideo, Play, Timer } from "lucide-react";
import { TestRunsTable } from "@/components/dashboard/test-runs-table";
import { StatsCard } from "@/components/dashboard/stats-card";
import { VideoUpload } from "@/components/dashboard/video-upload";
import { MainLayout } from "@/components/layout/main-layout";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your QA test videos and results
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatsCard
            title="Total Tests"
            value="124"
            description="All time test runs"
            icon={Play}
            trend="up"
            trendValue="8% from last month"
          />
          <StatsCard
            title="Total Videos"
            value="48"
            description="Uploaded test recordings"
            icon={FileVideo}
            trend="up"
            trendValue="12% from last month"
          />
          <StatsCard
            title="Avg. Execution Time"
            value="16.4s"
            description="Per test run"
            icon={Timer}
            trend="down"
            trendValue="5% from last month"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Upload New Video</h2>
            <VideoUpload />
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Recent Test Runs</h2>
            <TestRunsTable />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
