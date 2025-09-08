import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Eye, Layers, Download, Sparkles, Zap } from "lucide-react";
import depthImage from "@/assets/depth-visualization.jpg";

import { ProcessedVideo } from "@/pages/Index";

interface ProcessingSectionProps {
  file: File | null;
  onProcessingComplete: (videoData: ProcessedVideo) => void;
}

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  progress: number;
  status: 'pending' | 'processing' | 'completed';
}

const ProcessingSection = ({ file, onProcessingComplete }: ProcessingSectionProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const steps: ProcessingStep[] = [
    {
      id: 'analysis',
      title: 'Video Analysis',
      description: 'Analyzing frame structure and motion patterns',
      icon: Brain,
      progress: 0,
      status: 'pending'
    },
    {
      id: 'depth',
      title: 'Depth Estimation',
      description: 'Generating depth maps using MiDaS neural network',
      icon: Layers,
      progress: 0,
      status: 'pending'
    },
    {
      id: 'stereo',
      title: 'Stereoscopic Rendering',
      description: 'Creating left and right eye perspectives',
      icon: Eye,
      progress: 0,
      status: 'pending'
    },
    {
      id: 'encode',
      title: 'VR 180 Encoding',
      description: 'Finalizing immersive video format',
      icon: Sparkles,
      progress: 0,
      status: 'pending'
    }
  ];

  const [processingSteps, setProcessingSteps] = useState(steps);

  const startProcessing = () => {
    setIsProcessing(true);
    setCurrentStep(0);
    simulateProcessing();
  };

  const simulateProcessing = async () => {
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Update step status to processing
      setProcessingSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index === i ? 'processing' : index < i ? 'completed' : 'pending'
      })));

      // Simulate step progress
      for (let progress = 0; progress <= 100; progress += 2) {
        await new Promise(resolve => setTimeout(resolve, 50));
        
        setProcessingSteps(prev => prev.map((step, index) => ({
          ...step,
          progress: index === i ? progress : index < i ? 100 : 0
        })));

        setOverallProgress(((i * 100) + progress) / steps.length);
      }

      // Mark step as completed
      setProcessingSteps(prev => prev.map((step, index) => ({
        ...step,
        status: index <= i ? 'completed' : 'pending'
      })));
    }

    setIsProcessing(false);
    
    // Create processed video data with URLs (using original file as mock processed video)
    const processedVideoData: ProcessedVideo = {
      originalFile: file!,
      vrVideoUrl: URL.createObjectURL(file!), // Mock: using original video
      leftEyeUrl: URL.createObjectURL(file!), // Mock: left eye perspective
      rightEyeUrl: URL.createObjectURL(file!), // Mock: right eye perspective  
      anaglyphUrl: URL.createObjectURL(file!), // Mock: anaglyph version
      downloadUrl: URL.createObjectURL(file!), // Mock: download URL
      details: {
        duration: "2:30",
        resolution: "3840x2160",
        frameRate: "30 FPS",
        fileSize: `${(file!.size / (1024 * 1024)).toFixed(0)} MB`
      }
    };
    
    onProcessingComplete(processedVideoData);
  };

  if (!file) return null;

  return (
    <section className="py-20 px-6 bg-gradient-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            AI Processing Pipeline
          </h2>
          <p className="text-xl text-muted-foreground">
            Advanced neural networks transform your 2D video into immersive VR 180
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Processing Steps */}
          <div className="space-y-6">
            {!isProcessing && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border shadow-card">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Ready to Process</h3>
                  <p className="text-muted-foreground mb-6">
                    File: <span className="text-vr-primary">{file.name}</span>
                  </p>
                  <Button 
                    onClick={startProcessing}
                    variant="hero"
                    size="lg"
                    className="w-full"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Start VR 180 Conversion
                  </Button>
                </div>
              </Card>
            )}

            {isProcessing && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border shadow-card">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Overall Progress</h3>
                    <span className="text-sm text-vr-primary">{overallProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={overallProgress} className="h-2" />
                </div>
              </Card>
            )}

            {processingSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep && isProcessing;
              const isCompleted = step.status === 'completed';
              
              return (
                <Card key={step.id} className={`p-6 transition-all duration-500 ${
                  isActive 
                    ? 'bg-vr-primary/10 border-vr-primary shadow-glow' 
                    : isCompleted 
                    ? 'bg-vr-accent/10 border-vr-accent/50' 
                    : 'bg-card/50 border-border'
                } backdrop-blur-sm`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-vr-primary text-background animate-glow-pulse' 
                        : isCompleted 
                        ? 'bg-vr-accent text-background' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        isActive ? 'text-vr-primary' : isCompleted ? 'text-vr-accent' : ''
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                      
                      {step.status === 'processing' && (
                        <div className="mt-3">
                          <Progress value={step.progress} className="h-1" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Visualization */}
          <div className="relative">
            <Card className="overflow-hidden bg-card/30 backdrop-blur-sm border-border shadow-card">
              <div className="aspect-square relative">
                <img 
                  src={depthImage}
                  alt="Depth visualization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-primary/20 mix-blend-overlay" />
                
                {isProcessing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-16 h-16 border-4 border-vr-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                      <p className="text-lg font-semibold">Processing...</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-vr-primary/40 rounded-full blur-sm animate-float" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-vr-accent/40 rounded-full blur-lg animate-float" style={{ animationDelay: "1s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessingSection;