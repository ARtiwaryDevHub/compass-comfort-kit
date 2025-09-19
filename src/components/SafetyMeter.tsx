import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLocation } from "@/contexts/LocationContext";

interface SafetyMeterProps {
  className?: string;
}

export const SafetyMeter = ({ className }: SafetyMeterProps) => {
  const { location, address, isTracking } = useLocation();
  const [animatedScore, setAnimatedScore] = useState(0);
  const [safetyScore, setSafetyScore] = useState(75);

  // Calculate safety score based on Indian location context
  useEffect(() => {
    if (location && address && isTracking) {
      let score = 70; // Base score for India
      
      // Adjust score based on location accuracy
      if (location.accuracy && location.accuracy < 10) score += 15;
      else if (location.accuracy && location.accuracy < 50) score += 10;
      else if (location.accuracy && location.accuracy < 100) score += 5;
      
      // Adjust for major Indian cities (generally safer for tourists)
      const majorCities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
                          "Pune", "Ahmedabad", "Jaipur", "Surat", "Kanpur", "Nagpur", "Lucknow", 
                          "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad"];
      
      if (majorCities.some(city => address.includes(city))) {
        score += 10;
      }
      
      // Adjust for tourist-friendly locations
      const touristAreas = ["Airport", "Hotel", "Mall", "Tourist", "Museum", "Fort", "Palace", 
                           "Temple", "Railway Station", "Bus Stand", "Metro", "Shopping"];
      
      if (touristAreas.some(area => address.toLowerCase().includes(area.toLowerCase()))) {
        score += 8;
      }
      
      // Adjust for Indian states known for tourism
      const touristStates = ["Goa", "Rajasthan", "Kerala", "Himachal Pradesh", "Uttarakhand", 
                            "Tamil Nadu", "Karnataka", "Maharashtra"];
      
      if (touristStates.some(state => address.includes(state))) {
        score += 5;
      }
      
      setSafetyScore(Math.min(Math.max(score, 0), 100));
    }
  }, [location, address, isTracking]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(safetyScore);
    }, 300);
    return () => clearTimeout(timer);
  }, [safetyScore]);

  const getSafetyLevel = (score: number) => {
    if (score >= 80) return { level: "Safe", color: "safe", icon: CheckCircle };
    if (score >= 60) return { level: "Caution", color: "caution", icon: AlertTriangle };
    return { level: "High Alert", color: "danger", icon: Shield };
  };

  const safetyInfo = getSafetyLevel(safetyScore);
  const IconComponent = safetyInfo.icon;

  return (
    <Card className={`p-6 bg-gradient-safety border-0 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Safety Score</h3>
          <p className="text-sm text-muted-foreground">
            {isTracking ? (address || "Loading location...") : "Location tracking disabled"}
          </p>
        </div>
        <IconComponent className={`h-6 w-6 text-${safetyInfo.color}`} />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`text-2xl font-bold text-${safetyInfo.color}`}>
            {Math.round(animatedScore)}%
          </span>
          <span className={`text-sm font-medium px-3 py-1 rounded-full bg-${safetyInfo.color}/20 text-${safetyInfo.color}-foreground`}>
            {safetyInfo.level}
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full bg-${safetyInfo.color} transition-all duration-1000 ease-out rounded-full`}
            style={{ width: `${animatedScore}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Low Risk</span>
          <span>High Risk</span>
        </div>
      </div>
    </Card>
  );
};