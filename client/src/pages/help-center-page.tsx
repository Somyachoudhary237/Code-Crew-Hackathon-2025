import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/faq-accordion";
import { PageTransition } from "@/components/ui/page-transition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  // Set the document title
  useEffect(() => {
    document.title = "Help Center - Calm Corners";
  }, []);

  // Mock FAQ data - in a real application, this would come from an API or CMS
  const generalFAQs = [
    {
      question: "What is Calm Corners?",
      answer: "Calm Corners is a platform that helps you find and book quiet study spaces. We connect students and professionals with libraries, cafes, and other venues that offer suitable environments for focused work and study."
    },
    {
      question: "Do I need an account to browse available spaces?",
      answer: "No, you can browse and search for study spaces without creating an account. However, you'll need to sign up to book spaces, save favorites, and manage your bookings."
    },
    {
      question: "Is Calm Corners free to use?",
      answer: "Yes, Calm Corners is completely free to use for individuals looking for study spaces. We may charge a small fee for space providers who want to list their locations on our platform."
    },
    {
      question: "How accurate is the occupancy information?",
      answer: "Our occupancy data is updated in real-time based on check-ins, bookings, and automated monitoring systems where available. While we strive for accuracy, occupancy can change quickly, especially in popular locations."
    }
  ];

  const bookingFAQs = [
    {
      question: "How do I book a study space?",
      answer: "To book a space, simply browse the available locations, select one that suits your needs, and click the 'Book now' button. You'll need to be signed in to complete the booking. Select your desired time slot, and confirm your booking."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking through the 'My Bookings' section of your account. Depending on the space's policy, you may be able to cancel up to a certain time before your reservation without penalty."
    },
    {
      question: "Can I book for someone else?",
      answer: "Currently, bookings can only be made for the account holder. If you need to make arrangements for someone else, they should create their own account."
    },
    {
      question: "How far in advance can I book?",
      answer: "Booking windows vary by location. Most spaces allow bookings 1-2 weeks in advance, while some popular venues may allow bookings up to a month ahead."
    }
  ];

  const accountFAQs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign In' button in the top right corner, then select 'Register now'. Fill in your details, choose your account type, agree to the terms, and click 'Create account'."
    },
    {
      question: "What are the different account types?",
      answer: "Calm Corners offers three account types: User (for finding and booking spaces), Space Owner (for listing and managing your own spaces), and Admin (for platform management, by invitation only)."
    },
    {
      question: "Can I change my account type later?",
      answer: "Yes, you can change your account type from User to Space Owner through your account settings. If you need to change to an Admin account, please contact our support team."
    },
    {
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot your password?'. Enter your email address, and we'll send you instructions to reset your password."
    }
  ];

  const troubleshootingFAQs = [
    {
      question: "The space I booked says it's full when I arrive. What should I do?",
      answer: "Occasionally, there may be discrepancies between our system and the actual capacity. Please speak to the staff at the location first. If the issue persists, contact our support team with details of your booking."
    },
    {
      question: "I can't find a specific study location I know about.",
      answer: "We're continuously adding new spaces to our platform. If you know of a location that should be included, please use our 'Suggest a Space' form or contact our support team."
    },
    {
      question: "The amenities listed for a space are incorrect.",
      answer: "Amenities can change over time. Please report any discrepancies through the space's details page by clicking 'Report an issue' or contact our support team directly."
    },
    {
      question: "The app is not showing my current location correctly.",
      answer: "Make sure you've granted location permissions to Calm Corners in your browser or device settings. If issues persist, try using the search function to find spaces near a specific address or landmark."
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would filter the FAQs or redirect to search results
    console.log("Searching for:", searchQuery);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Find answers to common questions about using Calm Corners, booking study spaces, and managing your account.
          </p>
          
          <form 
            onSubmit={handleSearch}
            className="max-w-xl mx-auto mt-8"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <FAQAccordion 
                items={generalFAQs} 
                category="General Questions"
                description="Basic information about Calm Corners and how it works"
              />
            </TabsContent>
            
            <TabsContent value="booking">
              <FAQAccordion 
                items={bookingFAQs} 
                category="Booking Questions"
                description="Information about booking process, cancellations, and policies"
              />
            </TabsContent>
            
            <TabsContent value="account">
              <FAQAccordion 
                items={accountFAQs} 
                category="Account Questions"
                description="Managing your Calm Corners account and profile settings"
              />
            </TabsContent>
            
            <TabsContent value="troubleshooting">
              <FAQAccordion 
                items={troubleshootingFAQs} 
                category="Troubleshooting"
                description="Solutions for common issues and problems"
              />
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 text-center bg-white p-8 rounded-lg border">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Still need help?</h2>
            <p className="text-gray-500 mb-6">
              Contact our support team for personalized assistance with any issues you're experiencing.
            </p>
            <Button onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </PageTransition>
  );
}
