import { useState } from 'react';
import ReactStars from "react-rating-stars-component";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface SpaceRatingProps {
  spaceId: number;
  spaceName: string;
  initialRating?: number;
}

export function SpaceRating({ spaceId, spaceName, initialRating = 0 }: SpaceRatingProps) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(initialRating);
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();
  
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  
  const handleSubmit = () => {
    // Here you would typically send the rating to your backend
    // For now, we'll just show a success message
    
    toast({
      title: "Rating submitted!",
      description: `You rated ${spaceName} with ${rating} stars. Thank you for your feedback!`,
      variant: "default",
    });
    
    setOpen(false);
    setFeedback('');
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-yellow-600 hover:text-yellow-700 hover:bg-transparent"
        >
          <Star className="h-4 w-4 mr-1 fill-yellow-500" /> Rate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md cream-background">
        <DialogHeader>
          <DialogTitle className="text-center script-font text-xl">
            Rate: {spaceName}
          </DialogTitle>
          <DialogDescription className="text-center">
            Share your experience with this study space
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="flex justify-center">
            <ReactStars
              count={5}
              onChange={handleRatingChange}
              size={40}
              activeColor="#ffd700"
              value={rating}
            />
          </div>
          <div className="w-full space-y-2">
            <Label htmlFor="feedback">Your feedback (optional)</Label>
            <Textarea
              id="feedback"
              placeholder="What did you like or dislike about this space?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-24"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="menu-button">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="bg-[#d5c3a1] hover:bg-[#c9b48e] text-black">
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}