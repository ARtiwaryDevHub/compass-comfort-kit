import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Layers, Search } from "lucide-react";

interface MapSectionProps {
  className?: string;
}

export const MapSection = ({ className }: MapSectionProps) => {
  return (
    <Card className={`relative bg-card border-border shadow-lg overflow-hidden ${className}`}>
      {/* Map Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
        <Button variant="secondary" size="sm" className="h-10 w-10 p-0 shadow-md">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" className="h-10 w-10 p-0 shadow-md">
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <Button variant="secondary" size="sm" className="shadow-md">
          <Navigation className="h-4 w-4 mr-2" />
          My Location
        </Button>
      </div>

      {/* Mock Map Display */}
      <div className="h-64 bg-gradient-to-br from-primary/5 to-secondary/10 relative">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
        
        {/* Mock Streets */}
        <div className="absolute inset-0">
          <div className="absolute top-16 left-8 right-8 h-1 bg-muted rounded"></div>
          <div className="absolute top-32 left-12 right-4 h-1 bg-muted rounded"></div>
          <div className="absolute left-16 top-8 bottom-8 w-1 bg-muted rounded"></div>
          <div className="absolute left-32 top-12 bottom-4 w-1 bg-muted rounded"></div>
        </div>

        {/* Mock Points of Interest */}
        <div className="absolute top-12 left-20">
          <div className="w-3 h-3 bg-safe rounded-full shadow-md animate-pulse-safe"></div>
          <div className="text-xs text-safe-foreground mt-1 font-medium">Safe Zone</div>
        </div>
        
        <div className="absolute top-20 right-16">
          <div className="w-3 h-3 bg-caution rounded-full shadow-md"></div>
          <div className="text-xs text-caution-foreground mt-1 font-medium">Busy Area</div>
        </div>
        
        <div className="absolute bottom-16 left-24">
          <div className="w-3 h-3 bg-primary rounded-full shadow-md"></div>
          <div className="text-xs text-primary-foreground mt-1 font-medium">Tourist Info</div>
        </div>

        {/* Your Location */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-emergency rounded-full shadow-lg border-2 border-white"></div>
            <div className="absolute inset-0 w-4 h-4 bg-emergency rounded-full animate-ping opacity-30"></div>
            <MapPin className="absolute -top-1 -left-1 h-6 w-6 text-emergency-foreground" />
          </div>
          <div className="text-xs text-center mt-2 font-medium text-emergency">You</div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-md">
          <div className="text-xs font-medium text-foreground mb-2">Legend</div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-safe rounded-full"></div>
              <span className="text-muted-foreground">Safe Areas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-caution rounded-full"></div>
              <span className="text-muted-foreground">Caution Zones</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emergency rounded-full"></div>
              <span className="text-muted-foreground">Your Location</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};