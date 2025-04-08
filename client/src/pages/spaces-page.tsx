import { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/search-bar";
import { MapView } from "@/components/map-view";
import { SpaceCard } from "@/components/space-card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { useLocation } from "wouter";
import { useWebSocket } from "@/hooks/use-websocket";
import { useStudySpaces } from "@/hooks/use-study-spaces";
import { Filter, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export default function SpacesPage() {
  const [location] = useLocation();
  const { spaces, connected } = useWebSocket();
  const { spaces: studySpaces } = useStudySpaces();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSpaces, setFilteredSpaces] = useState(spaces || []);
  const [activeFilters, setActiveFilters] = useState<{
    wifi: boolean;
    quiet: boolean;
    power: boolean;
    groups: boolean;
    available: boolean;
    type?: string;
  }>({
    wifi: false,
    quiet: false,
    power: false,
    groups: false,
    available: false
  });
  
  // Parse query parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const query = searchParams.get('search');
    const type = searchParams.get('type');
    
    if (query) {
      setSearchQuery(query);
    }
    
    if (type) {
      setActiveFilters(prev => ({
        ...prev,
        type: type as any
      }));
    }
  }, [location]);
  
  // Filter spaces when spaces or filters change
  useEffect(() => {
    if (!spaces) return;
    
    let filtered = [...spaces];
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(space => 
        space.name.toLowerCase().includes(query) || 
        space.type.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (activeFilters.type) {
      filtered = filtered.filter(space => space.type === activeFilters.type);
    }
    
    // Apply amenity filters
    if (activeFilters.wifi) {
      filtered = filtered.filter(space => space.hasWifi);
    }
    
    if (activeFilters.quiet) {
      filtered = filtered.filter(space => space.hasQuietZone);
    }
    
    if (activeFilters.power) {
      filtered = filtered.filter(space => space.hasPower);
    }
    
    if (activeFilters.groups) {
      filtered = filtered.filter(space => space.hasGroupSpace);
    }
    
    // Apply availability filter
    if (activeFilters.available) {
      filtered = filtered.filter(space => space.availableSeats > 0);
    }
    
    setFilteredSpaces(filtered);
  }, [spaces, searchQuery, activeFilters]);
  
  // Check if a space is in favorites
  const isFavorite = (spaceId: number) => {
    // For now, just return false as we don't have favorites implemented yet
    return false;
  };
  
  // Handle search from the search bar
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  // Toggle a filter
  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter as keyof typeof prev]
    }));
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveFilters({
      wifi: false,
      quiet: false,
      power: false,
      groups: false,
      available: false,
      type: undefined as any
    });
    setSearchQuery("");
  };

  // Set the document title
  useEffect(() => {
    document.title = "Study Spaces - Calm Corners";
  }, []);

  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <section className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Find Study Spaces</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <MapView spaces={filteredSpaces} />
        </div>
      </section>
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {filteredSpaces.length} Study {filteredSpaces.length === 1 ? 'Space' : 'Spaces'} Found
            </h2>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Spaces</SheetTitle>
                  <SheetDescription>
                    Customize your search to find the perfect study space.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Amenities</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="wifi" className="flex items-center gap-2">
                          <span>Wi-Fi</span>
                        </Label>
                        <Switch 
                          id="wifi" 
                          checked={activeFilters.wifi}
                          onCheckedChange={() => toggleFilter('wifi')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quiet" className="flex items-center gap-2">
                          <span>Quiet Zone</span>
                        </Label>
                        <Switch 
                          id="quiet"
                          checked={activeFilters.quiet}
                          onCheckedChange={() => toggleFilter('quiet')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="power" className="flex items-center gap-2">
                          <span>Power Outlets</span>
                        </Label>
                        <Switch 
                          id="power"
                          checked={activeFilters.power}
                          onCheckedChange={() => toggleFilter('power')}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="groups" className="flex items-center gap-2">
                          <span>Group Spaces</span>
                        </Label>
                        <Switch 
                          id="groups"
                          checked={activeFilters.groups}
                          onCheckedChange={() => toggleFilter('groups')}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Availability</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="available" className="flex items-center gap-2">
                        <span>Show only available spaces</span>
                      </Label>
                      <Switch 
                        id="available"
                        checked={activeFilters.available}
                        onCheckedChange={() => toggleFilter('available')}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {!connected ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-3" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex mb-4">
                      <Skeleton className="h-4 w-16 mr-2" />
                      <Skeleton className="h-4 w-16 mr-2" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex">
                        <Skeleton className="h-8 w-8 rounded-full mr-2" />
                        <Skeleton className="h-8 w-24 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map((space) => (
                <SpaceCard 
                  key={space.id} 
                  space={space}
                  isFavorite={isFavorite(space.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No spaces found</h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any spaces matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button onClick={resetFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </PageTransition>
  );
}
