import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  MapPin, 
  Users, 
  AlertTriangle, 
  FileText, 
  Search, 
  Filter, 
  Send,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Wifi,
  Lock,
  Globe
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const { toast } = useToast();

  const systemStats = [
    { label: "Active Tourists", value: "1,247", icon: Users, color: "text-primary" },
    { label: "Active Alerts", value: "23", icon: AlertTriangle, color: "text-caution" },
    { label: "SOS Calls Today", value: "5", icon: Shield, color: "text-emergency" },
    { label: "Digital IDs Issued", value: "3,891", icon: CheckCircle, color: "text-safe" }
  ];

  const recentAlerts = [
    {
      id: "SOS-001",
      type: "SOS",
      tourist: "John Smith (TST-2024-ABC123)",
      location: "Times Square, NYC",
      time: "2 minutes ago",
      status: "active",
      priority: "high"
    },
    {
      id: "GEO-002", 
      type: "Geo-fence Breach",
      tourist: "Maria Garcia (TST-2024-DEF456)",
      location: "Restricted Zone - 5th Ave",
      time: "15 minutes ago",
      status: "investigating",
      priority: "medium"
    },
    {
      id: "ANO-003",
      type: "Anomaly Detection",
      tourist: "David Lee (TST-2024-GHI789)",
      location: "Central Park",
      time: "1 hour ago", 
      status: "resolved",
      priority: "low"
    }
  ];

  const missingPersons = [
    {
      id: "MP-001",
      name: "Sarah Johnson",
      touristId: "TST-2024-JKL012",
      lastLocation: "Brooklyn Bridge",
      lastSeen: "3 hours ago",
      status: "active_search"
    },
    {
      id: "MP-002", 
      name: "Robert Chen",
      touristId: "TST-2024-MNO345",
      lastLocation: "Statue of Liberty",
      lastSeen: "6 hours ago",
      status: "efir_generated"
    }
  ];

  const handleBroadcast = () => {
    if (broadcastMessage.trim()) {
      toast({
        title: "Broadcast Sent",
        description: `Message sent to 1,247 active tourists`,
      });
      setBroadcastMessage("");
    }
  };

  const generateEFIR = (personId: string) => {
    toast({
      title: "E-FIR Generated",
      description: `Electronic FIR created for case ${personId}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-emergency" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Authority Dashboard</h1>
                <p className="text-sm text-muted-foreground">Tourist Safety Monitoring & Incident Response</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 px-2 py-1 bg-safe/10 rounded-full">
                  <Activity className="h-3 w-3 text-safe" />
                  <span className="text-xs text-safe-foreground">System Online</span>
                </div>
                <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
                  <Lock className="h-3 w-3 text-primary" />
                  <span className="text-xs text-primary-foreground">Blockchain Secure</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map & Alerts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Map */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Real-time Tourist Map</h3>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Layers
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <div className="relative h-80 bg-gradient-to-br from-primary/5 to-safe/5 rounded-lg border-2 border-dashed border-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="h-16 w-16 text-primary mx-auto" />
                    <div>
                      <p className="font-semibold text-foreground">Interactive Tourist Heatmap</p>
                      <p className="text-sm text-muted-foreground">Real-time location clustering with risk zones</p>
                    </div>
                    
                    {/* Mock data points */}
                    <div className="flex items-center justify-center space-x-6 mt-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-safe rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Safe Zones (423)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-caution rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">Caution Areas (156)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emergency rounded-full animate-pulse"></div>
                        <span className="text-xs text-muted-foreground">High Risk (23)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recent Alerts */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Recent Alerts</h3>
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Search alerts..." 
                    className="w-48"
                  />
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedAlert === alert.id ? 'border-primary bg-primary/5' : 'border-border hover:border-border/80'
                    }`}
                    onClick={() => setSelectedAlert(alert.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'secondary' : 'outline'}
                        >
                          {alert.type}
                        </Badge>
                        <div>
                          <p className="font-medium text-sm text-foreground">{alert.tourist}</p>
                          <p className="text-xs text-muted-foreground">{alert.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                        <Badge 
                          variant={alert.status === 'active' ? 'destructive' : alert.status === 'investigating' ? 'secondary' : 'outline'}
                          className="text-xs"
                        >
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Controls & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  View All Digital IDs
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Blockchain Verification
                </Button>
              </div>
            </Card>

            {/* Broadcast Messages */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Broadcast Alert</h3>
              <div className="space-y-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tourists</SelectItem>
                    <SelectItem value="times_square">Times Square Area</SelectItem>
                    <SelectItem value="central_park">Central Park Area</SelectItem>
                    <SelectItem value="brooklyn">Brooklyn Area</SelectItem>
                  </SelectContent>
                </Select>
                
                <Input
                  placeholder="Enter message..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                />
                
                <Button onClick={handleBroadcast} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Broadcast
                </Button>
              </div>
            </Card>

            {/* Missing Persons */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Missing Persons</h3>
              <div className="space-y-3">
                {missingPersons.map((person) => (
                  <div key={person.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-sm text-foreground">{person.name}</p>
                      <Badge 
                        variant={person.status === 'active_search' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {person.status === 'active_search' ? 'Active Search' : 'E-FIR Generated'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{person.touristId}</p>
                    <p className="text-xs text-muted-foreground mb-2">
                      Last seen: {person.lastLocation} • {person.lastSeen}
                    </p>
                    {person.status === 'active_search' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => generateEFIR(person.id)}
                        className="w-full"
                      >
                        Generate E-FIR
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* System Health */}
            <Card className="p-6 bg-safe/5 border-safe/20">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-4 w-4 text-safe" />
                    <span className="text-sm text-foreground">Network Status</span>
                  </div>
                  <Badge variant="outline" className="text-safe border-safe">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-safe" />
                    <span className="text-sm text-foreground">Blockchain Sync</span>
                  </div>
                  <Badge variant="outline" className="text-safe border-safe">Synced</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-safe" />
                    <span className="text-sm text-foreground">API Services</span>
                  </div>
                  <Badge variant="outline" className="text-safe border-safe">Operational</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;