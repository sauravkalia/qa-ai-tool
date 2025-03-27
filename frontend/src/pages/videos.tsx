
import { MainLayout } from "@/components/layout/main-layout";
import { VideoGrid } from "@/components/dashboard/video-grid";
import { VideoUpload } from "@/components/dashboard/video-upload";

export default function VideosPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Video Library</h1>
          <p className="text-muted-foreground mt-1">
            All your uploaded test videos
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-3">
            <VideoUpload />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">All Videos</h2>
          </div>
          <VideoGrid />
        </div>
      </div>
    </MainLayout>
  );
}
