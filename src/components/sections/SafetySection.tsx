import { Card } from "@/components/ui/card";
import { SafetyMeter } from "@/components/SafetyMeter";
import { Shield, AlertTriangle, CheckCircle, Info } from "lucide-react";

export const SafetySection = () => {
  const safetyGuidelines = [
    {
      category: "Personal Safety",
      icon: Shield,
      color: "bg-blue-500",
      tips: [
        "Always inform someone about your travel plans",
        "Keep emergency contacts saved and easily accessible",
        "Avoid isolated areas, especially after dark",
        "Trust your instincts - if something feels wrong, leave",
      ],
    },
    {
      category: "Document Safety",
      icon: CheckCircle,
      color: "bg-green-500",
      tips: [
        "Keep digital copies of important documents",
        "Store physical documents in hotel safe",
        "Have embassy contact information ready",
        "Keep separate copies of passport and visa",
      ],
    },
    {
      category: "Health & Medical",
      icon: AlertTriangle,
      color: "bg-red-500",
      tips: [
        "Carry basic first aid kit",
        "Know location of nearest hospitals",
        "Keep list of allergies and medical conditions",
        "Have travel insurance information accessible",
      ],
    },
    {
      category: "Communication",
      icon: Info,
      color: "bg-purple-500",
      tips: [
        "Keep phone charged at all times",
        "Know local emergency numbers",
        "Share live location with trusted contacts",
        "Have offline maps downloaded",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-safe/20 to-safe/5">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="h-8 w-8 text-safe" />
          <h1 className="text-2xl font-bold text-foreground">Safety Guidelines</h1>
        </div>
        <p className="text-muted-foreground">
          Essential safety tips and best practices for travelers
        </p>
      </Card>

      {/* Safety Score */}
      <SafetyMeter />

      {/* Safety Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyGuidelines.map((guideline, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`${guideline.color} p-3 rounded-lg`}>
                <guideline.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {guideline.category}
              </h3>
            </div>
            <ul className="space-y-3">
              {guideline.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-safe mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Emergency Preparedness */}
      <Card className="p-6 bg-gradient-comfort">
        <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center space-x-2">
          <AlertTriangle className="h-5 w-5 text-emergency" />
          <span>Emergency Preparedness Checklist</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Emergency contacts list saved",
            "Travel insurance active",
            "Local emergency numbers known",
            "First aid kit packed",
            "Medications with prescriptions",
            "Important documents copied",
            "Location sharing enabled",
            "Battery bank charged",
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-safe" />
              <span className="text-sm text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
