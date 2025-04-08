import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function LibrariesPage() {
  const [, navigate] = useLocation();

  // Go back to preferences page
  const goBack = () => {
    navigate("/preferences");
  };

  // Go to library details
  const goToLibraryDetails = (id: number) => {
    navigate(`/library/${id}`);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col cream-background">
      <div className="beige-header py-4 px-4 flex items-center">
        <button onClick={goBack} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="script-font text-2xl">Pick your Libraries</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Library 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="script-font text-xl mr-2">1.</span>
                  <h2 className="script-font text-xl">Pathshala library</h2>
                </div>
                
                <div className="rounded-study-image mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Pathshala Library" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="body-font text-gray-700 mb-3 text-sm">
                  <div className="font-semibold">Address:</div>
                  <div>Airport Rd, opposite SBI BANK, CHAL SIRTIA BAR, Indore, Madhya Pradesh</div>
                </div>
                
                <div className="body-font text-gray-700 mb-4 text-sm">
                  <div className="font-semibold">Phone:</div>
                  <div>09876 98765</div>
                </div>
                
                <Button
                  onClick={() => goToLibraryDetails(1)}
                  className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black w-full"
                >
                  <span className="body-font">Book Now</span>
                </Button>
              </div>
            </div>
            
            {/* Library 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="script-font text-xl mr-2">2.</span>
                  <h2 className="script-font text-xl">Peace library</h2>
                </div>
                
                <div className="rounded-study-image mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1568667256549-094345857637?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="Peace Library" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="body-font text-gray-700 mb-3 text-sm">
                  <div className="font-semibold">Address:</div>
                  <div>2131 D Sudama Nagar, Sector D Western Ring Road, Indore, Madhya Pradesh</div>
                </div>
                
                <div className="body-font text-gray-700 mb-4 text-sm">
                  <div className="font-semibold">Phone:</div>
                  <div>09023 12345</div>
                </div>
                
                <Button
                  onClick={() => goToLibraryDetails(2)}
                  className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black w-full"
                >
                  <span className="body-font">Book Now</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </PageTransition>
  );
}