
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  MapPin, Star, Clock, Shield, Calendar as CalendarIcon, 
  Car, Info, ChevronLeft, User, Phone 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SpotDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");

  // Mock spot data - in a real app, you would fetch this data based on the ID
  const spot = {
    id,
    name: "Downtown Secure Parking",
    address: "123 Main St, Downtown",
    price: "5.00",
    rating: 4.8,
    totalRatings: 124,
    distance: "0.5 miles",
    availability: "Available 24/7",
    imageUrl: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    description: "Secure parking spot in the heart of downtown. Easy access to restaurants, shops and entertainment venues. Well-lit area with 24/7 security cameras.",
    owner: {
      name: "Michael Johnson",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      joinedDate: "March 2023",
      responseRate: "97%",
      responseTime: "Within an hour"
    },
    features: ["Security Camera", "Well Lit", "Covered", "24/7 Access"],
    rules: ["No overnight parking", "No large vehicles", "No blocking other spots"]
  };

  const handleBookNow = () => {
    toast({
      title: "Proceeding to booking",
      description: `For ${spot.name} on ${date?.toLocaleDateString()}`,
    });
    navigate(`/booking/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} />
          Back to results
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Spot details card */}
            <Card>
              <div className="h-64 md:h-80 bg-gray-200 relative" style={{ 
                backgroundImage: `url(${spot.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">
                  ${spot.price}/hr
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-secondary">{spot.name}</h1>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{spot.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({spot.totalRatings})</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-500 mt-2">
                  <MapPin size={16} className="mr-1" />
                  <span>{spot.address} • {spot.distance}</span>
                </div>

                <div className="flex items-center text-gray-500 mt-1">
                  <Clock size={16} className="mr-1" />
                  <span>{spot.availability}</span>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{spot.description}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {spot.features.map((feature, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Spot Rules</h2>
                  <ul className="list-disc list-inside text-gray-600">
                    {spot.rules.map((rule, index) => (
                      <li key={index}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Owner information */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About the Owner</h2>
                
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={spot.owner.image} 
                      alt={spot.owner.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{spot.owner.name}</h3>
                    <p className="text-gray-500">Member since {spot.owner.joinedDate}</p>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <User size={14} className="mr-1" />
                        <span>Response rate: {spot.owner.responseRate}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-1" />
                        <span>Response time: {spot.owner.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Phone size={16} />
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking card */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Book this spot</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <div className="border rounded-md p-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Time</label>
                      <select 
                        className="w-full border rounded-md p-2" 
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      >
                        {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'].map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">End Time</label>
                      <select 
                        className="w-full border rounded-md p-2"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      >
                        {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'].map(time => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span>Rate:</span>
                      <span>${spot.price}/hr</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Duration:</span>
                      <span>2 hours</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Subtotal:</span>
                      <span>${(Number(spot.price) * 2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Service fee:</span>
                      <span>${(Number(spot.price) * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-gray-200">
                      <span>Total:</span>
                      <span>${(Number(spot.price) * 2.1).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                  
                  <div className="flex items-center justify-center text-xs text-gray-500">
                    <Shield size={12} className="mr-1" />
                    <span>Secure booking • Free cancellation up to 24 hours before</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpotDetailsPage;
