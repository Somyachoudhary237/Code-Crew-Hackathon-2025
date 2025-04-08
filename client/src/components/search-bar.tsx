import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FilterButton } from "./filter-button";
import { useLocation } from "wouter";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
    
    // Navigate to spaces page if we're not already there
    navigate("/spaces");
  };
  
  const handleFilterClick = (filterType: string) => {
    navigate(`/spaces?type=${filterType}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row">
          <div className="flex-grow mb-2 md:mb-0 md:mr-2">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <Search className="h-5 w-5" />
              </span>
              <Input 
                type="text" 
                placeholder="Search libraries, cafes, or study rooms near you..." 
                className="w-full pl-10 pr-4 py-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="md:w-auto">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
        
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          <FilterButton 
            icon="book" 
            label="Libraries" 
            onClick={() => handleFilterClick("library")} 
          />
          <FilterButton 
            icon="coffee" 
            label="Cafes" 
            onClick={() => handleFilterClick("cafe")} 
          />
          <FilterButton 
            icon="school" 
            label="Universities" 
            onClick={() => handleFilterClick("university")} 
          />
          <FilterButton 
            icon="building" 
            label="Coworking" 
            onClick={() => handleFilterClick("coworking")} 
          />
        </div>
      </div>
    </div>
  );
}
