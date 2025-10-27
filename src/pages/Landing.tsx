import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Lock, MapPin, Smartphone, Globe } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import heroImage from "@/assets/hero-safety.jpg";

const Landing = () => {
  const features = [
    {
      icon: Shield,
      title: "Real-time Safety Monitoring",
      description: "Live location tracking with intelligent risk assessment"
    },
    {
      icon: Lock,
      title: "Blockchain Security",
      description: "Tamper-proof data protection with transparent verification"
    },
    {
      icon: MapPin,
      title: "Geo-fencing Alerts",
      description: "Automatic notifications for restricted or unsafe areas"
    },
    {
      icon: Smartphone,
      title: "Digital Tourist ID",
      description: "Secure digital identity for seamless verification"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">SurakshaSetu</h1>
                <p className="text-sm text-muted-foreground">Smart Tourist Safety System</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-3 py-1 bg-safe/10 rounded-full">
                <Lock className="h-4 w-4 text-safe" />
                <span className="text-xs font-medium text-safe-foreground">Blockchain Secured</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl mb-12">
          <img 
            src={heroImage} 
            alt="Smart Tourist Safety Monitoring System"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="text-white max-w-2xl">
              <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">
                Smart Tourist Safety Monitoring & Incident Response System
              </h2>
              <p className="text-xl opacity-95 drop-shadow">
                Ensuring tourist safety through real-time monitoring, blockchain security, and rapid incident response
              </p>
            </div>
          </div>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="p-8 hover:shadow-xl transition-all duration-300 bg-gradient-comfort border-0">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Tourist Access</h3>
                <p className="text-muted-foreground mb-6">
                  Access your digital tourist ID, safety monitoring, emergency assistance, and real-time alerts
                </p>
              </div>
              <Link to="/user-login">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Tourist Login
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all duration-300 bg-gradient-safety border-0">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-emergency/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-10 w-10 text-emergency" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Authority Access</h3>
                <p className="text-muted-foreground mb-6">
                  Monitor tourist safety, manage incidents, access digital IDs, and coordinate emergency response
                </p>
              </div>
              <Link to="/admin-login">
                <Button size="lg" variant="destructive" className="w-full">
                  Authority Login
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">System Features</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology ensuring comprehensive tourist safety and efficient incident management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="max-w-4xl mx-auto mt-16">
          <Card className="p-6 bg-safe/5 border-safe/20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-safe" />
                <Globe className="h-5 w-5 text-safe" />
              </div>
              <div>
                <h4 className="font-semibold text-safe-foreground mb-1">Blockchain-Secured Data Integrity</h4>
                <p className="text-sm text-muted-foreground">
                  All tourist data and incident reports are secured using blockchain technology, ensuring transparency, 
                  immutability, and trust in the system. Your information is protected with enterprise-grade security.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Landing;