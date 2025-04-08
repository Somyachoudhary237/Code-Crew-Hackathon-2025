import { useEffect } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useStudySpaces } from "@/hooks/use-study-spaces";
import { SpaceCard } from "@/components/space-card";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/ui/page-transition";
import { Heart, Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function FavoritesPage() {
  const { favorites, isLoadingFavorites } = useStudySpaces();
  const { user } = useAuth();
  const [, navigate] = useLocation();

  // Set the document title
  useEffect(() => {
    document.title = "My Favorites - Calm Corners";
  }, []);

  if (!user) {
    return null; // Protected route should handle this
  }

  return (
    <PageTransition className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Favorite Spaces</h1>
          <Button onClick={() => navigate("/spaces")}>Explore More Spaces</Button>
        </div>
        
        {isLoadingFavorites ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite: any) => (
              <SpaceCard 
                key={favorite.id} 
                space={favorite.space!} 
                isFavorite={true} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border">
            <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Favorites Yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              You haven't added any spaces to your favorites yet. Browse study spaces and mark your favorites to quickly find them later.
            </p>
            <Button size="lg" onClick={() => navigate("/spaces")}>Find Spaces</Button>
          </div>
        )}
      </div>
      
      <Footer />
    </PageTransition>
  );
}
