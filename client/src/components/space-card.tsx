import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, BookText, Coffee, Leaf, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useState } from "react";
import { Space } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { SpaceQRCode } from "./space-qr-code";
import { SpaceRating } from "./space-rating";

interface SpaceCardProps {
  space: Space;
  isFavorite?: boolean;
}

export function SpaceCard({ space, isFavorite = false }: SpaceCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const { toast } = useToast();
  
  const getSpaceTypeIcon = (type: string) => {
    switch (type) {
      case 'library':
        return <BookText className="h-4 w-4 mr-1" />;
      case 'cafe':
        return <Coffee className="h-4 w-4 mr-1" />;
      case 'outdoor':
        return <Leaf className="h-4 w-4 mr-1" />;
      case 'study_room':
        return <Users className="h-4 w-4 mr-1" />;
      default:
        return <BookText className="h-4 w-4 mr-1" />;
    }
  };
  
  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return "bg-green-100 text-green-800 border-green-200";
    if (ratio > 0.2) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };
  
  const toggleFavorite = () => {
    setFavorite(!favorite);
    
    toast({
      title: favorite ? "Removed from favorites" : "Added to favorites",
      description: favorite ? 
        `${space.name} has been removed from your favorites.` : 
        `${space.name} has been added to your favorites.`,
      variant: "default",
    });
  };
  
  return (
    <Card className="w-full h-full overflow-hidden transition-all duration-300 hover:shadow-lg cream-background">
      <CardHeader className="p-0 relative">
        <div 
          className="h-48 bg-center bg-cover" 
          style={{ 
            backgroundImage: `url(${space.imageUrl || 'https://via.placeholder.com/300x150?text=Study+Space'})` 
          }}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white rounded-full h-8 w-8 p-1 shadow-md"
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </Button>
        <Badge
          className={`absolute top-2 left-2 ${getAvailabilityColor(space.availableSeats, space.totalSeats)}`}
        >
          {space.availableSeats} / {space.totalSeats} seats
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg script-font">{space.name}</h3>
          <Badge variant="outline" className="flex items-center">
            {getSpaceTypeIcon(space.type)}
            {space.type.replace('_', ' ')}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mb-2">{space.description}</p>
        <div className="flex flex-wrap text-sm text-gray-500 gap-2">
          {space.amenities?.map((amenity, index) => (
            <Badge variant="outline" key={index} className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex space-x-2">
          <SpaceQRCode space={{ id: space.id, name: space.name }} />
          <SpaceRating 
            spaceId={space.id} 
            spaceName={space.name} 
            initialRating={space.rating || 0}
          />
        </div>
        <Link href={`/spaces/${space.id}`}>
          <Button className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black">
            <Calendar className="mr-2 h-4 w-4" /> Book
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}