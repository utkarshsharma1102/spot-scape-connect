
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MapPin, Star, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingForm from './BookingForm';
import SpotReviews from './SpotReviews';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface SpotDetailProps {
  spot: {
    id: number;
    name: string;
    address: string;
    price: string;
    rating: number;
    description: string;
    availability: string;
    imageUrl: string;
    owner: {
      name: string;
      image: string;
      joinedDate: string;
    };
    features: string[];
  };
  onClose: () => void;
}

const SpotDetail: React.FC<SpotDetailProps> = ({ spot, onClose }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const { addBooking } = useBooking();
  const navigate = useNavigate();

  const handleBookingComplete = () => {
    setShowBookingForm(false);
    setActiveTab("details");
    toast({
      title: "Booking Complete!",
      description: "Your parking spot has been successfully booked.",
    });
    
    // Close the dialog after a brief delay
    setTimeout(() => {
      onClose();
      
      // Offer to navigate to bookings after successful booking
      const shouldNavigate = window.confirm("Would you like to view your bookings?");
      if (shouldNavigate) {
        navigate('/profile');
      }
    }, 1500);
  };

  return (
    <Card className="max-w-2xl w-full overflow-hidden">
      <div className="relative h-60 overflow-hidden">
        <img 
          src={spot.imageUrl || "/placeholder.svg"} 
          alt={spot.name}
          className="w-full h-full object-cover"
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 text-black p-2 rounded-full hover:bg-white"
        >
          ✕
        </button>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{spot.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {spot.address}
            </CardDescription>
          </div>
          <Badge variant="outline" className="bg-accent text-accent-foreground text-lg">
            ₹{spot.price}/hr
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-1 text-yellow-500 fill-yellow-500" />
            <span>{spot.rating} (24 reviews)</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-5 w-5 mr-1" />
            <span>{spot.availability}</span>
          </div>
        </div>
        
        {showBookingForm ? (
          <BookingForm 
            spotId={spot.id} 
            spotName={spot.name} 
            price={spot.price} 
            onBookingComplete={handleBookingComplete}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">About this spot</h3>
                <p className="text-muted-foreground">{spot.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {spot.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={spot.owner.image} alt={spot.owner.name} />
                    <AvatarFallback>{spot.owner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{spot.owner.name}</p>
                    <p className="text-sm text-muted-foreground">Member since {spot.owner.joinedDate}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <SpotReviews spotId={spot.id} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-3">
        {!showBookingForm && (
          <>
            <Button 
              className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
              onClick={() => setShowBookingForm(true)}
            >
              Book Now
            </Button>
            <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
              <Shield className="h-4 w-4 mr-1" />
              Secure booking with SpotScape guarantee
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default SpotDetail;
