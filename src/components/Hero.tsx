
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Hero: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the home page with search query
    if (searchLocation.trim()) {
      // Scroll down to the map section
      const mapSection = document.querySelector('.map-section');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
        // Pass the search location to the Search component
        window.sessionStorage.setItem('heroSearch', searchLocation);
        // Dispatch an event to notify components about the search
        window.dispatchEvent(new CustomEvent('heroSearch', { detail: searchLocation }));
      }
    }
  };

  const handleListSpot = () => {
    navigate('/admin');
  };

  const handleFindParking = () => {
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-secondary to-primary py-20 px-6 text-white">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          Find Your Perfect Parking Spot
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 opacity-90">
          Connect with local spot owners and find affordable parking near your destination
        </p>
        
        <div className="relative max-w-md mx-auto">
          <div className="flex">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                type="text"
                placeholder="Enter location or address..." 
                className="pl-10 h-12 text-black rounded-l-lg rounded-r-none border-r-0 w-full"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <Button 
              className="h-12 px-6 rounded-l-none bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
        
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button 
            variant="outline" 
            className="bg-white/20 hover:bg-white/30 border-white"
            onClick={handleListSpot}
          >
            List Your Spot
          </Button>
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
            onClick={handleFindParking}
          >
            Find Parking
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full -ml-20 -mb-20"></div>
      <div className="hidden md:block absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -mr-20 -mt-20"></div>
    </div>
  );
};

export default Hero;
