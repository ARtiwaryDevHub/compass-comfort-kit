import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "@/contexts/LocationContext";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapSectionProps {
  className?: string;
}

export const MapSection = ({ className }: MapSectionProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const { location } = useLocation();
  const [mapboxToken, setMapboxToken] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isMapReady) return;

    try {
      mapboxgl.accessToken = mapboxToken;
      
      const initialCenter: [number, number] = location 
        ? [location.longitude, location.latitude]
        : [78.9629, 20.5937]; // Center of India as default

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: initialCenter,
        zoom: 13,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      setIsMapReady(true);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      map.current?.remove();
      setIsMapReady(false);
    };
  }, [mapboxToken]);

  useEffect(() => {
    if (!map.current || !isMapReady || !location) return;

    if (marker.current) {
      marker.current.setLngLat([location.longitude, location.latitude]);
    } else {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.width = '30px';
      el.style.height = '30px';
      el.style.borderRadius = '50%';
      el.style.backgroundColor = 'hsl(var(--emergency))';
      el.style.border = '3px solid white';
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';

      marker.current = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .addTo(map.current);
    }

    map.current.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 15,
      duration: 1000
    });
  }, [location, isMapReady]);

  const handleCenterOnLocation = () => {
    if (map.current && location) {
      map.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 16,
        duration: 1500
      });
    }
  };

  return (
    <Card className={`relative bg-card border-border shadow-lg overflow-hidden ${className}`}>
      {!mapboxToken ? (
        <div className="h-64 p-6 flex flex-col items-center justify-center space-y-4">
          <MapPin className="h-12 w-12 text-muted-foreground" />
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-foreground">Enable Interactive Map</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to view the interactive map
            </p>
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline"
            >
              Get a free token from Mapbox →
            </a>
          </div>
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="max-w-md"
          />
        </div>
      ) : (
        <>
          <div className="absolute top-4 right-4 z-10">
            <Button 
              variant="secondary" 
              size="sm" 
              className="shadow-md"
              onClick={handleCenterOnLocation}
              disabled={!location}
            >
              <Navigation className="h-4 w-4 mr-2" />
              My Location
            </Button>
          </div>

          <div ref={mapContainer} className="h-64 w-full" />
        </>
      )}
    </Card>
  );
};