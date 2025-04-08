import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function StudyRoomsPage() {
  const [, navigate] = useLocation();

  // Go back to preferences page
  const goBack = () => {
    navigate("/preferences");
  };

  // Go to study room details
  const goToRoomDetails = (id: number) => {
    navigate(`/study-room/${id}`);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col cream-background">
      <div className="beige-header py-4 px-4 flex items-center">
        <button onClick={goBack} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="script-font text-2xl">Pick your Study Room</h1>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Study Room 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="script-font text-xl mr-2">1.</span>
                  <h2 className="script-font text-xl">The Reading Square</h2>
                </div>
                
                <div className="rounded-study-image mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1571057465712-9a88320f6d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="The Reading Square" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="body-font text-gray-700 mb-3 text-sm">
                  <div className="font-semibold">Address:</div>
                  <div>3rd Floor, J, 1/A, UN House, near Jaal Sabha Girah, South Tukoganj, Madhya Pradesh</div>
                </div>
                
                <div className="body-font text-gray-700 mb-4 text-sm">
                  <div className="font-semibold">Phone:</div>
                  <div>07524 24292</div>
                </div>
                
                <Button
                  onClick={() => goToRoomDetails(1)}
                  className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black w-full"
                >
                  <span className="body-font">Book Now</span>
                </Button>
              </div>
            </div>
            
            {/* Study Room 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="script-font text-xl mr-2">2.</span>
                  <h2 className="script-font text-xl">StudyNest Library</h2>
                </div>
                
                <div className="rounded-study-image mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt="StudyNest Library" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <div className="body-font text-gray-700 mb-3 text-sm">
                  <div className="font-semibold">Address:</div>
                  <div>476, Sudama Nagar, Ranjeet Hanuman Rd, Near Sethi Gate, Sector D, Indore, Madhya Pradesh</div>
                </div>
                
                <div className="body-font text-gray-700 mb-4 text-sm">
                  <div className="font-semibold">Phone:</div>
                  <div>08557 06505</div>
                </div>
                
                <Button
                  onClick={() => goToRoomDetails(2)}
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