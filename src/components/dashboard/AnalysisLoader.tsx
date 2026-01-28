import { Activity } from 'lucide-react';

interface AnalysisLoaderProps {
  isVisible: boolean;
}

export default function AnalysisLoader({ isVisible }: AnalysisLoaderProps) {
  if (!isVisible) return null;

  return (
    <section className="py-16" id="analysis-section">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-12 text-center animate-scale-in">
          {/* Animated scanner effect */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-2 rounded-full border-2 border-primary/30" />
            <div className="absolute inset-4 rounded-full border border-primary/40" />
            <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin-slow" />
            
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center animate-pulse">
                <Activity className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Scanning line */}
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4 text-gradient">AI Analysis in Progress</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Processing real-time sensor data and correlating with historical flood patterns using advanced machine learning models...
          </p>

          {/* Progress indicators */}
          <div className="flex justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-risk-low animate-pulse" />
              <span className="text-muted-foreground">Collecting Data</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-risk-medium animate-pulse delay-300" />
              <span className="text-muted-foreground">Pattern Matching</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-700" />
              <span className="text-muted-foreground">Risk Calculation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
