import { FloodData, FloodAnalysisResult, RiskLevel } from '@/types/flood';
import { locations, historicalFloodData } from '@/data/locations';

export function analyzeFloodRisk(data: FloodData): FloodAnalysisResult {
  // Rainfall scoring (0-40 points)
  let rainfallPoints = 0;
  if (data.rainfall <= 10) {
    rainfallPoints = 5;
  } else if (data.rainfall <= 30) {
    rainfallPoints = 15;
  } else if (data.rainfall <= 60) {
    rainfallPoints = 28;
  } else if (data.rainfall <= 100) {
    rainfallPoints = 35;
  } else {
    rainfallPoints = 40;
  }

  // Apply rainfall level multiplier
  const rainfallMultipliers = {
    light: 0.6,
    moderate: 0.85,
    heavy: 1.0,
    extreme: 1.2,
  };
  rainfallPoints = Math.min(40, rainfallPoints * rainfallMultipliers[data.rainfallLevel]);

  // River level scoring (0-30 points)
  const riverScores = {
    normal: 5,
    rising: 18,
    danger: 30,
  };
  const riverPoints = riverScores[data.riverLevel];

  // Historical data scoring (0-30 points)
  const location = locations.find(l => l.id === data.location);
  const locationHistory = historicalFloodData.filter(h => h.location === data.location);
  
  let historyPoints = 0;
  if (location) {
    historyPoints = Math.min(30, (location.historicalRisk / 100) * 30);
    
    // Add recent flood events weight
    if (locationHistory.length > 0) {
      const recentEvents = locationHistory[0];
      historyPoints += Math.min(5, recentEvents.floodEvents * 0.5);
    }
  }
  historyPoints = Math.min(30, historyPoints);

  // Calculate total score
  const totalScore = Math.round(rainfallPoints + riverPoints + historyPoints);
  const clampedScore = Math.min(100, Math.max(0, totalScore));

  // Determine risk level
  let riskLevel: RiskLevel;
  if (clampedScore <= 30) {
    riskLevel = 'low';
  } else if (clampedScore <= 55) {
    riskLevel = 'medium';
  } else if (clampedScore <= 75) {
    riskLevel = 'high';
  } else {
    riskLevel = 'extreme';
  }

  // Generate recommendations
  const recommendations = generateRecommendations(riskLevel, data);

  return {
    score: clampedScore,
    riskLevel,
    breakdown: {
      rainfallPoints: Math.round(rainfallPoints),
      riverPoints,
      historyPoints: Math.round(historyPoints),
    },
    recommendations,
  };
}

function generateRecommendations(riskLevel: RiskLevel, data: FloodData): string[] {
  const recommendations: string[] = [];

  switch (riskLevel) {
    case 'low':
      recommendations.push('Continue routine monitoring');
      recommendations.push('Ensure drainage systems are clear');
      recommendations.push('Review emergency contact information');
      break;
    case 'medium':
      recommendations.push('Activate flood monitoring teams');
      recommendations.push('Pre-position water pumps in low-lying areas');
      recommendations.push('Alert local volunteers and first responders');
      recommendations.push('Issue public advisory for preparedness');
      break;
    case 'high':
      recommendations.push('Deploy rescue boats to strategic locations');
      recommendations.push('Open emergency shelters');
      recommendations.push('Evacuate vulnerable populations');
      recommendations.push('Activate full emergency response teams');
      recommendations.push('Coordinate with hospitals and medical teams');
      break;
    case 'extreme':
      recommendations.push('IMMEDIATE EVACUATION of all flood-prone areas');
      recommendations.push('Deploy all available rescue resources');
      recommendations.push('Request military/NDRF assistance');
      recommendations.push('Activate all emergency shelters');
      recommendations.push('Establish emergency medical camps');
      recommendations.push('Coordinate inter-district relief efforts');
      break;
  }

  return recommendations;
}

export function getResourceAllocation(riskLevel: RiskLevel) {
  const resources = {
    low: [
      { id: 'monitors', name: 'Monitoring Teams', icon: 'Eye', quantity: 2, status: 'standby' as const },
      { id: 'alerts', name: 'Alert Systems', icon: 'Bell', quantity: 5, status: 'available' as const },
    ],
    medium: [
      { id: 'pumps', name: 'Water Pumps', icon: 'Droplets', quantity: 10, status: 'deployed' as const },
      { id: 'volunteers', name: 'Volunteer Teams', icon: 'Users', quantity: 50, status: 'standby' as const },
      { id: 'vehicles', name: 'Emergency Vehicles', icon: 'Truck', quantity: 8, status: 'available' as const },
      { id: 'medics', name: 'Medical Units', icon: 'Stethoscope', quantity: 5, status: 'standby' as const },
    ],
    high: [
      { id: 'boats', name: 'Rescue Boats', icon: 'Ship', quantity: 25, status: 'deployed' as const },
      { id: 'shelters', name: 'Emergency Shelters', icon: 'Home', quantity: 15, status: 'deployed' as const },
      { id: 'teams', name: 'NDRF Teams', icon: 'Shield', quantity: 5, status: 'deployed' as const },
      { id: 'helicopters', name: 'Rescue Helicopters', icon: 'Plane', quantity: 3, status: 'standby' as const },
      { id: 'relief', name: 'Relief Supplies', icon: 'Package', quantity: 1000, status: 'deployed' as const },
      { id: 'medics', name: 'Medical Teams', icon: 'Stethoscope', quantity: 20, status: 'deployed' as const },
    ],
    extreme: [
      { id: 'boats', name: 'Rescue Boats', icon: 'Ship', quantity: 50, status: 'deployed' as const },
      { id: 'helicopters', name: 'Rescue Helicopters', icon: 'Plane', quantity: 8, status: 'deployed' as const },
      { id: 'shelters', name: 'Emergency Shelters', icon: 'Home', quantity: 30, status: 'deployed' as const },
      { id: 'teams', name: 'NDRF/Military Teams', icon: 'Shield', quantity: 15, status: 'deployed' as const },
      { id: 'relief', name: 'Relief Supplies', icon: 'Package', quantity: 5000, status: 'deployed' as const },
      { id: 'medics', name: 'Medical Teams', icon: 'Stethoscope', quantity: 50, status: 'deployed' as const },
      { id: 'food', name: 'Food Distribution Centers', icon: 'Utensils', quantity: 20, status: 'deployed' as const },
      { id: 'power', name: 'Mobile Power Units', icon: 'Zap', quantity: 15, status: 'deployed' as const },
    ],
  };

  return resources[riskLevel];
}
