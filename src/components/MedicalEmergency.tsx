import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Package, Bandage, Pill, Thermometer, Heart, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MedicalEmergencyProps {
  className?: string;
}

interface FirstAidItem {
  icon: any;
  name: string;
  usage: string;
  priority: "critical" | "important" | "useful";
}

const firstAidKit: FirstAidItem[] = [
  {
    icon: Bandage,
    name: "Adhesive Bandages",
    usage: "Clean wound, apply directly to minor cuts and scrapes. Change daily.",
    priority: "critical"
  },
  {
    icon: Heart,
    name: "CPR Mask",
    usage: "For rescue breathing. Place over victim's mouth/nose, create seal, breathe normally.",
    priority: "critical"
  },
  {
    icon: AlertCircle,
    name: "Antiseptic Wipes",
    usage: "Clean wounds before bandaging. Wipe from center outward in circular motion.",
    priority: "important"
  },
  {
    icon: Pill,
    name: "Pain Relievers",
    usage: "For headaches, fever. Follow package instructions. Adults: 2 tablets every 4-6 hours.",
    priority: "important"
  },
  {
    icon: Thermometer,
    name: "Digital Thermometer",
    usage: "Place under tongue for 1 min. Normal: 97-99°F (36-37°C). >100.4°F seek medical help.",
    priority: "important"
  },
  {
    icon: Package,
    name: "Gauze Pads & Tape",
    usage: "For larger wounds. Apply gauze to wound, secure with tape. Apply pressure if bleeding.",
    priority: "critical"
  }
];

export const MedicalEmergency = ({ className }: MedicalEmergencyProps) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setResponse("");

    try {
      const { data, error } = await supabase.functions.invoke("medical-chat", {
        body: { message }
      });

      if (error) throw error;

      setResponse(data.response);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get medical assistance. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "destructive";
      case "important": return "default";
      case "useful": return "secondary";
      default: return "default";
    }
  };

  return (
    <Card className={`bg-card border-border shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-emergency" />
          Medical Emergency Assistance
        </CardTitle>
        <CardDescription>
          Get AI-powered first aid guidance and emergency assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* AI Emergency Chat */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Emergency AI Assistant</h4>
          <div className="flex gap-2">
            <Input
              placeholder="Describe your emergency (e.g., 'burn', 'choking', 'chest pain')..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !message.trim()}
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {response && (
            <div className="p-4 bg-muted rounded-lg border border-border">
              <p className="text-sm text-foreground whitespace-pre-wrap">{response}</p>
            </div>
          )}
          
          {!response && !isLoading && (
            <p className="text-xs text-muted-foreground">
              ⚠️ For life-threatening emergencies, call 911 (US) or 112 (EU) immediately
            </p>
          )}
        </div>

        {/* First Aid Kit Suggestions */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-foreground">Essential First Aid Kit</h4>
          <div className="grid grid-cols-1 gap-3">
            {firstAidKit.map((item, index) => (
              <div key={index} className="p-3 bg-muted rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.name}</span>
                      <Badge variant={getPriorityColor(item.priority)} className="text-xs">
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.usage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="p-3 bg-emergency/10 border border-emergency/20 rounded-lg">
          <p className="text-xs font-medium text-foreground mb-1">Emergency Numbers:</p>
          <p className="text-xs text-muted-foreground">
            US: 911 • EU: 112 • UK: 999 • Australia: 000 • India: 112
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
