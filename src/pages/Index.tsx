
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MapView from '@/components/MapView';
import ParkingSpotCard from '@/components/ParkingSpotCard';
import FeatureHighlight from '@/components/FeatureHighlight';
import SpotDetail from '@/components/SpotDetail';
import SearchFilters from '@/components/SearchFilters';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CarFront, Clock, MapPin, CreditCard } from "lucide-react";
import { SearchFilters as SearchFiltersType } from '@/contexts/BookingContext';

// Mock data updated with Indian locations and rupee pricing
const parkingSpots = [
  {
    id: 1,
    name: "Delhi Connaught Place Parking",
    address: "Block K, Connaught Place, New Delhi",
    price: "200",
    rating: 4.8,
    distance: "0.5 km",
    availability: "Available 24/7",
    imageUrl: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Secure parking spot in the heart of Delhi's business district. Easy access to restaurants, shops and entertainment venues. Well-lit area with 24/7 security cameras.",
    owner: {
      name: "Rajiv Kumar",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "March 2023"
    },
    features: ["Security Camera", "Well Lit", "Covered", "24/7 Access"]
  },
  {
    id: 2,
    name: "Mumbai Marine Drive",
    address: "Marine Drive, Nariman Point, Mumbai",
    price: "350",
    rating: 4.2,
    distance: "1.2 km",
    availability: "8AM - 10PM",
    imageUrl: "https://images.unsplash.com/photo-1621953468372-f156213d60a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Convenient seaside parking with beautiful views of the Arabian Sea. Perfect for daily commuters or weekend visitors to Marine Drive and nearby attractions.",
    owner: {
      name: "Priya Shah",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      joinedDate: "January 2022"
    },
    features: ["Sea View", "Paved", "Near Public Transit"]
  },
  {
    id: 3,
    name: "Bangalore MG Road Parking",
    address: "MG Road, Shivaji Nagar, Bangalore",
    price: "250",
    rating: 4.5,
    distance: "0.8 km",
    availability: "6AM - 8PM",
    imageUrl: "https://images.unsplash.com/photo-1583849227440-2a8a2867ff17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Prime location near Bangalore's shopping hub. Perfect for shoppers and visitors. Wide space suitable for larger vehicles and easy in-out access.",
    owner: {
      name: "Amit Patel",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      joinedDate: "August 2022"
    },
    features: ["Wide Space", "Easy Access", "Near Market", "Security Patrol"]
  },
  {
    id: 4,
    name: "Hyderabad HITEC City Spot",
    address: "HITEC City, Hyderabad, Telangana",
    price: "300",
    rating: 4.9,
    distance: "1.5 km",
    availability: "Weekdays 7AM - 7PM",
    imageUrl: "https://images.unsplash.com/photo-1614629396115-6275fe8757c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Premium parking spot in Hyderabad's tech district. Electric vehicle charger available. Perfect for daily workers in the area or visitors to nearby tech campuses.",
    owner: {
      name: "Lakshmi Rao",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      joinedDate: "May 2023"
    },
    features: ["EV Charger", "Gated", "Security Guard", "Covered"]
  }
];

