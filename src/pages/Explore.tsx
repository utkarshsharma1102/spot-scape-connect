
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ThreeJSMap from '@/components/ThreeJSMap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, MapPin, Car, Clock, DollarSign, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ExplorePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 20],
    availability: 'all',
    showFilter: false
  });

  const handleSpotSelect = (spot: any) => {
    console.log('Spot selected:', spot);
    toast({
      title: "Spot selected",
      description: `You selected ${spot.name}`,
    });
    navigate(`/spot/${spot.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-secondary">Find Parking Spots</h1>
          <Button 
            variant="outline"
            onClick={() => setFilters({...filters, showFilter: !filters.showFilter})}
            className="flex items-center gap-2"
          >
            {filters.showFilter ? <X size={16} /> : <Filter size={16} />}
            {filters.showFilter ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {filters.showFilter && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <Input 
                      placeholder="Enter location" 
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range ($/hr)</label>
                  <div className="px-2">
                    <Slider 
                      defaultValue={[0, 20]} 
                      max={50} 
                      step={1} 
                      onValueChange={(value) => setFilters({...filters, priceRange: value as number[]})}
                    />
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Availability</label>
                  <ToggleGroup type="single" value={filters.availability} onValueChange={(value) => value && setFilters({...filters, availability: value})}>
                    <ToggleGroupItem value="all" aria-label="All">All</ToggleGroupItem>
                    <ToggleGroupItem value="now" aria-label="Available Now">Now</ToggleGroupItem>
                    <ToggleGroupItem value="today" aria-label="Today">Today</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button 
                  className="bg-primary"
                  onClick={() => {
                    toast({
                      title: "Filters applied",
                      description: "Showing results based on your filters",
                    });
                  }}
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="my-6">
          <ThreeJSMap onSpotSelect={handleSpotSelect} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-secondary mb-4">Nearby Parking Spots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((spotId) => (
              <Card 
                key={spotId} 
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/spot/${spotId}`)}
              >
                <div className="h-32 bg-gray-200 relative">
                  <div className="absolute bottom-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-xs">
                    ${Math.floor(Math.random() * 10) + 2}/hr
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold">Parking Spot #{spotId}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <MapPin size={12} className="mr-1" />
                    <span>{`${(Math.random() * 2).toFixed(1)} miles away`}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>Available 24/7</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
