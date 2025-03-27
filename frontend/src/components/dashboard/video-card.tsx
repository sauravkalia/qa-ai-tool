
import { FileVideo, Play } from "lucide-react";
import { CardStatus } from "../ui/card-status";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { TestFlowViewer } from "./test-flow-viewer";
import { cn } from "@/lib/utils";

export interface Video {
  id: string;
  fileName: string;
  uploadDate: string;
  status: "processing" | "completed" | "failed";
  duration: string;
  thumbnail?: string;
}

interface VideoCardProps {
  video: Video;
  className?: string;
}

export function VideoCard({ video, className }: VideoCardProps) {
  return (
    <div 
      className={cn(
        "flex flex-col relative overflow-hidden rounded-lg border glass glass-hover transition-all duration-300",
        className
      )}
    >
      <div className="aspect-video bg-secondary/30 relative overflow-hidden">
        <div className={cn(
          "absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm",
          video.status === "completed" ? "opacity-0" : "opacity-100"
        )}>
          <div className="rounded-full bg-background/80 p-2">
            <FileVideo className="h-6 w-6 text-primary" />
          </div>
        </div>
        {video.thumbnail && video.status === "completed" && (
          <img 
            src={video.thumbnail} 
            alt={video.fileName} 
            className="w-full h-full object-cover" 
          />
        )}
        <div className={cn(
          "absolute right-3 top-3 z-10 transition-all duration-300",
          video.status === "completed" ? "" : "opacity-0"
        )}>
          <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <h3 className="font-medium truncate text-sm">{video.fileName}</h3>
          </div>
          <CardStatus status={video.status} />
        </div>
        
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <span>{video.uploadDate}</span>
          <span className="mx-2">•</span>
          <span>{video.duration}</span>
        </div>
        
        <div className="mt-auto">
          {video.status === "completed" && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  View Test Steps
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle>Test Steps: {video.fileName}</DialogTitle>
                </DialogHeader>
                <TestFlowViewer videoId={video.id} />
              </DialogContent>
            </Dialog>
          )}
          
          {video.status === "processing" && (
            <Button variant="outline" className="w-full" disabled>
              Processing...
            </Button>
          )}
          
          {video.status === "failed" && (
            <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
              View Error
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
