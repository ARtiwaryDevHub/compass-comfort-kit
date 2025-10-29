import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, 
  MapPin, 
  Shield, 
  MessageCircle, 
  Settings, 
  Globe,
  Phone,
  Heart,
  Menu,
  X
} from "lucide-react";

interface NavigationProps {
  className?: string;
}

export const Navigation = ({ className }: NavigationProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

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

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`bg-card border-b border-border shadow-sm ${className}`}>
      {/* Main Navigation */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
          <div>
            <h1 className="text-base md:text-lg font-bold text-foreground">SurakshaSetu</h1>
            <p className="text-[10px] md:text-xs text-muted-foreground">Your safety companion</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <div className="flex items-center space-x-1">
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
              <ThemeToggle />
            </div>
          </>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {/* Navigation Items */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-muted-foreground px-2">Navigation</h3>
                    {navItems.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeTab === item.id ? "default" : "ghost"}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full justify-start ${
                          activeTab === item.id 
                            ? "bg-primary text-primary-foreground" 
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className="ml-auto h-5 w-5 p-0 text-xs bg-emergency text-emergency-foreground"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2 border-t pt-4">
                    <h3 className="text-sm font-semibold text-muted-foreground px-2">Quick Actions</h3>
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                      >
                        <action.icon className="h-4 w-4 mr-3" />
                        <span>{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gradient-comfort border-t border-border/50">
        <div className="flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-safe rounded-full animate-pulse-safe"></div>
              <span className="text-safe-foreground font-medium">Connected</span>
            </div>
            {!isMobile && <span className="text-muted-foreground">Last updated: Just now</span>}
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-muted-foreground">
              Emergency: <span className="font-medium text-foreground">{isMobile ? "3" : "3 active"}</span>
            </span>
            {!isMobile && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                View All
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};