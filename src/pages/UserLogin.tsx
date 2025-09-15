import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, User, Mail, Phone, Upload, CheckCircle, ArrowLeft, Lock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isIdVerification, setIsIdVerification] = useState(false);
  const [idType, setIdType] = useState("");
  const [isIdGenerated, setIsIdGenerated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Successful",
      description: "Welcome back to SurakshaSetu!",
    });
    navigate("/dashboard");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsIdVerification(true);
    toast({
      title: "Registration Successful",
      description: "Please upload your ID proof for verification.",
    });
  };

  const handleIdUpload = () => {
    setTimeout(() => {
      setIsIdGenerated(true);
      toast({
        title: "Digital Tourist ID Generated",
        description: "Your digital identity has been created successfully.",
      });
    }, 2000);
  };

  const proceedToDashboard = () => {
    navigate("/dashboard");
  };

  const idTypes = [
    { value: "aadhaar", label: "Aadhaar Card" },
    { value: "passport", label: "Passport" },
    { value: "driving_license", label: "Driving License" },
    { value: "voter_id", label: "Voter ID" },
    { value: "pan_card", label: "PAN Card" }
  ];

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
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">SurakshaSetu</h1>
                <p className="text-xs text-muted-foreground">Tourist Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-safe/10 rounded-full">
              <Lock className="h-3 w-3 text-safe" />
              <span className="text-xs text-safe-foreground">Secure</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {!isIdVerification && !isIdGenerated && (
            <Card className="p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? "Tourist Login" : "Create Account"}
                </h2>
                <p className="text-muted-foreground">
                  {isLogin ? "Access your safety dashboard" : "Join SurakshaSetu for safe travels"}
                </p>
              </div>

              <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-6">
                {!isLogin && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" type="text" placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex">
                        <Select defaultValue="+91">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+91">+91</SelectItem>
                            <SelectItem value="+1">+1</SelectItem>
                            <SelectItem value="+44">+44</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input 
                          id="phone" 
                          type="tel" 
                          placeholder="Phone number" 
                          className="ml-2 flex-1"
                          required 
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" required />
                </div>

                {!isLogin && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" required />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {isLogin ? "Login" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Supported Languages: English, Hindi, Spanish, French</span>
                </div>
              </div>
            </Card>
          )}

          {isIdVerification && !isIdGenerated && (
            <Card className="p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">ID Verification</h2>
                <p className="text-muted-foreground">Upload your identification document for verification</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="idType">Select ID Type</Label>
                  <Select value={idType} onValueChange={setIdType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your ID type" />
                    </SelectTrigger>
                    <SelectContent>
                      {idTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {idType && (
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag & drop your {idTypes.find(t => t.value === idType)?.label} or click to browse
                    </p>
                    <Button variant="outline" onClick={handleIdUpload}>
                      Upload Document
                    </Button>
                  </div>
                )}

                <Alert>
                  <Lock className="h-4 w-4" />
                  <AlertDescription>
                    Your documents are encrypted and stored securely using blockchain technology. 
                    Only authorized personnel can access this information.
                  </AlertDescription>
                </Alert>
              </div>
            </Card>
          )}

          {isIdGenerated && (
            <Card className="p-8 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-safe/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-safe" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Digital Tourist ID Generated</h2>
                <p className="text-muted-foreground">Your digital identity has been successfully created</p>
              </div>

              <div className="space-y-4 mb-8">
                <Card className="p-4 bg-safe/5 border-safe/20">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tourist ID:</span>
                      <span className="font-mono">TST-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Valid Until:</span>
                      <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-safe rounded-full"></div>
                        <span className="text-safe-foreground font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your digital tourist ID is now active and can be used for verification throughout your visit.
                  </AlertDescription>
                </Alert>
              </div>

              <Button onClick={proceedToDashboard} className="w-full">
                Continue to Dashboard
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserLogin;