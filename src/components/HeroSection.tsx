import { Button } from "@/components/ui/button";
import { PlayCircle, Sparkles, Zap } from "lucide-react";
import heroImage from "@/assets/hero-vr.jpg";

interface HeroSectionProps {
  onViewDemo: () => void;
}

const HeroSection = ({ onViewDemo }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-glow opacity-50 animate-glow-pulse" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-vr-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vr-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 backdrop-blur-sm border border-border rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-vr-primary" />
            <span className="text-sm font-medium">Revolutionary VR 180 Conversion</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 leading-tight">
            Transform 2D Videos into
            <br />
            <span className="text-vr-accent">Immersive VR 180</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload any 2D video and watch our AI create stunning stereoscopic VR 180 content 
            with advanced depth estimation and spatial rendering.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="group">
              <PlayCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Converting
              <Zap className="w-4 h-4 ml-2 text-vr-accent" />
            </Button>
            <Button variant="outline" size="lg" onClick={onViewDemo}>
              View Demo
            </Button>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl shadow-intense">
              <img 
                src={heroImage} 
                alt="VR headset with holographic visualization"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-primary/20 mix-blend-overlay" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-vr-primary/30 rounded-full blur-lg animate-float" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-vr-accent/30 rounded-full blur-lg animate-float" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;