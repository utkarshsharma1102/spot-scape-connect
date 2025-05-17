
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { bookingService } from '@/services/bookingService';

interface BookingFormProps {
  spotId: number;
  spotName: string;
  price: string;
  onBookingComplete: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ spotId, spotName, price, onBookingComplete }) => {
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!date || !startTime || !duration) {
      toast({
        title: "Missing information",
        description: "Please select a date, time and duration.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Process payment first
      const paymentSuccess = await processPayment(totalPrice);
      
      if (!paymentSuccess) {
        throw new Error("Payment processing failed");
      }

      // Get existing bookings from localStorage or initialize empty array
      const existingBookingsJson = localStorage.getItem('parkingBookings');
      const existingBookings = existingBookingsJson ? JSON.parse(existingBookingsJson) : [];
      
      // Create new booking object
      const newBooking = {
        id: Date.now(), // Use timestamp as unique ID
        spotId,
        spotName,
        date: format(date, "yyyy-MM-dd"),
        time: startTime,
        duration: parseInt(duration),
        price: price,
        totalPrice: parseInt(duration) * parseInt(price.replace(/\D/g, '')),
        status: 'upcoming',
        bookedAt: new Date().toISOString(),
        paymentMethod: paymentMethod
      };
      
      // Add new booking to array and save to localStorage
      const updatedBookings = [...existingBookings, newBooking];
      localStorage.setItem('parkingBookings', JSON.stringify(updatedBookings));
      
      toast({
        title: "Payment successful!",
        description: `₹${totalPrice} has been charged to your ${paymentMethod}.`,
      });

      setTimeout(() => {
        toast({
          title: "Booking confirmed!",
          description: `You have booked ${spotName} on ${format(date, "PPP")} at ${startTime} for ${duration} hours.`,
        });
        setIsLoading(false);
        onBookingComplete();
        
        // Ask user if they want to view their bookings
        setTimeout(() => {
          toast({
            title: "View your bookings",
            description: "Would you like to view your booking history?",
            action: (
              <Button size="sm" onClick={() => navigate('/profile')}>
                Go to Profile
              </Button>
            ),
          });
        }, 1000);
      }, 1500);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your booking.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const processPayment = async (amount: number): Promise<boolean> => {
    // Simulate payment processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a successful payment 95% of the time
        const isSuccessful = Math.random() < 0.95;
        resolve(isSuccessful);
      }, 2000);
    });
  };

  const totalPrice = parseInt(duration) * parseInt(price.replace(/\D/g, ''));

  // Generate time slot options (30-minute intervals)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    const hourString = hour.toString().padStart(2, '0');
    timeOptions.push(`${hourString}:00`);
    timeOptions.push(`${hourString}:30`);
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
      <h3 className="font-semibold text-lg">Book this spot</h3>
      
      <div className="space-y-2">
        <Label>Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="pointer-events-auto"
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Start Time</Label>
        <Select value={startTime} onValueChange={setStartTime}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select time">
              {startTime ? (
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {startTime}
                </div>
              ) : (
                "Select time"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((time) => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Duration (hours)</Label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger>
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((hours) => (
              <SelectItem key={hours} value={hours.toString()}>{hours} hour{hours > 1 ? 's' : ''}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Payment Method</Label>
        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="card">Credit/Debit Card</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="netbanking">Net Banking</SelectItem>
            <SelectItem value="wallet">Digital Wallet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-2 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total Price:</span>
          <span className="font-bold">₹{totalPrice}</span>
        </div>
        <Button 
          onClick={handleBooking} 
          className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Pay & Book Now"}
          {!isLoading && <CreditCard className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
