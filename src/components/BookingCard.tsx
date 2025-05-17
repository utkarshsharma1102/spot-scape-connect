
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Booking } from '../services/bookingService';
import { useBooking } from '@/contexts/BookingContext';
import { toast } from '@/hooks/use-toast';

interface BookingCardProps {
  booking: Booking;
  onCancel?: (bookingId: number) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onCancel }) => {
  const isUpcoming = booking.status === 'upcoming';
  const badgeVariant = 
    booking.status === 'upcoming' ? 'default' : 
    booking.status === 'completed' ? 'secondary' : 'destructive';
  
  const { cancelBooking } = useBooking();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel(booking.id);
    } else {
      cancelBooking(booking.id);
    }
    toast({
      title: "Booking cancelled",
      description: `Your booking for ${booking.spotName} has been cancelled.`,
    });
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{booking.spotName}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{booking.date}</span>
              <Clock className="h-4 w-4 ml-3 mr-1" />
              <span>{booking.time} ({booking.duration} hr)</span>
            </div>
          </div>
          <Badge variant={badgeVariant}>
            {booking.status}
          </Badge>
        </div>
      </div>
      
      <CardContent className="border-t pt-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total price</span>
          <span className="font-semibold">₹{booking.totalPrice}</span>
        </div>
      </CardContent>
      
      {isUpcoming && (
        <CardFooter className="border-t bg-muted/10 px-4 py-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => handleCancel()}
          >
            Cancel Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BookingCard;