const Index = () => {
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredSpots, setFilteredSpots] = useState(parkingSpots);
  const [heroSearchTerm, setHeroSearchTerm] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have a search term from the hero section
    const searchTerm = window.sessionStorage.getItem('heroSearch');
    if (searchTerm) {
      setHeroSearchTerm(searchTerm);
      window.sessionStorage.removeItem('heroSearch'); // Clear after use
    }

    // Listen for hero search events
    const handleHeroSearch = (event: CustomEvent<string>) => {
      setHeroSearchTerm(event.detail);
    };

    window.addEventListener('heroSearch', handleHeroSearch as EventListener);
    
    return () => {
      window.removeEventListener('heroSearch', handleHeroSearch as EventListener);
    };
  }, []);

  const handleSpotSelect = (spot: any) => {
    // Find the full spot data from our list
    const fullSpot = parkingSpots.find(ps => ps.id === spot.id) || parkingSpots[0];
    setSelectedSpot(fullSpot);
    setIsDialogOpen(true);
  };

  const handleSearch = (filters: SearchFiltersType) => {
    let results = [...parkingSpots];

    // Filter by location
    if (filters.location) {
      const searchTerm = filters.location.toLowerCase();
      results = results.filter(
        spot => spot.name.toLowerCase().includes(searchTerm) || 
                spot.address.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      
      if (max) {
        results = results.filter(
          spot => {
            const price = parseInt(spot.price);
            return price >= min && price <= max;
          }
        );
      } else {
        // For "300+" case
        results = results.filter(
          spot => parseInt(spot.price) >= min
        );
      }
    }

    // Filter by availability
    if (filters.availability === 'available') {
      results = results.filter(spot => spot.availability.includes('24/7') || !spot.availability.includes('Weekdays'));
    }

    setFilteredSpots(results);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Map Section */}
        <section className="py-12 px-6 bg-gray-50 map-section">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary mb-3">Find Available Spots Across India</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our interactive map to find the perfect parking spot near your destination in top Indian cities
              </p>
            </div>
            
            {/* Search Filters */}
            <div className="mb-8">
              <SearchFilters onSearch={handleSearch} initialSearch={heroSearchTerm || undefined} />
            </div>
            
            <MapView onSpotSelect={handleSpotSelect} />
            
            <div className="text-center mt-4 text-sm text-gray-500">
              Click on a marker to view details and book a spot
            </div>
          </div>
        </section>
        
        {/* Featured Spots Section */}
        <section className="py-12 px-6">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary mb-3">Featured Parking Spots</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover top-rated parking spots from our community of spot owners across India
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredSpots.map((spot) => (
                <ParkingSpotCard
                  key={spot.id}
                  id={spot.id}
                  name={spot.name}
                  address={spot.address}
                  price={spot.price}
                  rating={spot.rating}
                  distance={spot.distance}
                  availability={spot.availability}
                  imageUrl={spot.imageUrl}
                  onClick={() => handleSpotSelect(spot)}
                />
              ))}
            </div>
            
            {filteredSpots.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No parking spots match your search criteria. Please try different filters.
              </div>
            )}
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-secondary mb-3">How SpotScape Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes it easy to find or list parking spots in your area
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureHighlight
                icon={<MapPin className="h-8 w-8" />}
                title="Find Nearby Spots"
                description="Search for available parking spots near your destination using our interactive map"
              />
              <FeatureHighlight
                icon={<Clock className="h-8 w-8" />}
                title="Book in Advance"
                description="Reserve your parking spot ahead of time to ensure availability when you arrive"
              />
              <FeatureHighlight
                icon={<CreditCard className="h-8 w-8" />}
                title="Easy Payment"
                description="Pay securely through our platform with various UPI and card payment methods"
              />
              <FeatureHighlight
                icon={<CarFront className="h-8 w-8" />}
                title="Park Hassle-Free"
                description="Enjoy your reserved spot without the stress of looking for parking"
              />
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-secondary text-white py-8 px-6">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2" />
                  <span className="font-poppins font-bold text-xl">SpotScape</span>
                </div>
                <p className="mt-2 text-sm text-gray-300 max-w-xs">
                  Connecting parking spot owners with people who need a place to park across India
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Company</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">About Us</a></li>
                    <li><a href="#" className="hover:text-white">How It Works</a></li>
                    <li><a href="#" className="hover:text-white">Careers</a></li>
                    <li><a href="#" className="hover:text-white">Press</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Support</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">Help Center</a></li>
                    <li><a href="#" className="hover:text-white">Safety</a></li>
                    <li><a href="#" className="hover:text-white">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white">Community</a></li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Legal</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li><a href="#" className="hover:text-white">Terms</a></li>
                    <li><a href="#" className="hover:text-white">Privacy</a></li>
                    <li><a href="#" className="hover:text-white">Cookies</a></li>
                    <li><a href="#" className="hover:text-white">Licenses</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400 text-center">
              &copy; {new Date().getFullYear()} SpotScape. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
      
      {/* Spot Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
          {selectedSpot && (
            <SpotDetail 
              spot={selectedSpot} 
              onClose={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
