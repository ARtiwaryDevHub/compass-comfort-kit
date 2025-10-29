import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Package, Bandage, Pill, Thermometer, Heart, AlertCircle, Mic, MicOff, ChevronDown, Stethoscope, Phone } from "lucide-react";
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

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const MedicalEmergency = ({ className }: MedicalEmergencyProps) => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const conversationEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: message.trim() };
    setConversation(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("medical-chat", {
        body: { messages: [...conversation, userMessage] }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = { role: "assistant", content: data.response };
      setConversation(prev => [...prev, assistantMessage]);
      
      // Scroll to bottom
      setTimeout(() => {
        conversationEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get medical assistance. Please try again.",
        variant: "destructive"
      });
      // Remove the user message if there was an error
      setConversation(prev => prev.slice(0, -1));
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
    <Card className={`bg-card border-border shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="p-2 bg-emergency/10 rounded-lg">
            <Heart className="h-6 w-6 text-emergency animate-pulse" />
          </div>
          Medical Emergency Assistance
        </CardTitle>
        <CardDescription className="text-base">
          Get AI-powered first aid guidance and emergency assistance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {/* AI Emergency Chat Section */}
          <AccordionItem value="ai-assistant" className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Stethoscope className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-semibold">Emergency AI Assistant</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
              {/* Conversation Display */}
              {conversation.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto space-y-3 mb-3 p-3 bg-background rounded-lg border border-border">
                  {conversation.map((msg, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg ${
                        msg.role === "user" 
                          ? "bg-primary/10 border border-primary/20 ml-8" 
                          : "bg-muted border border-border mr-8"
                      } animate-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div className="flex items-start gap-2">
                        <div className={`p-1 rounded-full ${msg.role === "user" ? "bg-primary" : "bg-emergency"}`}>
                          {msg.role === "user" ? (
                            <AlertCircle className="h-3 w-3 text-white" />
                          ) : (
                            <Stethoscope className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold mb-1 text-foreground">
                            {msg.role === "user" ? "You" : "AI Assistant"}
                          </p>
                          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={conversationEndRef} />
                </div>
              )}

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  placeholder={conversation.length > 0 ? "Add more details or ask a follow-up question..." : "Describe your emergency (e.g., 'burn', 'choking', 'chest pain')..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading || isRecording || isTranscribing}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
                <Button 
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading || isTranscribing}
                  size="icon"
                  variant={isRecording ? "destructive" : "secondary"}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {isTranscribing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isRecording ? (
                    <MicOff className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  onClick={handleSendMessage} 
                  disabled={isLoading || !message.trim() || isRecording || isTranscribing}
                  size="icon"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              
              {isRecording && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg border border-destructive/20 animate-in fade-in duration-200">
                  <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  <p className="text-xs text-foreground font-medium">Recording... Click mic to stop</p>
                </div>
              )}
              
              {isTranscribing && (
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in duration-200">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-xs text-foreground font-medium">Transcribing your message...</p>
                </div>
              )}
              
              {isLoading && (
                <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20 animate-in fade-in duration-200">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-xs text-foreground font-medium">Getting AI assistance...</p>
                </div>
              )}
              
              {conversation.length === 0 && !isLoading && !isRecording && !isTranscribing && (
                <div className="p-3 bg-emergency/5 rounded-lg border border-emergency/20">
                  <p className="text-xs text-muted-foreground">
                    ⚠️ For life-threatening emergencies, call <strong className="text-emergency">112</strong> (National Emergency) or <strong className="text-emergency">102</strong> (Ambulance) immediately
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* First Aid Kit Section */}
          <AccordionItem value="first-aid" className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-safe/10 rounded-lg group-hover:bg-safe/20 transition-colors">
                  <Package className="h-5 w-5 text-safe" />
                </div>
                <span className="text-sm font-semibold">Essential First Aid Kit</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 gap-3">
                {firstAidKit.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-muted rounded-lg border border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 cursor-pointer group hover:scale-[1.02]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 p-2 bg-background rounded-lg group-hover:bg-primary/10 transition-colors">
                        <item.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
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
          <AccordionItem value="emergency-numbers" className="border border-border rounded-lg overflow-hidden hover:border-emergency/50 transition-colors">
            <AccordionTrigger className="px-4 py-3 hover:bg-muted/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emergency/10 rounded-lg group-hover:bg-emergency/20 transition-colors">
                  <Phone className="h-5 w-5 text-emergency" />
                </div>
                <span className="text-sm font-semibold">India Emergency Contact Numbers</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 space-y-3 animate-in slide-in-from-top-2 duration-300">
              <div className="space-y-3">
                <div className="p-4 bg-emergency/10 border border-emergency/20 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    🇮🇳 National Emergency Services
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center justify-between hover:text-emergency transition-colors">
                      <span>📞 Emergency (All)</span>
                      <strong className="text-emergency">112</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-emergency transition-colors">
                      <span>🚑 Ambulance</span>
                      <strong className="text-emergency">102</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-emergency transition-colors">
                      <span>🚓 Police</span>
                      <strong className="text-emergency">100</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-emergency transition-colors">
                      <span>🚒 Fire</span>
                      <strong className="text-emergency">101</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-emergency transition-colors">
                      <span>🚨 Women Helpline</span>
                      <strong className="text-emergency">1091</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-emergency transition-colors">
                      <span>👶 Child Helpline</span>
                      <strong className="text-emergency">1098</strong>
                    </p>
                  </div>
                </div>
                
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    🏥 Medical Services
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center justify-between hover:text-primary transition-colors">
                      <span>☎️ National Health</span>
                      <strong className="text-primary">1800-180-1104</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-primary transition-colors">
                      <span>🧠 Mental Health</span>
                      <strong className="text-primary">08046110007</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-primary transition-colors">
                      <span>☠️ Poison Control</span>
                      <strong className="text-primary">1800-11-4000</strong>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-safe/10 border border-safe/20 rounded-lg hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    🆘 Tourist Helpline
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-center justify-between hover:text-safe transition-colors">
                      <span>🌍 Tourism 24x7</span>
                      <strong className="text-safe">1800-11-1363</strong>
                    </p>
                    <p className="flex items-center justify-between hover:text-safe transition-colors">
                      <span>📱 Incredible India</span>
                      <strong className="text-safe">1363</strong>
                    </p>
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
