import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import ProcessingSection from "@/components/ProcessingSection";
import PreviewSection from "@/components/PreviewSection";

export interface ProcessedVideo {
  originalFile: File;
  vrVideoUrl: string;
  leftEyeUrl: string;
  rightEyeUrl: string;
  anaglyphUrl: string;
  downloadUrl: string;
  details: {
    duration: string;
    resolution: string;
    frameRate: string;
    fileSize: string;
  };
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedVideo, setProcessedVideo] = useState<ProcessedVideo | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProcessedVideo(null);
  };

  const handleProcessingComplete = (videoData: ProcessedVideo) => {
    setProcessedVideo(videoData);
  };

  const handleViewDemo = () => {
    // Create demo video data
    const demoVideoData: ProcessedVideo = {
      originalFile: new File([], "mountain_landscape_demo.mp4"),
      vrVideoUrl: "/src/assets/demo-left-eye.jpg", // Using static image as placeholder
      leftEyeUrl: "/src/assets/demo-left-eye.jpg",
      rightEyeUrl: "/src/assets/demo-right-eye.jpg", 
      anaglyphUrl: "/src/assets/demo-anaglyph.jpg",
      downloadUrl: "#", // Disabled for demo
      details: {
        duration: "2:34",
        resolution: "3840×2160",
        frameRate: "30 fps",
        fileSize: "125.4 MB"
      }
    };
    
    setProcessedVideo(demoVideoData);
    setIsDemoMode(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onViewDemo={handleViewDemo} />
      <UploadSection onFileSelect={handleFileSelect} />
      <ProcessingSection 
        file={selectedFile} 
        onProcessingComplete={handleProcessingComplete}
      />
      <PreviewSection 
        isVisible={!!processedVideo} 
        processedVideo={processedVideo}
        isDemoMode={isDemoMode}
      />
    </div>
  );
};

export default Index;
