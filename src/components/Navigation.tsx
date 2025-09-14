import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  MapPin, 
  Shield, 
  MessageCircle, 
  Settings, 
  Globe,
  Phone,
  Heart
} from "lucide-react";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home, badge: null },
    { id: "map", label: "Map", icon: MapPin, badge: null },
    { id: "safety", label: "Safety", icon: Shield, badge: "3" },
    { id: "help", label: "Help", icon: MessageCircle, badge: null },
    { id: "emergency", label: "Emergency", icon: Phone, badge: null },
  ];

  const quickActions = [
    { id: "translate", label: "Translate", icon: Globe },
    { id: "medical", label: "Medical", icon: Heart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className={`bg-card border-b border-border shadow-sm ${className}`}>
      {/* Main Navigation */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-1">
          <div className="flex items-center space-x-2 mr-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold text-foreground">SurakshaSetu</h1>
              <p className="text-xs text-muted-foreground">Your safety companion</p>
            </div>
          </div>
          
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(item.id)}
              className={`relative h-auto py-2 px-3 flex-col ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-emergency text-emergency-foreground"
                >
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-1">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              size="sm"
              className="h-auto py-2 px-3 flex-col text-muted-foreground hover:text-foreground"
            >
              <action.icon className="h-4 w-4 mb-1" />
              <span className="text-xs">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gradient-comfort border-t border-border/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-safe rounded-full animate-pulse-safe"></div>
              <span className="text-safe-foreground font-medium">Connected</span>
            </div>
            <span className="text-muted-foreground">Last updated: Just now</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-muted-foreground">
              Emergency contacts: <span className="font-medium text-foreground">3 active</span>
            </span>
            <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
              View All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};