
import { Video, VideoCard } from "./video-card";

// Mock data for videos
const mockVideos: Video[] = [
  {
    id: "1",
    fileName: "login-flow-test.mp4",
    uploadDate: "Today, 10:30 AM",
    status: "completed",
    duration: "1:32",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "2",
    fileName: "product-checkout-test.mp4",
    uploadDate: "Yesterday, 2:15 PM",
    status: "completed",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "3",
    fileName: "registration-form-validation.mp4",
    uploadDate: "May 15, 9:20 AM",
    status: "processing",
    duration: "0:58"
  },
  {
    id: "4",
    fileName: "admin-dashboard-navigation.mp4",
    uploadDate: "May 14, 11:45 AM",
    status: "failed",
    duration: "1:24"
  },
  {
    id: "5",
    fileName: "user-profile-editing.mp4",
    uploadDate: "May 12, 3:30 PM",
    status: "completed",
    duration: "1:17",
    thumbnail: "https://images.unsplash.com/photo-1618788372246-79faff0c3742?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: "6",
    fileName: "search-functionality-test.mp4",
    uploadDate: "May 10, 10:05 AM",
    status: "completed",
    duration: "0:46",
    thumbnail: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?q=80&w=500&auto=format&fit=crop"
  }
];

export function VideoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
