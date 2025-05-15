
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: number;
  username: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

interface SpotReviewsProps {
  spotId: number;
  reviews?: Review[];
}

const SpotReviews: React.FC<SpotReviewsProps> = ({ spotId, reviews: initialReviews = [] }) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [userReview, setUserReview] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  // Mock reviews data if none provided
  React.useEffect(() => {
    if (initialReviews.length === 0) {
      setReviews([
        {
          id: 1,
          username: "Priya Shah",
          userAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
          rating: 5,
          comment: "Excellent spot! Very convenient location and easy to find. The area was well-lit and felt secure.",
          date: "2025-05-01"
        },
        {
          id: 2,
          username: "Rajiv Kumar",
          userAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
          rating: 4,
          comment: "Good location with plenty of space. Only giving 4 stars because it gets crowded during peak hours.",
          date: "2025-04-22"
        }
      ]);
    }
  }, [initialReviews]);

  const handleSubmitReview = () => {
    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review",
        variant: "destructive"
      });
      return;
    }

    if (userReview.trim().length === 0) {
      toast({
        title: "Review required", 
        description: "Please write a review before submitting",
        variant: "destructive"
      });
      return;
    }

    // Create a new review
    const newReview = {
      id: reviews.length + 1,
      username: "You",
      rating: userRating,
      comment: userReview,
      date: new Date().toISOString().slice(0, 10)
    };

    // Add review to the list
    setReviews([newReview, ...reviews]);
    
    // Reset form
    setUserReview("");
    setUserRating(0);
    
    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Reviews</h3>
        
        {/* Review form */}
        <div className="border rounded-lg p-4 bg-muted/30 space-y-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((rating) => (
              <StarIcon
                key={rating}
                className={`h-6 w-6 cursor-pointer ${
                  (hoveredRating || userRating) >= rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoveredRating(rating)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setUserRating(rating)}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {userRating > 0 ? `${userRating} stars` : "Select rating"}
            </span>
          </div>
          
          <Textarea
            placeholder="Write your review here..."
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            className="resize-none"
            rows={3}
          />
          
          <Button onClick={handleSubmitReview} className="w-full">
            Submit Review
          </Button>
        </div>
        
        {/* Review list */}
        <div className="space-y-4 mt-6">
          {reviews.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No reviews yet. Be the first to leave a review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={review.userAvatar} alt={review.username} />
                      <AvatarFallback>{review.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.username}</div>
                      <div className="text-xs text-muted-foreground">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-muted-foreground">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SpotReviews;
