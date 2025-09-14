import { useState } from "react";
import { Phone, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SOSButtonProps {
  onPress?: () => void;
  className?: string;
}

export const SOSButton = ({ onPress, className }: SOSButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setIsPressed(true);
    const timer = setTimeout(() => {
      onPress?.();
      setIsPressed(false);
    }, 2000); // 2 second hold
    setPressTimer(timer);
  };

  const handlePressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setIsPressed(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="destructive"
        size="lg"
        className="w-20 h-20 rounded-full bg-emergency hover:bg-emergency/90 text-emergency-foreground shadow-xl transition-all duration-200 relative overflow-hidden group"
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onMouseLeave={handlePressEnd}
      >
        {isPressed ? (
          <PhoneCall className="h-8 w-8 animate-bounce-gentle" />
        ) : (
          <Phone className="h-8 w-8" />
        )}
        
        {/* Pulse animation ring */}
        <div className="absolute inset-0 rounded-full bg-emergency animate-pulse-safe opacity-30 group-hover:opacity-50" />
        
        {/* Progress ring for hold duration */}
        {isPressed && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="35"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="opacity-50"
              strokeDasharray="220"
              strokeDashoffset="220"
              style={{
                animation: "countdown 2s linear forwards",
              }}
            />
          </svg>
        )}
      </Button>
      
      <div className="text-center mt-2">
        <p className="text-xs font-medium text-emergency">SOS</p>
        <p className="text-xs text-muted-foreground">Hold for 2 sec</p>
      </div>
      
      <style>{`
        @keyframes countdown {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};