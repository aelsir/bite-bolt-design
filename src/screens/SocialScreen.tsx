import React from 'react';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';

interface VideoPost {
  id: string;
  username: string;
  userAvatar: string;
  videoUrl: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
}

const mockVideos: VideoPost[] = [
  {
    id: '1',
    username: 'foodlover',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    videoUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    description: 'Check out this amazing pizza I got from Bite Bolt! 🍕 #foodie #delicious',
    likes: 342,
    comments: 28,
    shares: 12
  },
  {
    id: '2',
    username: 'chefsecrets',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    videoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
    description: 'Making the perfect burger at home with ingredients from Bite Bolt! 🍔 #homecooking',
    likes: 512,
    comments: 45,
    shares: 23
  },
  {
    id: '3',
    username: 'healthyeats',
    userAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    videoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    description: 'Quick and healthy salad bowl delivered in just 15 minutes! 🥗 #healthy #quickmeals',
    likes: 287,
    comments: 19,
    shares: 8
  }
];

export const SocialScreen: React.FC = () => {
  const [activeVideoIndex, setActiveVideoIndex] = React.useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollTop;
    const videoHeight = container.clientHeight;
    const index = Math.round(scrollPosition / videoHeight);
    
    if (index !== activeVideoIndex) {
      setActiveVideoIndex(index);
    }
  };

  return (
    <div 
      className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
      onScroll={handleScroll}
    >
      {mockVideos.map((video, index) => (
        <div 
          key={video.id}
          className="h-screen w-full snap-start snap-always relative flex items-center justify-center"
        >
          {/* Video Placeholder (in a real app, this would be a video player) */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: `url(${video.videoUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          {/* Video Controls */}
          <div className="absolute bottom-20 left-0 right-0 p-4 z-10 text-white">
            <div className="flex items-start">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <img 
                    src={video.userAvatar} 
                    alt={video.username} 
                    className="w-10 h-10 rounded-full border-2 border-white mr-3"
                  />
                  <span className="font-bold">{video.username}</span>
                </div>
                <p className="text-sm mb-4">{video.description}</p>
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
                    <Heart size={24} />
                  </div>
                  <span className="text-xs">{video.likes}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-xs">{video.comments}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
                    <Share2 size={24} />
                  </div>
                  <span className="text-xs">{video.shares}</span>
                </button>
                
                <button className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
                    <MoreVertical size={24} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};