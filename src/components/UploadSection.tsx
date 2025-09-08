import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileVideo, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
}

const UploadSection = ({ onFileSelect }: UploadSectionProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      setSelectedFile(videoFile);
      onFileSelect(videoFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Upload Your 2D Video
          </h2>
          <p className="text-xl text-muted-foreground">
            Support for MP4, MOV, AVI formats. Maximum file size: 500MB
          </p>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border shadow-card">
          {!selectedFile ? (
            <div
              className={cn(
                "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300",
                isDragOver
                  ? "border-vr-primary bg-vr-primary/10 shadow-glow"
                  : "border-border hover:border-vr-primary/50 hover:bg-card/30"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                    <Upload className="w-12 h-12 text-background" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-vr-accent animate-glow-pulse" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-2">Drop your video here</h3>
                  <p className="text-muted-foreground mb-6">
                    Or click to browse your files
                  </p>
                  
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    size="lg"
                  >
                    <FileVideo className="w-5 h-5 mr-2" />
                    Choose Video File
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  <span className="px-3 py-1 bg-muted rounded-full">MP4</span>
                  <span className="px-3 py-1 bg-muted rounded-full">MOV</span>
                  <span className="px-3 py-1 bg-muted rounded-full">AVI</span>
                  <span className="px-3 py-1 bg-muted rounded-full">Max 500MB</span>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between p-6 bg-gradient-secondary rounded-xl border border-vr-primary/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-vr-primary rounded-lg flex items-center justify-center">
                  <FileVideo className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h4 className="font-semibold">{selectedFile.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default UploadSection;