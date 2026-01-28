import { useEffect, useState } from 'react';
import { Droplets, Waves, History, TrendingUp } from 'lucide-react';
import { FloodAnalysisResult, RiskLevel } from '@/types/flood';

interface RiskResultSectionProps {
  result: FloodAnalysisResult | null;
  locationName: string;
}

const riskConfig: Record<RiskLevel, { color: string; bgColor: string; label: string; message: string }> = {
  low: {
    color: 'text-risk-low',
    bgColor: 'bg-risk-low',
    label: 'LOW RISK',
    message: 'Conditions are stable. Continue routine monitoring.',
  },
  medium: {
    color: 'text-risk-medium',
    bgColor: 'bg-risk-medium',
    label: 'MEDIUM RISK',
    message: 'Elevated risk detected. Activate preparedness measures.',
  },
  high: {
    color: 'text-risk-high',
    bgColor: 'bg-risk-high',
    label: 'HIGH RISK',
    message: 'Significant flood threat. Deploy emergency resources.',
  },
  extreme: {
    color: 'text-risk-extreme',
    bgColor: 'bg-risk-extreme',
    label: 'EXTREME RISK',
    message: 'Critical emergency! Immediate evacuation required.',
  },
};

export default function RiskResultSection({ result, locationName }: RiskResultSectionProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (!result) return;
    
    const duration = 1500;
    const steps = 60;
    const increment = result.score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= result.score) {
        setAnimatedScore(result.score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [result]);

  if (!result) return null;

  const config = riskConfig[result.riskLevel];
  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <section className="py-12" id="result-section">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-8 animate-slide-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Flood Risk Assessment</h2>
              <p className="text-muted-foreground">Location: {locationName}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg ${config.bgColor} text-white font-bold`}>
              {config.label}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Circular progress chart */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-56 h-56">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
                  {/* Background circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-secondary"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    className={config.color}
                    style={{
                      strokeDasharray: circumference,
                      strokeDashoffset,
                      transition: 'stroke-dashoffset 1.5s ease-out',
                    }}
                  />
                </svg>
                
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-5xl font-bold ${config.color}`}>
                    {animatedScore}
                  </span>
                  <span className="text-muted-foreground text-lg">/ 100</span>
                </div>
              </div>
              
              <p className={`mt-6 text-center font-medium ${config.color}`}>
                {config.message}
              </p>
            </div>

            {/* Breakdown cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Risk Factor Breakdown
              </h3>
              
              <div className="grid gap-4">
                {/* Rainfall score */}
                <div className="glass-panel p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Rainfall Impact</span>
                      <span className="text-primary font-bold">{result.breakdown.rainfallPoints}/40</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${(result.breakdown.rainfallPoints / 40) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* River level score */}
                <div className="glass-panel p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-risk-high/10 flex items-center justify-center">
                    <Waves className="w-6 h-6 text-risk-high" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">River Level Risk</span>
                      <span className="text-risk-high font-bold">{result.breakdown.riverPoints}/30</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-risk-high rounded-full transition-all duration-1000"
                        style={{ width: `${(result.breakdown.riverPoints / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Historical score */}
                <div className="glass-panel p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-risk-medium/10 flex items-center justify-center">
                    <History className="w-6 h-6 text-risk-medium" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Historical Pattern</span>
                      <span className="text-risk-medium font-bold">{result.breakdown.historyPoints}/30</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-risk-medium rounded-full transition-all duration-1000"
                        style={{ width: `${(result.breakdown.historyPoints / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 pt-8 border-t border-border/50">
            <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                  <div className={`w-6 h-6 rounded-full ${config.bgColor} text-white flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                    {index + 1}
                  </div>
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
