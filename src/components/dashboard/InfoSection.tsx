import { Brain, BarChart3, Shield, Users, AlertTriangle, CloudRain, Waves, Database } from 'lucide-react';

export default function InfoSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Our system uses advanced machine learning algorithms trained on decades of historical flood data to predict risks with high accuracy.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Monitoring',
      description: 'Continuous monitoring of rainfall, river levels, and environmental sensors across multiple locations for instant alerts.',
    },
    {
      icon: Database,
      title: 'Historical Data Integration',
      description: 'Correlates current conditions with historical flood patterns to provide context-aware predictions.',
    },
    {
      icon: Shield,
      title: 'Proactive Defense',
      description: 'Early warning system enables timely evacuation and resource deployment, saving lives and reducing damage.',
    },
  ];

  const safetyTips = [
    { icon: AlertTriangle, tip: 'Stay informed through official channels and local news' },
    { icon: CloudRain, tip: 'Prepare an emergency kit with essentials for 72 hours' },
    { icon: Waves, tip: 'Know your evacuation routes and designated shelters' },
    { icon: Users, tip: 'Help elderly and disabled neighbors during emergencies' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* How AI Works */}
        <div className="glass-panel p-8 mb-8 animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How Our AI System Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              SFAS combines cutting-edge artificial intelligence with comprehensive environmental data 
              to provide accurate, timely flood risk assessments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Flood Forecasting Matters */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="glass-panel p-8">
            <h3 className="text-2xl font-bold mb-4">Why Flood Forecasting Matters</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Floods are among the most destructive natural disasters, causing billions in damages 
                and claiming thousands of lives annually worldwide.
              </p>
              <p>
                Early warning systems like SFAS can increase evacuation lead time by 24-48 hours, 
                dramatically reducing casualties and enabling better resource allocation.
              </p>
              <p>
                Our AI-driven approach analyzes multiple data streams simultaneously, identifying 
                patterns that human operators might miss, ensuring no warning sign goes unnoticed.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">85%</p>
                <p className="text-xs text-muted-foreground">Prediction Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-risk-low">48h</p>
                <p className="text-xs text-muted-foreground">Advance Warning</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-risk-medium">15+</p>
                <p className="text-xs text-muted-foreground">Cities Monitored</p>
              </div>
            </div>
          </div>

          {/* Safety Tips */}
          <div className="glass-panel p-8">
            <h3 className="text-2xl font-bold mb-4">Community Safety Guidelines</h3>
            <div className="space-y-4">
              {safetyTips.map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                  <div className="w-10 h-10 rounded-lg bg-risk-medium/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-risk-medium" />
                  </div>
                  <p className="text-sm">{item.tip}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
              <p className="text-sm text-center">
                <span className="font-semibold text-primary">Remember:</span> In case of emergency, 
                always follow instructions from local authorities and emergency services.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            SFAS - Smart Flood Alert System | Powered by AI & Real-Time Environmental Data
          </p>
          <p className="mt-2">
            National Disaster Response Framework • Emergency Management Platform
          </p>
        </div>
      </div>
    </section>
  );
}
