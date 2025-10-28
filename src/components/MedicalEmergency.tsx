import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Package, Bandage, Pill, Thermometer, Heart, AlertCircle, Mic, MicOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Error",
        description: "Failed to access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    setIsTranscribing(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        
        const { data, error } = await supabase.functions.invoke("voice-to-text", {
          body: { audio: base64Audio }
        });

        if (error) throw error;

        setMessage(data.text);
        toast({
          title: "Transcription complete",
          description: "Your voice message has been transcribed.",
        });
      };
    } catch (error) {
      console.error("Transcription error:", error);
      toast({
        title: "Error",
        description: "Failed to transcribe audio. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranscribing(false);
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
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {/* AI Emergency Chat Section */}
          <AccordionItem value="ai-assistant">
            <AccordionTrigger className="text-sm font-semibold">
              Emergency AI Assistant
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Describe your emergency (e.g., 'burn', 'choking', 'chest pain')..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading || isRecording || isTranscribing}
                />
                <Button 
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading || isTranscribing}
                  size="icon"
                  variant={isRecording ? "destructive" : "secondary"}
                >
                  {isTranscribing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !message.trim() || isRecording || isTranscribing}
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {isRecording && (
                <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded-lg">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  <p className="text-xs text-foreground">Recording... Click mic to stop</p>
                </div>
              )}
              
              {isTranscribing && (
                <div className="flex items-center gap-2 p-2 bg-primary/10 rounded-lg">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-xs text-foreground">Transcribing your message...</p>
                </div>
              )}
              
              {response && (
                <div className="p-4 bg-muted rounded-lg border border-border">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{response}</p>
                </div>
              )}
              
              {!response && !isLoading && !isRecording && !isTranscribing && (
                <p className="text-xs text-muted-foreground">
                  ⚠️ For life-threatening emergencies, call 112 (National Emergency) or 102 (Ambulance) immediately
                </p>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* First Aid Kit Section */}
          <AccordionItem value="first-aid">
            <AccordionTrigger className="text-sm font-semibold">
              Essential First Aid Kit
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
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
            </AccordionContent>
          </AccordionItem>

          {/* Emergency Numbers Section */}
          <AccordionItem value="emergency-numbers">
            <AccordionTrigger className="text-sm font-semibold">
              India Emergency Contact Numbers
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-3">
                <div className="p-3 bg-emergency/10 border border-emergency/20 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">🇮🇳 National Emergency Services:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>📞 Emergency (All): <strong>112</strong></p>
                    <p>🚑 Ambulance: <strong>102</strong></p>
                    <p>🚓 Police: <strong>100</strong></p>
                    <p>🚒 Fire: <strong>101</strong></p>
                    <p>🚨 Women Helpline: <strong>1091</strong></p>
                    <p>👶 Child Helpline: <strong>1098</strong></p>
                  </div>
                </div>
                
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">🏥 Medical Services:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>☎️ National Health Helpline: <strong>1800-180-1104</strong></p>
                    <p>🧠 Mental Health: <strong>08046110007</strong></p>
                    <p>☠️ Poison Control: <strong>1800-11-4000</strong></p>
                  </div>
                </div>

                <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
                  <p className="text-xs font-medium text-foreground mb-2">🆘 Tourist Helpline:</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>🌍 Ministry of Tourism 24x7: <strong>1800-11-1363</strong></p>
                    <p>📱 Incredible India: <strong>1363</strong></p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
