import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/ui/page-transition";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  // Set the document title
  useEffect(() => {
    document.title = "Contact Us - Calm Corners";
  }, []);

  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Get in touch with the Calm Corners team
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="md:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-500">
                Have questions about Calm Corners? Want to partner with us as a space provider? 
                Or perhaps you've encountered an issue with our platform? We're here to help! 
                Fill out the form and our team will get back to you as soon as possible.
              </p>
            </div>
            
            <ContactForm />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Location</h2>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <span>Indore, Madhya Pradesh, India</span>
                </div>
                
                <div 
                  className="h-40 bg-gray-200 rounded-md mb-4"
                  style={{
                    backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/75.8577,22.7196,13,0/400x200?access_token=pk.eyJ1IjoiZGVtby1hY2NvdW50IiwiYSI6ImNraTJlc21vajA2cnMyeHBpdnpzMXBhMGsifQ.SxH5Vc0_m_BtC1rZbIkRVQ')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                ></div>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-bold mb-4">Email Address</h2>
            <Card className="mb-6">
              <CardContent className="pt-6 flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a href="mailto:codecrew2025@gmail.com" className="text-primary hover:underline">
                  codecrew2025@gmail.com
                </a>
              </CardContent>
            </Card>
            
            <h2 className="text-2xl font-bold mb-4">Support Hours</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start mb-2">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="mb-1">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </PageTransition>
  );
}

// Import the User and Clock icons
import { User, Clock } from "lucide-react";
