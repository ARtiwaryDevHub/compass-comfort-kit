import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Hospital, Shield, Building } from "lucide-react";
import { LocationDisplay } from "@/components/LocationDisplay";

export const MapSection = () => {
  const nearbyServices = [
    {
      name: "Police Stations",
      icon: Shield,
      count: 3,
      color: "bg-blue-500",
    },
    {
      name: "Hospitals",
      icon: Hospital,
      count: 5,
      color: "bg-green-500",
    },
    {
      name: "Embassy",
      icon: Building,
      count: 1,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/20 to-primary/5">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Location & Map</h1>
        </div>
        <p className="text-muted-foreground">
          Your current location and nearby emergency services
        </p>
      </Card>

      {/* Current Location */}
      <LocationDisplay />

      {/* Map Placeholder */}
      <Card className="p-6">
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-safe/10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Navigation className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Interactive Map
            </h3>
            <p className="text-sm text-muted-foreground">
              Map integration coming soon - Track your location and nearby services
            </p>
          </div>
        </div>
      </Card>

      {/* Nearby Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {nearbyServices.map((service, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`${service.color} p-4 rounded-full`}>
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{service.name}</h3>
                <p className="text-2xl font-bold text-primary">{service.count}</p>
                <p className="text-sm text-muted-foreground">nearby</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View All
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
