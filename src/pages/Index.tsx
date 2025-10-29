import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HomeSection } from "@/components/sections/HomeSection";
import { MapSection } from "@/components/sections/MapSection";
import { SafetySection } from "@/components/sections/SafetySection";
import { HelpSection } from "@/components/sections/HelpSection";
import { EmergencySection } from "@/components/sections/EmergencySection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderSection = () => {
    switch (activeTab) {
      case "home":
        return <HomeSection />;
      case "map":
        return <MapSection />;
      case "safety":
        return <SafetySection />;
      case "help":
        return <HelpSection />;
      case "emergency":
        return <EmergencySection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {renderSection()}
      </main>
    </div>
  );
};

export default Index;
