import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Globe, HelpCircle, FileText } from "lucide-react";

export const HelpSection = () => {
  const helpCategories = [
    {
      title: "24/7 Support Helpline",
      icon: Phone,
      description: "Call us anytime for immediate assistance",
      action: "Call: 1800-XXX-XXXX",
      color: "bg-blue-500",
    },
    {
      title: "Live Chat Support",
      icon: MessageCircle,
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      color: "bg-green-500",
    },
    {
      title: "Email Support",
      icon: Mail,
      description: "Send us your queries and we'll respond within 24 hours",
      action: "Send Email",
      color: "bg-purple-500",
    },
    {
      title: "Help Center",
      icon: Globe,
      description: "Browse FAQs and detailed guides",
      action: "Visit Help Center",
      color: "bg-orange-500",
    },
  ];

  const faqs = [
    {
      question: "How do I use the SOS button?",
      answer: "Press and hold the SOS button for 2 seconds to activate emergency protocol. This will alert emergency services and your emergency contacts.",
    },
    {
      question: "How does location tracking work?",
      answer: "Enable location services in your device settings. The app will automatically track and share your location with authorized emergency services when needed.",
    },
    {
      question: "Can I add my own emergency contacts?",
      answer: "Yes, go to Settings > Emergency Contacts to add, edit, or remove your personal emergency contacts.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All your data is encrypted and stored securely. We never share your information without your explicit consent.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/20 to-primary/5">
        <div className="flex items-center space-x-3 mb-2">
          <HelpCircle className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Help & Support</h1>
        </div>
        <p className="text-muted-foreground">
          We're here to help you 24/7. Choose your preferred support method
        </p>
      </Card>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helpCategories.map((category, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className={`${category.color} p-3 rounded-lg`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-foreground">
                  {category.title}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
              <Button className="w-full">
                {category.action}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQs */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border pb-4 last:border-0">
              <h4 className="font-semibold text-foreground mb-2 flex items-start">
                <HelpCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                {faq.question}
              </h4>
              <p className="text-sm text-muted-foreground ml-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Tips */}
      <Card className="p-6 bg-gradient-comfort">
        <h3 className="text-lg font-semibold mb-4 text-foreground">
          Quick Tips
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-muted-foreground">
              Enable notifications to receive real-time safety alerts
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-muted-foreground">
              Update your emergency contacts regularly
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <p className="text-muted-foreground">
              Test the SOS feature before your trip
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
