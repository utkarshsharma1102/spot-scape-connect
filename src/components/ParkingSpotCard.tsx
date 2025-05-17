
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Star, Car, CreditCard } from "lucide-react";

interface ParkingSpotCardProps {
  id: number;
  name: string;
  address: string;
  price: string;
  rating: number;
  distance: string;
  availability: string;
  imageUrl: string;
  onClick?: () => void; // Added onClick as an optional prop
}

const ParkingSpotCard: React.FC<ParkingSpotCardProps> = ({
  id,
  name,
  address,
  price,
  rating,
  distance,
  availability,
  imageUrl,
  onClick
}) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer" onClick={onClick}>
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl || "/placeholder.svg"} 
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <Badge variant="outline" className="bg-accent text-accent-foreground">
            ₹{price}/hr
          </Badge>
        </div>
        <CardDescription className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
          {address}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between text-sm mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
            <span>{rating} (24 reviews)</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Car className="h-4 w-4 mr-1" />
            <span>{distance} away</span>
          </div>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{availability}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center" onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the card's onClick
          if (onClick) onClick();
        }}>
          <CreditCard className="mr-2 h-4 w-4" />
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ParkingSpotCard;
