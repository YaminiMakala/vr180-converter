import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, RotateCcw, Maximize, Play, Pause, Volume2 } from "lucide-react";
import { ProcessedVideo } from "@/pages/Index";

interface PreviewSectionProps {
  isVisible: boolean;
  processedVideo: ProcessedVideo | null;
  isDemoMode?: boolean;
}

const PreviewSection = ({ isVisible, processedVideo, isDemoMode = false }: PreviewSectionProps) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'anaglyph' | 'mono'>('side-by-side');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);

  if (!isVisible || !processedVideo) return null;

  const togglePlayback = () => {
    const videos = [videoRef.current, leftVideoRef.current, rightVideoRef.current].filter(Boolean);
    
    if (isPlaying) {
      videos.forEach(video => video?.pause());
    } else {
      videos.forEach(video => video?.play());
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedVideo.downloadUrl;
    link.download = `vr180_${processedVideo.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-vr-accent/20 text-vr-accent border-vr-accent/30">
            {isDemoMode ? "🎬 Demo Mode" : "✨ Processing Complete"}
          </Badge>
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            VR 180 Preview
          </h2>
          <p className="text-xl text-muted-foreground">
            Your 2D video has been transformed into immersive stereoscopic VR 180 content
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Preview */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border shadow-card">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">VR 180 Output</h3>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'side-by-side' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('side-by-side')}
                    >
                      Side by Side
                    </Button>
                    <Button
                      variant={viewMode === 'anaglyph' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('anaglyph')}
                    >
                      Anaglyph
                    </Button>
                    <Button
                      variant={viewMode === 'mono' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('mono')}
                    >
                      Mono
                    </Button>
                  </div>
                </div>
              </div>

              <div className="aspect-video bg-black relative overflow-hidden">
                {/* Actual Video Content */}
                {viewMode === 'side-by-side' && (
                  <div className="grid grid-cols-2 w-full h-full">
                    <div className="relative">
                      <video
                        ref={leftVideoRef}
                        src={processedVideo.leftEyeUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute top-2 left-2 bg-vr-primary/80 text-white px-2 py-1 rounded text-xs">
                        Left Eye
                      </div>
                    </div>
                    <div className="relative">
                      <video
                        ref={rightVideoRef}
                        src={processedVideo.rightEyeUrl}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute top-2 left-2 bg-vr-accent/80 text-white px-2 py-1 rounded text-xs">
                        Right Eye
                      </div>
                    </div>
                  </div>
                )}
                
                {viewMode === 'anaglyph' && (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={processedVideo.anaglyphUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      style={{ filter: 'sepia(1) hue-rotate(180deg) contrast(1.2)' }}
                    />
                    <div className="absolute top-2 left-2 bg-gradient-primary/80 text-white px-2 py-1 rounded text-xs">
                      Anaglyph 3D - Use Red/Cyan Glasses
                    </div>
                  </div>
                )}
                
                {viewMode === 'mono' && (
                  <div className="relative w-full h-full">
                    <video
                      ref={videoRef}
                      src={processedVideo.vrVideoUrl}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                    <div className="absolute top-2 left-2 bg-vr-secondary/80 text-white px-2 py-1 rounded text-xs">
                      Mono Preview
                    </div>
                  </div>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                  <div className="bg-background/90 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={togglePlayback}
                      className="p-2"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-muted rounded-full cursor-pointer">
                        <div className="w-1/3 h-full bg-vr-primary rounded-full transition-all" />
                      </div>
                      <span className="text-xs text-muted-foreground min-w-[60px]">
                        {processedVideo.details.duration}
                      </span>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="p-2">
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border shadow-card">
              <h4 className="font-semibold mb-4">
                {isDemoMode ? "Demo File Details" : "Output Details"}
              </h4>
              <div className="space-y-3 text-sm">
                {isDemoMode && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">File Name</span>
                    <span className="text-vr-primary">mountain_landscape_demo.mp4</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="text-vr-primary">VR 180 MP4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution</span>
                  <span>{processedVideo.details.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frame Rate</span>
                  <span>{processedVideo.details.frameRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{processedVideo.details.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">File Size</span>
                  <span>{processedVideo.details.fileSize}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border shadow-card">
              <h4 className="font-semibold mb-4">VR Compatibility</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Oculus Quest 2/3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>HTC Vive</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>PlayStation VR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>YouTube VR</span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button 
                variant={isDemoMode ? "outline" : "download"}
                size="lg" 
                className="w-full"
                onClick={isDemoMode ? undefined : handleDownload}
                disabled={isDemoMode}
              >
                <Download className="w-5 h-5 mr-2" />
                {isDemoMode ? "Demo Mode – Download Disabled" : "Download VR 180 Video"}
              </Button>
              
              <Button variant="outline" size="lg" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Process Another Video
              </Button>
              
              <Button variant="outline" size="lg" className="w-full">
                <Maximize className="w-4 h-4 mr-2" />
                Full Screen Preview
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewSection;