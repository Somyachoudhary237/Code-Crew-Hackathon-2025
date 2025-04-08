import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PageTransition } from "@/components/ui/page-transition";
import { useLocation } from "wouter";
import { ArrowLeft, MapPin } from "lucide-react";

export default function PreferencesPage() {
  const [, navigate] = useLocation();
  const [selectedType, setSelectedType] = useState<string>("libraries");
  const [selectedPrice, setSelectedPrice] = useState<string>("100");
  const [selectedFacilities, setSelectedFacilities] = useState({
    wifi: false,
    ac: false,
    charging: false,
    noise: false
  });

  // Go back to previous page
  const goBack = () => {
    window.history.back();
  };

  // Toggle a facility selection
  const toggleFacility = (facility: keyof typeof selectedFacilities) => {
    setSelectedFacilities(prev => ({
      ...prev,
      [facility]: !prev[facility]
    }));
  };

  // Handle next step - go to library selection
  const handleNext = () => {
    if (selectedType === "libraries") {
      navigate("/libraries");
    } else {
      navigate("/study-rooms");
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col cream-background">
      <div className="beige-header py-4 px-4 flex items-center">
        <button onClick={goBack} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="script-font text-2xl">Pick your Preferences</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 1. Location */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <span className="script-font text-xl mr-2">1.</span>
              <h2 className="script-font text-xl">Location</h2>
            </div>
            
            <div className="bg-blue-100 rounded-lg p-4 flex items-center">
              <MapPin className="text-blue-500 mr-3" />
              <span className="flex-grow">Select location</span>
            </div>
          </div>
          
          {/* 2. Type Selection */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <span className="script-font text-xl mr-2">2.</span>
              <h2 className="script-font text-xl">Please Pick:-</h2>
            </div>
            
            <div className="flex gap-6 items-center">
              <div 
                className={`cursor-pointer py-2 px-4 rounded-full ${selectedType === "study-rooms" ? "bg-blue-100 text-blue-800" : ""}`}
                onClick={() => setSelectedType("study-rooms")}
              >
                <span className="body-font">Study Rooms</span>
              </div>
              <div 
                className={`cursor-pointer py-2 px-4 rounded-full ${selectedType === "libraries" ? "bg-blue-100 text-blue-800" : ""}`}
                onClick={() => setSelectedType("libraries")}
              >
                <span className="body-font">Libraries</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center ml-auto">
                <span className="text-blue-800 text-xs">2</span>
              </div>
            </div>
          </div>
          
          {/* 3. Price Selection */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <span className="script-font text-xl mr-2">3.</span>
              <h2 className="script-font text-xl">Price per hour:-</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div 
                className={`cursor-pointer py-2 px-4 rounded-md ${selectedPrice === "100" ? "bg-blue-100 text-blue-800" : ""}`}
                onClick={() => setSelectedPrice("100")}
              >
                <div className="body-font font-semibold">100/-</div>
                <div className="body-font text-sm italic">Starter price</div>
              </div>
              <div 
                className={`cursor-pointer py-2 px-4 rounded-md ${selectedPrice === "150" ? "bg-blue-100 text-blue-800" : ""}`}
                onClick={() => setSelectedPrice("150")}
              >
                <div className="body-font font-semibold">150/-</div>
                <div className="body-font text-sm italic">Intermediate price</div>
              </div>
              <div 
                className={`cursor-pointer py-2 px-4 rounded-md ${selectedPrice === "200" ? "bg-blue-100 text-blue-800" : ""}`}
                onClick={() => setSelectedPrice("200")}
              >
                <div className="body-font font-semibold">200/-</div>
                <div className="body-font text-sm italic">Premium price</div>
              </div>
            </div>
          </div>
          
          {/* 4. Facilities */}
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <span className="script-font text-xl mr-2">4.</span>
              <h2 className="script-font text-xl">Facilities:-</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="wifi"
                  checked={selectedFacilities.wifi}
                  onCheckedChange={() => toggleFacility("wifi")}
                />
                <label htmlFor="wifi" className="body-font cursor-pointer">
                  Wi-Fi Connectivity
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="ac"
                  checked={selectedFacilities.ac}
                  onCheckedChange={() => toggleFacility("ac")}
                />
                <label htmlFor="ac" className="body-font cursor-pointer">
                  Air Conditioning
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="charging"
                  checked={selectedFacilities.charging}
                  onCheckedChange={() => toggleFacility("charging")}
                />
                <label htmlFor="charging" className="body-font cursor-pointer">
                  Charging Ports
                </label>
              </div>
              
              <div className="flex items-center gap-2">
                <Checkbox
                  id="noise"
                  checked={selectedFacilities.noise}
                  onCheckedChange={() => toggleFacility("noise")}
                />
                <label htmlFor="noise" className="body-font cursor-pointer">
                  Noise-Free Zones
                </label>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button 
              onClick={handleNext}
              className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black px-8 py-2"
            >
              <span className="body-font">Next</span>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </PageTransition>
  );
}