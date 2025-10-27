import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock, ArrowLeft, Smartphone, Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [require2FA, setRequire2FA] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRequire2FA(true);
    toast({
      title: "Credentials Verified",
      description: "Please enter the 2FA code sent to your device.",
    });
  };

  const handle2FAVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length === 6) {
      toast({
        title: "Authentication Successful",
        description: "Welcome to the Admin Dashboard.",
      });
      navigate("/admin-dashboard");
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return { strength: "weak", color: "text-danger" };
    if (password.length < 10) return { strength: "medium", color: "text-caution" };
    return { strength: "strong", color: "text-safe" };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 text-primary hover:text-primary/80">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-emergency" />
              <div>
                <h1 className="text-xl font-bold text-foreground">SurakshaSetu</h1>
                <p className="text-xs text-muted-foreground">Authority Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-2 py-1 bg-emergency/10 rounded-full">
                <Lock className="h-3 w-3 text-emergency" />
                <span className="text-xs text-emergency-foreground">Secure Access</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {!require2FA ? (
            <Card className="p-8 shadow-xl border-emergency/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emergency/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-emergency" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Authority Login</h2>
                <p className="text-muted-foreground">Secure access for police and emergency services</p>
              </div>

              <Alert className="mb-6 border-emergency/20 bg-emergency/5">
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  This is a restricted access portal for authorized personnel only. 
                  All login attempts are monitored and logged.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username">Username / Badge ID</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="Enter your username or badge ID" 
                    required 
                    className="border-border focus:border-primary"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password" 
                      required 
                      className="pr-10"
                      onChange={(e) => {
                        const strength = getPasswordStrength(e.target.value);
                        // Could show strength indicator here
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button type="submit" className="w-full bg-emergency hover:bg-emergency/90">
                    Login to Authority Portal
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Forgot password? Contact IT Support
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Session timeout: 30 minutes</span>
                  <span>Encryption: AES-256</span>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-8 shadow-xl border-primary/20">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Two-Factor Authentication</h2>
                <p className="text-muted-foreground">Enter the 6-digit code from your authenticator app</p>
              </div>

              <form onSubmit={handle2FAVerification} className="space-y-6">
                <div>
                  <Label htmlFor="otp">Authentication Code</Label>
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="000000"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="text-center text-2xl font-mono tracking-widest"
                    maxLength={6}
                    required 
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Code expires in 30 seconds
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={otpCode.length !== 6}
                >
                  Verify & Continue
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-primary/80"
                    onClick={() => setRequire2FA(false)}
                  >
                    ← Back to login
                  </button>
                </div>
              </form>

              <Alert className="mt-6">
                <Smartphone className="h-4 w-4" />
                <AlertDescription>
                  Can't access your authenticator? Contact your system administrator for backup codes.
                </AlertDescription>
              </Alert>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;