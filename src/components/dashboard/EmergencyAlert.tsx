import { useEffect, useState } from 'react';
import { AlertTriangle, X, Siren, Phone, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RiskLevel } from '@/types/flood';

interface EmergencyAlertProps {
  isVisible: boolean;
  riskLevel: RiskLevel;
  locationName: string;
  onDismiss: () => void;
}

export default function EmergencyAlert({ isVisible, riskLevel, locationName, onDismiss }: EmergencyAlertProps) {
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isVisible && (riskLevel === 'high' || riskLevel === 'extreme')) {
      setIsShowing(true);
    } else {
      setIsShowing(false);
    }
  }, [isVisible, riskLevel]);

  if (!isShowing) return null;

  const isExtreme = riskLevel === 'extreme';

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in" onClick={onDismiss} />
      
      {/* Alert modal */}
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg mx-4 ${isExtreme ? 'animate-emergency' : ''}`}>
        <div className={`glass-panel p-0 overflow-hidden border-2 ${isExtreme ? 'border-risk-extreme' : 'border-risk-high'}`}>
          {/* Alert header */}
          <div className={`p-4 ${isExtreme ? 'bg-risk-extreme' : 'bg-risk-high'} text-white flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Siren className="w-6 h-6 animate-pulse" />
              <span className="font-bold text-lg">
                {isExtreme ? 'EXTREME EMERGENCY' : 'FLOOD WARNING'}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={onDismiss} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Alert content */}
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full ${isExtreme ? 'bg-risk-extreme/20' : 'bg-risk-high/20'} flex items-center justify-center`}>
                <AlertTriangle className={`w-8 h-8 ${isExtreme ? 'text-risk-extreme' : 'text-risk-high'} animate-pulse`} />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {isExtreme ? '🚨 FLOOD EMERGENCY WARNING' : '⚠️ FLOOD ALERT'}
                </h3>
                <p className="text-muted-foreground">Location: {locationName}</p>
              </div>
            </div>

            <div className={`p-4 rounded-lg ${isExtreme ? 'bg-risk-extreme/10 border border-risk-extreme/30' : 'bg-risk-high/10 border border-risk-high/30'} mb-6`}>
              <p className={`font-medium ${isExtreme ? 'text-risk-extreme' : 'text-risk-high'}`}>
                {isExtreme
                  ? 'EVACUATE IMMEDIATELY! Life-threatening flood conditions detected. Move to higher ground now.'
                  : 'High flood risk detected. Prepare for possible evacuation and monitor official channels.'}
              </p>
            </div>

            {/* Emergency contacts */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Emergency Contacts</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">NDRF Helpline</p>
                    <p className="font-mono font-bold">1078</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/50">
                  <Radio className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Disaster Control</p>
                    <p className="font-mono font-bold">112</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              variant={isExtreme ? 'riskExtreme' : 'riskHigh'}
              size="lg"
              className="w-full mt-6"
              onClick={onDismiss}
            >
              Acknowledge Alert
            </Button>
          </div>
        </div>
      </div>

      {/* Top banner */}
      <div className={`fixed top-0 left-0 right-0 z-40 py-2 px-4 text-center text-white font-medium ${isExtreme ? 'bg-risk-extreme animate-pulse' : 'bg-risk-high'}`}>
        <div className="flex items-center justify-center gap-2">
          <Siren className="w-4 h-4" />
          <span>
            {isExtreme ? 'EMERGENCY: Immediate evacuation required for ' : 'WARNING: Flood alert active for '}
            {locationName}
          </span>
          <Siren className="w-4 h-4" />
        </div>
      </div>
    </>
  );
}
