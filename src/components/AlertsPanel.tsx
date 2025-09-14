import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, X, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Alert {
  id: string;
  type: "info" | "warning" | "success";
  title: string;
  message: string;
  timestamp: Date;
  dismissible?: boolean;
}

interface AlertsPanelProps {
  className?: string;
}

export const AlertsPanel = ({ className }: AlertsPanelProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "success",
      title: "Safe Zone",
      message: "You've entered a well-monitored tourist area with 24/7 security.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      dismissible: true,
    },
    {
      id: "2",
      type: "info",
      title: "Weather Update",
      message: "Light rain expected in 2 hours. Consider indoor activities.",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      dismissible: true,
    },
    {
      id: "3",
      type: "warning",
      title: "Crowded Area",
      message: "High pedestrian traffic detected. Stay alert for pickpockets.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      dismissible: true,
    },
  ]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "success":
        return CheckCircle;
      case "warning":
        return AlertTriangle;
      case "info":
      default:
        return Info;
    }
  };

  const getAlertColors = (type: Alert["type"]) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-safe/20",
          border: "border-safe/30",
          icon: "text-safe",
          text: "text-safe-foreground",
        };
      case "warning":
        return {
          bg: "bg-caution/20",
          border: "border-caution/30",
          icon: "text-caution-foreground",
          text: "text-caution-foreground",
        };
      case "info":
      default:
        return {
          bg: "bg-primary/20",
          border: "border-primary/30",
          icon: "text-primary",
          text: "text-primary-foreground",
        };
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <Card className={`p-4 bg-card border-border shadow-lg ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Safety Alerts</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Live Updates
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>All clear! No active alerts.</p>
          </div>
        ) : (
          alerts.map((alert, index) => {
            const IconComponent = getAlertIcon(alert.type);
            const colors = getAlertColors(alert.type);
            
            return (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${colors.bg} ${colors.border} animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <IconComponent className={`h-5 w-5 mt-0.5 ${colors.icon}`} />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium ${colors.text}`}>
                        {alert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {alert.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {formatTimestamp(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                  
                  {alert.dismissible && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};