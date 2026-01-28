import { Location, HistoricalFloodData } from '@/types/flood';

export const locations: Location[] = [
  { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', historicalRisk: 85 },
  { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', historicalRisk: 78 },
  { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', historicalRisk: 72 },
  { id: 'delhi', name: 'Delhi', state: 'Delhi NCR', historicalRisk: 45 },
  { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', historicalRisk: 55 },
  { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', historicalRisk: 60 },
  { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', historicalRisk: 50 },
  { id: 'pune', name: 'Pune', state: 'Maharashtra', historicalRisk: 48 },
  { id: 'jaipur', name: 'Jaipur', state: 'Rajasthan', historicalRisk: 35 },
  { id: 'lucknow', name: 'Lucknow', state: 'Uttar Pradesh', historicalRisk: 42 },
  { id: 'patna', name: 'Patna', state: 'Bihar', historicalRisk: 88 },
  { id: 'guwahati', name: 'Guwahati', state: 'Assam', historicalRisk: 92 },
  { id: 'kochi', name: 'Kochi', state: 'Kerala', historicalRisk: 75 },
  { id: 'bhubaneswar', name: 'Bhubaneswar', state: 'Odisha', historicalRisk: 70 },
  { id: 'surat', name: 'Surat', state: 'Gujarat', historicalRisk: 65 },
];

export const historicalFloodData: HistoricalFloodData[] = [
  { location: 'mumbai', year: 2023, floodEvents: 8, averageSeverity: 7.2 },
  { location: 'mumbai', year: 2022, floodEvents: 6, averageSeverity: 6.5 },
  { location: 'mumbai', year: 2021, floodEvents: 5, averageSeverity: 5.8 },
  { location: 'chennai', year: 2023, floodEvents: 7, averageSeverity: 8.1 },
  { location: 'chennai', year: 2022, floodEvents: 4, averageSeverity: 5.5 },
  { location: 'chennai', year: 2021, floodEvents: 9, averageSeverity: 7.8 },
  { location: 'kolkata', year: 2023, floodEvents: 5, averageSeverity: 6.0 },
  { location: 'kolkata', year: 2022, floodEvents: 4, averageSeverity: 5.2 },
  { location: 'patna', year: 2023, floodEvents: 10, averageSeverity: 8.5 },
  { location: 'patna', year: 2022, floodEvents: 8, averageSeverity: 7.8 },
  { location: 'guwahati', year: 2023, floodEvents: 12, averageSeverity: 9.0 },
  { location: 'guwahati', year: 2022, floodEvents: 11, averageSeverity: 8.7 },
  { location: 'kochi', year: 2023, floodEvents: 6, averageSeverity: 7.0 },
  { location: 'kochi', year: 2022, floodEvents: 5, averageSeverity: 6.2 },
];
