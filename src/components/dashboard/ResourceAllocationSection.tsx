import { Ship, Home, Shield, Plane, Package, Stethoscope, Users, Truck, Eye, Bell, Droplets, Utensils, Zap } from 'lucide-react';
import { RiskLevel, Resource } from '@/types/flood';
import { getResourceAllocation } from '@/lib/floodAnalysis';

interface ResourceAllocationSectionProps {
  riskLevel: RiskLevel | null;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Ship, Home, Shield, Plane, Package, Stethoscope, Users, Truck, Eye, Bell, Droplets, Utensils, Zap,
};

const statusColors = {
  available: 'bg-risk-low/20 text-risk-low border-risk-low/30',
  deployed: 'bg-primary/20 text-primary border-primary/30',
  standby: 'bg-risk-medium/20 text-risk-medium border-risk-medium/30',
};

export default function ResourceAllocationSection({ riskLevel }: ResourceAllocationSectionProps) {
  if (!riskLevel) return null;

  const resources = getResourceAllocation(riskLevel);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="glass-panel p-8 animate-slide-up">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Rescue Resource Allocation</h2>
              <p className="text-muted-foreground">
                Deployed resources based on {riskLevel.toUpperCase()} risk assessment
              </p>
            </div>
          </div>

          {/* Resource cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resources.map((resource, index) => {
              const Icon = iconMap[resource.icon] || Package;
              return (
                <div
                  key={resource.id}
                  className="glass-panel p-5 hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusColors[resource.status]}`}>
                      {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold mb-1">{resource.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary">{resource.quantity}</span>
                    <span className="text-muted-foreground text-sm">units</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Deployed: Ready for operation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-risk-medium" />
              <span className="text-muted-foreground">Standby: Prepared for deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-risk-low" />
              <span className="text-muted-foreground">Available: In reserve</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
