
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
      // This is a placeholder for actual booking logic
      // We'll update this with Supabase integration
      console.log('Booking attempt for spot:', spotId, 'on', date, 'at', startTime, 'for', duration, 'hours');
      
      // Simulate successful booking
      setTimeout(() => {
        toast({
          title: "Booking confirmed!",
          description: `You have booked ${spotName} on ${format(date, "PPP")} at ${startTime} for ${duration} hours.`,
        });
        setIsLoading(false);
        onBookingComplete();
      }, 1500);
    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Booking failed",
        description: "An error occurred while processing your booking.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
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

      <div className="pt-2 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total Price:</span>
          <span className="font-bold">₹{totalPrice}</span>
        </div>
        <Button 
          onClick={handleBooking} 
          className="w-full bg-primary hover:bg-primary/90"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Confirm Booking"}
        </Button>
      </div>
    </div>
  );
};

export default BookingForm;
