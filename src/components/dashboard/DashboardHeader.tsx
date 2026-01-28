import { useState, useEffect } from 'react';
import { Bell, MapPin, Clock, Menu, LogOut, Settings, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  selectedLocation: string;
  alertCount?: number;
}

export default function DashboardHeader({ selectedLocation, alertCount = 0 }: DashboardHeaderProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('sfas_authenticated');
    localStorage.removeItem('sfas_user');
    navigate('/');
  };

  const username = localStorage.getItem('sfas_user') || 'Operator';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient">SFAS</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Smart Flood Alert System</p>
            </div>
          </div>
        </div>

        {/* Center section - Stats */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })}
            </span>
            <span className="text-muted-foreground text-sm">
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
          
          {selectedLocation && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50">
              <MapPin className="w-4 h-4 text-risk-high" />
              <span className="text-sm font-medium">{selectedLocation}</span>
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-risk-extreme text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                {alertCount}
              </span>
            )}
          </Button>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50">
            <div className="w-2 h-2 rounded-full bg-risk-low animate-pulse" />
            <span className="text-sm">{username}</span>
          </div>

          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
