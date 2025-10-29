import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Heart, Shield, AlertCircle } from "lucide-react";

export const EmergencySection = () => {
  const emergencyContacts = [
    {
      name: "Police Emergency",
      number: "100",
      icon: Shield,
      description: "24/7 Police Assistance",
      color: "bg-blue-500",
    },
    {
      name: "Fire Service",
      number: "101",
      icon: AlertCircle,
      description: "Fire & Rescue Services",
      color: "bg-red-500",
    },
    {
      name: "Ambulance",
      number: "102",
      icon: Heart,
      description: "Medical Emergency",
      color: "bg-green-500",
    },
    {
      name: "Women Helpline",
      number: "1091",
      icon: Shield,
      description: "Women Safety & Support",
      color: "bg-purple-500",
    },
    {
      name: "Child Helpline",
      number: "1098",
      icon: Heart,
      description: "Child Safety Services",
      color: "bg-orange-500",
    },
    {
      name: "Disaster Management",
      number: "108",
      icon: AlertCircle,
      description: "Disaster Emergency",
      color: "bg-yellow-600",
    },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-emergency/20 to-emergency/5 border-emergency/20">
        <div className="flex items-center space-x-3 mb-2">
          <Phone className="h-8 w-8 text-emergency" />
          <h1 className="text-2xl font-bold text-foreground">Emergency Contacts</h1>
        </div>
        <p className="text-muted-foreground">
          Quick access to Indian emergency services - Tap to call instantly
        </p>
      </Card>

      {/* Emergency Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyContacts.map((contact, index) => (
          <Card 
            key={index}
            className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02]"
            style={{ borderLeftColor: contact.color.replace('bg-', '') }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className={`${contact.color} p-3 rounded-lg`}>
                  <contact.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-foreground mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {contact.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      {contact.number}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleCall(contact.number)}
                className="bg-emergency hover:bg-emergency/90 text-white"
                size="sm"
              >
                Call Now
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Information */}
      <Card className="p-6 bg-gradient-comfort">
        <h3 className="font-semibold text-lg mb-4 text-foreground">
          Important Information
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-muted-foreground">
              <strong>Location Sharing:</strong> Emergency services can track your location when you call from a mobile phone.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-muted-foreground">
              <strong>Stay Calm:</strong> Speak clearly and provide your exact location when calling emergency services.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <Phone className="h-5 w-5 text-primary mt-0.5" />
            <p className="text-muted-foreground">
              <strong>Free Calls:</strong> All emergency numbers in India are toll-free and available 24/7.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
