
import { Button } from "@/components/ui/button";
import { FileVideo, Upload, X } from "lucide-react";
import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function VideoUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    // Check if the file is a video
    if (!file.type.startsWith("video/")) {
      toast.error("Please upload a video file.");
      return;
    }

    setSelectedFile(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    // Simulate upload progress
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev === null) return 0;
        if (prev >= 100) {
          clearInterval(interval);
          toast.success("Video uploaded successfully!");
          setSelectedFile(null);
          setUploadProgress(null);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-all duration-300",
          "flex flex-col items-center justify-center gap-4 text-center",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50 hover:bg-secondary/50",
          selectedFile ? "bg-secondary/30" : ""
        )}
      >
        {!selectedFile ? (
          <>
            <div className="rounded-full p-4 bg-primary/10">
              <FileVideo className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload test video</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Drag and drop your video file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                MP4 or MOV, max 500MB
              </p>
            </div>
            <Button 
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2"
            >
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="video/mp4,video/quicktime"
              onChange={handleInputChange}
            />
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-primary/10">
                  <FileVideo className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[200px]">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleCancelUpload}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {uploadProgress !== null ? (
              <div className="w-full">
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
            ) : (
              <Button 
                className="w-full mt-2"
                onClick={handleUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
