import { useState } from "react";
import { SafetyMeter } from "@/components/SafetyMeter";
import { SOSButton } from "@/components/SOSButton";
import { AlertsPanel } from "@/components/AlertsPanel";
import { LocationDisplay } from "@/components/LocationDisplay";
import { MedicalEmergency } from "@/components/MedicalEmergency";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MessageSquare, Users, Compass } from "lucide-react";
import heroImage from "@/assets/hero-safety.jpg";

export const HomeSection = () => {
  const handleSOSPress = () => {
    alert("Emergency services contacted! Help is on the way.");
  };

  const quickAccessItems = [
    {
      icon: Mic,
      label: "Voice Help",
      description: "Speak your emergency",
      color: "primary",
    },
    {
      icon: MessageSquare,
      label: "Text Help",
      description: "Type your message",
      color: "secondary",
    },
    {
      icon: Users,
      label: "Contact Family",
      description: "Alert emergency contacts",
      color: "comfort",
    },
    {
      icon: Compass,
      label: "Find Nearby",
      description: "Police, hospitals, embassies",
      color: "safe",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-48 rounded-2xl overflow-hidden shadow-xl">
        <img 
          src={heroImage} 
          alt="Safe travel with trusted companions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
              Travel Safe, Explore Confidently
            </h1>
            <p className="text-lg opacity-90 drop-shadow">
              Your trusted safety companion for every journey
            </p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Safety Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SafetyMeter />
            <LocationDisplay />
          </div>

          {/* Medical Emergency Section */}
          <MedicalEmergency />

          {/* Alerts Panel */}
          <AlertsPanel />
        </div>

        {/* Right Column - Emergency & Quick Actions */}
        <div className="space-y-6">
          {/* SOS Button */}
          <Card className="p-6 text-center bg-gradient-comfort border-0 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Emergency Assistance
            </h3>
            <SOSButton onPress={handleSOSPress} className="mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">
              Hold for 2 seconds to activate emergency protocol
            </p>
          </Card>

          {/* Quick Access */}
          <Card className="p-6 bg-card border-border shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Quick Access
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickAccessItems.map((item, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex-col space-y-2 hover:bg-primary/10"
                >
                  <item.icon className="h-6 w-6 text-primary" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{item.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>

          {/* Safety Tips */}
          <Card className="p-6 bg-gradient-safety border-0 shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Safety Tips
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  Stay in well-lit, populated areas especially after dark
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  Keep copies of important documents in cloud storage
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-safe rounded-full mt-2"></div>
                <p className="text-muted-foreground">
                  Share your location with trusted contacts regularly
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
