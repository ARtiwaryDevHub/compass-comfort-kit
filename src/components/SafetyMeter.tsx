import { useState, useEffect } from "react";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SafetyMeterProps {
  score: number; // 0-100
  location?: string;
  className?: string;
}

export const SafetyMeter = ({ score, location = "Current Location", className }: SafetyMeterProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getSafetyLevel = (score: number) => {
    if (score >= 80) return { level: "Safe", color: "safe", icon: CheckCircle };
    if (score >= 60) return { level: "Caution", color: "caution", icon: AlertTriangle };
    return { level: "High Alert", color: "danger", icon: Shield };
  };

  const safetyInfo = getSafetyLevel(score);
  const IconComponent = safetyInfo.icon;

  return (
    <Card className={`p-6 bg-gradient-safety border-0 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Safety Score</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
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