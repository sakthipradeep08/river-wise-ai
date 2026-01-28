import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Droplets, Lock, User, AlertTriangle } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple auth check (demo purposes)
    if (username.length >= 3 && password.length >= 3) {
      localStorage.setItem('sfas_authenticated', 'true');
      localStorage.setItem('sfas_user', username);
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-risk-high/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Login panel */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-panel p-8 animate-scale-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 mb-4 animate-glow">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-gradient mb-2">Smart Flood Alert System</h1>
            <p className="text-muted-foreground text-sm">AI-Powered Disaster Management Platform</p>
          </div>

          {/* Warning banner */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-risk-high/10 border border-risk-high/30 mb-6">
            <AlertTriangle className="w-5 h-5 text-risk-high flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Authorized personnel only. All access is monitored and logged.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 bg-secondary/50 border-border/50 focus:border-primary input-glow transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-secondary/50 border-border/50 focus:border-primary input-glow transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-risk-extreme/10 border border-risk-extreme/30 text-risk-extreme text-sm animate-fade-in">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="xl"
              variant="glow"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Access Control Panel
                </>
              )}
            </Button>
          </form>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Droplets className="w-4 h-4 text-primary" />
              <span>SFAS v2.0 • National Disaster Response Framework</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
