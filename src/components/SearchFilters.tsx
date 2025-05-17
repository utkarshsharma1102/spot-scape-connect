
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBooking, SearchFilters } from '@/contexts/BookingContext';
import { toast } from '@/hooks/use-toast';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
  initialSearch?: string;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({ onSearch, initialSearch }) => {
  const navigate = useNavigate();
  const { setSearchFilters } = useBooking();
  const [location, setLocation] = useState(initialSearch || '');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [priceRange, setPriceRange] = useState('');
  const [availability, setAvailability] = useState('');

  // Set initial location if provided
  useEffect(() => {
    if (initialSearch) {
      setLocation(initialSearch);
    }
  }, [initialSearch]);

  const handleSearch = () => {
    const filters = {
      location,
      date,
      priceRange,
      availability
    };
    
    setSearchFilters(filters);
    onSearch(filters);
    toast({
      title: "Search applied",
      description: `Searching for parking spots near ${location || 'your location'}`,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input 
            placeholder="Search location" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>

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
            />
          </PopoverContent>
        </Popover>

        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-100">₹0 - ₹100</SelectItem>
            <SelectItem value="100-200">₹100 - ₹200</SelectItem>
            <SelectItem value="200-300">₹200 - ₹300</SelectItem>
            <SelectItem value="300+">₹300+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger>
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available Now</SelectItem>
            <SelectItem value="all">All Spots</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default SearchFiltersComponent;
