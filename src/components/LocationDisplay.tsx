import { useState, useEffect } from "react";
import { MapPin, Navigation, Wifi, WifiOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LocationDisplayProps {
  className?: string;
}

export const LocationDisplay = ({ className }: LocationDisplayProps) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
    accuracy?: number;
  } | null>(null);
  const [address, setAddress] = useState<string>("Locating...");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isTracking, setIsTracking] = useState(false);

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=en`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        // Format address for Indian context
        const address = data.address;
        let formattedAddress = "";
        
        if (address) {
          const parts = [];
          if (address.road || address.street) parts.push(address.road || address.street);
          if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
          if (address.city || address.town || address.village) parts.push(address.city || address.town || address.village);
          if (address.state_district) parts.push(address.state_district);
          if (address.state) parts.push(address.state);
          if (address.postcode) parts.push(address.postcode);
          
          formattedAddress = parts.length > 0 ? parts.join(", ") : data.display_name;
        } else {
          formattedAddress = data.display_name;
        }
        
        setAddress(formattedAddress);
      } else {
        setAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    }
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setIsTracking(true);
          
          // Real reverse geocoding using Nominatim (OpenStreetMap)
          reverseGeocode(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setAddress("Location unavailable");
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setAddress("Geolocation not supported");
    }
  }, []);

  const getAccuracyText = (accuracy?: number) => {
    if (!accuracy) return "Unknown";
    if (accuracy < 10) return "Very High";
    if (accuracy < 50) return "High";
    if (accuracy < 100) return "Medium";
    return "Low";
  };

  const refreshLocation = () => {
    if ("geolocation" in navigator) {
      setAddress("Updating location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          
          // Real reverse geocoding for updated location
          reverseGeocode(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Location refresh error:", error);
          setAddress("Unable to update location");
        },
        { enableHighAccuracy: true }
      );
    }
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