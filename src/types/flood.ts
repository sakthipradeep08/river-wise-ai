export type RainfallLevel = 'light' | 'moderate' | 'heavy' | 'extreme';
export type RiverLevel = 'normal' | 'rising' | 'danger';
export type RiskLevel = 'low' | 'medium' | 'high' | 'extreme';

export interface FloodData {
  location: string;
  rainfall: number;
  rainfallLevel: RainfallLevel;
  riverLevel: RiverLevel;
}

export interface FloodAnalysisResult {
  score: number;
  riskLevel: RiskLevel;
  breakdown: {
    rainfallPoints: number;
    riverPoints: number;
    historyPoints: number;
  };
  recommendations: string[];
}

export interface HistoricalFloodData {
  location: string;
  year: number;
  floodEvents: number;
  averageSeverity: number;
}

export interface Resource {
  id: string;
  name: string;
  icon: string;
  quantity: number;
  status: 'available' | 'deployed' | 'standby';
}

export interface Location {
  id: string;
  name: string;
  state: string;
  historicalRisk: number;
}
