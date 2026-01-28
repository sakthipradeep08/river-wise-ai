import { useState } from 'react';
import { MapPin, Droplets, Waves, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { locations } from '@/data/locations';
import { FloodData, RainfallLevel, RiverLevel } from '@/types/flood';

interface DataInputSectionProps {
  onAnalyze: (data: FloodData) => void;
  isAnalyzing: boolean;
}

export default function DataInputSection({ onAnalyze, isAnalyzing }: DataInputSectionProps) {
  const [location, setLocation] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [rainfallLevel, setRainfallLevel] = useState<RainfallLevel>('light');
  const [riverLevel, setRiverLevel] = useState<RiverLevel>('normal');

  const handleSubmit = () => {
    if (!location || !rainfall) return;
    
    onAnalyze({
      location,
      rainfall: parseFloat(rainfall),
      rainfallLevel,
      riverLevel,
    });
  };

  const rainfallButtons: { level: RainfallLevel; label: string; icon: string; variant: 'riskLow' | 'riskMedium' | 'riskHigh' | 'riskExtreme' }[] = [
    { level: 'light', label: 'Light', icon: '🟢', variant: 'riskLow' },
    { level: 'moderate', label: 'Moderate', icon: '🟡', variant: 'riskMedium' },
    { level: 'heavy', label: 'Heavy', icon: '🟠', variant: 'riskHigh' },
    { level: 'extreme', label: 'Extreme', icon: '🔴', variant: 'riskExtreme' },
  ];

  const riverButtons: { level: RiverLevel; label: string; description: string }[] = [
    { level: 'normal', label: 'Normal', description: 'Within safe limits' },
    { level: 'rising', label: 'Rising', description: 'Above average' },
    { level: 'danger', label: 'Danger', description: 'Critical level' },
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-8 animate-fade-in">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Real-Time Data Input</h2>
              <p className="text-muted-foreground">Enter current conditions for AI flood risk analysis</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Location selection */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Select Location
              </Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-14 bg-secondary/50 border-border/50 focus:border-primary text-base">
                  <SelectValue placeholder="Choose monitoring location" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-64">
                  {locations.map((loc) => (
                    <SelectItem key={loc.id} value={loc.id} className="py-3">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{loc.name}</span>
                        <span className="text-muted-foreground text-sm">{loc.state}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${loc.historicalRisk > 70 ? 'bg-risk-high/20 text-risk-high' : loc.historicalRisk > 50 ? 'bg-risk-medium/20 text-risk-medium' : 'bg-risk-low/20 text-risk-low'}`}>
                          Risk: {loc.historicalRisk}%
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rainfall input */}
            <div className="space-y-4">
              <Label className="text-base font-medium flex items-center gap-2">
                <Droplets className="w-5 h-5 text-primary" />
                Rainfall Amount (mm)
              </Label>
              <Input
                type="number"
                placeholder="Enter rainfall in millimeters"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                className="h-14 bg-secondary/50 border-border/50 focus:border-primary text-base"
                min="0"
                max="500"
              />
            </div>
          </div>

          {/* Rainfall intensity selection */}
          <div className="mt-8 space-y-4">
            <Label className="text-base font-medium flex items-center gap-2">
              <Droplets className="w-5 h-5 text-primary" />
              Rainfall Intensity Level
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {rainfallButtons.map((btn) => (
                <Button
                  key={btn.level}
                  variant={rainfallLevel === btn.level ? btn.variant : 'outline'}
                  size="lg"
                  className={`h-16 flex flex-col gap-1 transition-all ${rainfallLevel === btn.level ? 'scale-105' : 'hover:scale-102'}`}
                  onClick={() => setRainfallLevel(btn.level)}
                >
                  <span className="text-lg">{btn.icon}</span>
                  <span>{btn.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* River level selection */}
          <div className="mt-8 space-y-4">
            <Label className="text-base font-medium flex items-center gap-2">
              <Waves className="w-5 h-5 text-primary" />
              River Water Level
            </Label>
            <div className="grid md:grid-cols-3 gap-4">
              {riverButtons.map((btn, index) => (
                <Button
                  key={btn.level}
                  variant={riverLevel === btn.level ? (index === 0 ? 'riskLow' : index === 1 ? 'riskMedium' : 'riskExtreme') : 'outline'}
                  size="lg"
                  className={`h-20 flex flex-col gap-1 transition-all ${riverLevel === btn.level ? 'scale-105' : ''}`}
                  onClick={() => setRiverLevel(btn.level)}
                >
                  <span className="font-semibold">{btn.label}</span>
                  <span className="text-xs opacity-80">{btn.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Analyze button */}
          <div className="mt-10 flex justify-center">
            <Button
              variant="glow"
              size="xl"
              className="min-w-64"
              onClick={handleSubmit}
              disabled={!location || !rainfall || isAnalyzing}
            >
              {isAnalyzing ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6" />
                  Analyze Flood Risk
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
