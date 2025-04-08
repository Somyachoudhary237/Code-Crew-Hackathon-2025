import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin, Star, Clock, Book, Users, Leaf, Coffee, QrCode } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { SearchBar } from "@/components/search-bar";
import { MapView } from "@/components/map-view";
import { SpaceCard } from "@/components/space-card";
import { useStudySpaces } from "@/hooks/use-study-spaces";
import { useWebSocket } from "@/hooks/use-websocket";

export default function HomePage() {
  const { spaces, connected } = useWebSocket();
  const { getSpacesByType } = useStudySpaces();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Handle search from the search bar
  const handleSearch = (query: string) => {
    if (query.trim()) {
      const url = `/spaces?search=${encodeURIComponent(query)}`;
      window.location.href = url;
    }
  };
  
  // Set the document title
  useEffect(() => {
    document.title = "Calm Corners - Find Your Perfect Study Space";
  }, []);
  
  // Get featured spaces of different types
  const librarySpaces = getSpacesByType("library").slice(0, 3);
  const cafeSpaces = getSpacesByType("cafe").slice(0, 3);
  const studyRoomSpaces = getSpacesByType("study_room").slice(0, 3);
  const outdoorSpaces = getSpacesByType("outdoor").slice(0, 3);
  
  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-[url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white script-font">
            Find Your Perfect Study Space
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover quiet corners, libraries, cafes, and study rooms with real-time availability.
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/libraries">
              <Button className="bg-[#8B4513] hover:bg-[#6b3000] text-white">
                <Book className="mr-2 h-4 w-4 text-white" /> Libraries
              </Button>
            </Link>
            <Link href="/spaces?type=cafe">
              <Button className="bg-[#FF6B6B] hover:bg-[#e95252] text-white">
                <Coffee className="mr-2 h-4 w-4 text-white" /> Cafes
              </Button>
            </Link>
            <Link href="/spaces?type=study_room">
              <Button className="bg-[#4361EE] hover:bg-[#2647e2] text-white">
                <Users className="mr-2 h-4 w-4 text-white" /> Study Rooms
              </Button>
            </Link>
            <Link href="/spaces?type=outdoor">
              <Button className="bg-[#38B000] hover:bg-[#2d8c00] text-white">
                <Leaf className="mr-2 h-4 w-4 text-white" /> Outdoor
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Real-time Map Section */}
      <section className="py-12 bg-white bg-sky-gradient bg-opacity-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Real-time Space Finder</h2>
              <p className="text-gray-600">
                View all study spaces with live availability updates
              </p>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <div className={`w-3 h-3 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">{connected ? 'Connected - Live updates active' : 'Connecting...'}</span>
            </div>
          </div>
          <div className="h-96 mb-6">
            <MapView spaces={spaces} />
          </div>
          <div className="text-center">
            <Link href="/spaces">
              <Button className="btn-sky">
                Explore All Spaces <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Libraries Section */}
      {librarySpaces.length > 0 && (
        <section className="py-12 cream-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Featured Libraries</h2>
              <Link href="/libraries">
                <Button variant="link" className="text-blue-600">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {librarySpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Cafes Section */}
      {cafeSpaces.length > 0 && (
        <section className="py-12 bg-white accent-peach bg-opacity-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Cozy Cafes</h2>
              <Link href="/spaces?type=cafe">
                <Button variant="link" className="text-blue-600">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cafeSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Features Section */}
      <section className="py-12 cream-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Why Choose Calm Corners?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#4361EE] rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">
                Live updates on seat availability and space occupancy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Rate &amp; Review</h3>
              <p className="text-gray-600">
                Share your experience and help others find the best spaces.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#38B000] rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quick Access</h3>
              <p className="text-gray-600">
                Scan QR codes for instant information about any study space.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Reserve your spot in advance with a few simple clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Study Rooms Section */}
      {studyRoomSpaces.length > 0 && (
        <section className="py-12 accent-sky bg-opacity-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Group Study Rooms</h2>
              <Link href="/study-rooms">
                <Button variant="link" className="text-blue-600">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studyRoomSpaces.map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="bg-warm-gradient py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to find your perfect study spot?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Browse our complete collection of quiet, productive spaces and find the one that suits your needs.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/spaces">
              <Button className="btn-sky">
                Explore All Spaces
              </Button>
            </Link>
            <Link href="/preferences">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Set Your Preferences
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </PageTransition>
  );
}