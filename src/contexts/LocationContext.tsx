import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface LocationContextType {
  location: LocationData | null;
  address: string;
  isTracking: boolean;
  isOnline: boolean;
  error: string | null;
  refreshLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider = ({ children }: LocationProviderProps) => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [address, setAddress] = useState<string>("Locating...");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      // Use India-specific parameters for better accuracy
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=en&countrycodes=in&limit=1`
      );
      const data = await response.json();
      
      if (data && data.display_name) {
        const address = data.address;
        let formattedAddress = "";
        
        if (address) {
          const parts = [];
          
          // India-specific address formatting
          if (address.house_number) parts.push(address.house_number);
          if (address.road || address.street) parts.push(address.road || address.street);
          if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
          if (address.village || address.town || address.city) parts.push(address.village || address.town || address.city);
          if (address.county) parts.push(address.county);
          if (address.state_district && address.state_district !== address.state) parts.push(address.state_district);
          if (address.state) parts.push(address.state);
          if (address.postcode) parts.push(address.postcode);
          
          formattedAddress = parts.length > 0 ? parts.join(", ") : data.display_name;
        } else {
          formattedAddress = data.display_name;
        }
        
        setAddress(formattedAddress);
        setError(null);
      } else {
        setAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      setError("Failed to fetch address");
    }
  };

  const refreshLocation = () => {
    if ("geolocation" in navigator) {
      setAddress("Updating location...");
      setError(null);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          
          setLocation(newLocation);
          setIsTracking(true);
          reverseGeocode(newLocation.latitude, newLocation.longitude);
        },
        (error) => {
          console.error("Location refresh error:", error);
          setAddress("Unable to update location");
          setError(error.message);
          setIsTracking(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000 
        }
      );
    }
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (location && !address.includes(",")) {
        reverseGeocode(location.latitude, location.longitude);
      }
    };
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [location, address]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };
          
          setLocation(newLocation);
          setIsTracking(true);
          setError(null);
          reverseGeocode(newLocation.latitude, newLocation.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setAddress("Location unavailable");
          setError(error.message);
          setIsTracking(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setAddress("Geolocation not supported");
      setError("Geolocation is not supported by this browser");
    }
  }, []);

  const value = {
    location,
    address,
    isTracking,
    isOnline,
    error,
    refreshLocation,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};