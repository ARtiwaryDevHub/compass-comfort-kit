import { MapPin, Navigation, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";

interface LocationDisplayProps {
  className?: string;
}

export const LocationDisplay = ({ className }: LocationDisplayProps) => {
  const { location, address, isTracking, isOnline, error, refreshLocation } = useLocation();

  const getAccuracyText = (accuracy?: number) => {
    if (!accuracy) return "Unknown";
    if (accuracy < 10) return "Very High";
    if (accuracy < 50) return "High";
    if (accuracy < 100) return "Medium";
    return "Low";
  };

  return (
    <Card className={`p-4 bg-gradient-trust border-0 shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Your Location</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-safe" />
          ) : (
            <WifiOff className="h-4 w-4 text-danger" />
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshLocation}
            className="h-8 w-8 p-0"
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-foreground">
            {address}
          </p>
          {location && (
            <p className="text-xs text-muted-foreground mt-1">
              {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-safe animate-pulse-safe' : 'bg-muted'}`} />
            <span className="text-muted-foreground">
              {isTracking ? "Live tracking" : "Not tracking"}
            </span>
          </div>
          
          <span className="text-muted-foreground">
            Accuracy: {getAccuracyText(location?.accuracy)}
          </span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {isOnline ? (
            <span className="text-safe-foreground">📍 Connected - Location sharing enabled</span>
          ) : (
            <span className="text-caution-foreground">⚠️ Offline - Using last known location</span>
          )}
        </div>
      </div>
    </Card>
  );
};