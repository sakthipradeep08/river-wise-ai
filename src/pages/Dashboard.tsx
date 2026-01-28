import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DataInputSection from '@/components/dashboard/DataInputSection';
import AnalysisLoader from '@/components/dashboard/AnalysisLoader';
import RiskResultSection from '@/components/dashboard/RiskResultSection';
import EmergencyAlert from '@/components/dashboard/EmergencyAlert';
import ResourceAllocationSection from '@/components/dashboard/ResourceAllocationSection';
import InfoSection from '@/components/dashboard/InfoSection';
import { FloodData, FloodAnalysisResult } from '@/types/flood';
import { analyzeFloodRisk } from '@/lib/floodAnalysis';
import { locations } from '@/data/locations';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<FloodAnalysisResult | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('sfas_authenticated');
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [navigate]);

  const handleAnalyze = async (data: FloodData) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSelectedLocation(data.location);

    // Scroll to analysis section
    setTimeout(() => {
      document.getElementById('analysis-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Simulate AI analysis time
    await new Promise(resolve => setTimeout(resolve, 3000));

    const result = analyzeFloodRisk(data);
    setAnalysisResult(result);
    setIsAnalyzing(false);

    // Scroll to results
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    // Show emergency alert for high/extreme risk
    if (result.riskLevel === 'high' || result.riskLevel === 'extreme') {
      setTimeout(() => setShowEmergencyAlert(true), 500);
    }
  };

  const locationName = locations.find(l => l.id === selectedLocation)?.name || selectedLocation;
  const alertCount = analysisResult && (analysisResult.riskLevel === 'high' || analysisResult.riskLevel === 'extreme') ? 1 : 0;

  return (
    <div className="min-h-screen bg-background scrollbar-thin">
      <DashboardHeader selectedLocation={locationName} alertCount={alertCount} />
      
      {/* Hero section */}
      <section className="py-12 border-b border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              System Online • Real-Time Monitoring Active
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">AI-Powered</span> Flood Risk Analysis
            </h1>
            <p className="text-xl text-muted-foreground">
              Advanced machine learning algorithms analyzing real-time environmental data 
              to protect communities from flood disasters.
            </p>
          </div>
        </div>
      </section>

      <DataInputSection onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
      
      <AnalysisLoader isVisible={isAnalyzing} />
      
      <div ref={resultRef}>
        <RiskResultSection result={analysisResult} locationName={locationName} />
      </div>
      
      <ResourceAllocationSection riskLevel={analysisResult?.riskLevel || null} />
      
      <InfoSection />

      <EmergencyAlert
        isVisible={showEmergencyAlert}
        riskLevel={analysisResult?.riskLevel || 'low'}
        locationName={locationName}
        onDismiss={() => setShowEmergencyAlert(false)}
      />
    </div>
  );
}
