
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CalendarRange, Car, CreditCard, LayoutDashboard, ListPlus, 
  LogOut, MapPin, Settings, Star, Trash, UserCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock user data
  const user = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    joined: "January 2023",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg"
  };

  // Mock bookings data
  const bookings = [
    {
      id: "BK-1234",
      spotName: "Downtown Secure Parking",
      address: "123 Main St, Downtown",
      date: "April 12, 2025",
      time: "10:00 AM - 12:00 PM",
      price: "$10.50",
      status: "upcoming"
    },
    {
      id: "BK-5678",
      spotName: "Riverside Parking Space",
      address: "456 River Ave, Riverside",
      date: "April 15, 2025",
      time: "2:00 PM - 5:00 PM",
      price: "$10.50",
      status: "upcoming"
    },
    {
      id: "BK-9012",
      spotName: "Central Market Parking",
      address: "789 Market St, City Center",
      date: "March 20, 2025",
      time: "9:00 AM - 11:00 AM",
      price: "$8.50",
      status: "completed"
    }
  ];

  // Mock listings data
  const listings = [
    {
      id: 1,
      name: "Home Driveway Spot",
      address: "123 Maple St, Your City",
      price: "4.00",
      status: "active",
      bookings: 8
    },
    {
      id: 2,
      name: "Work Parking Space",
      address: "456 Office Blvd, Business District",
      price: "5.50",
      status: "active",
      bookings: 12
    }
  ];

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking cancelled",
      description: `Booking ${bookingId} has been cancelled.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">Member since {user.joined}</p>
                </div>
                
                <nav>
                  <ul className="space-y-1">
                    <li>
                      <Button 
                        variant={activeTab === 'bookings' ? 'secondary' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('bookings')}
                      >
                        <CalendarRange className="mr-2 h-4 w-4" />
                        My Bookings
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={activeTab === 'listings' ? 'secondary' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('listings')}
                      >
                        <Car className="mr-2 h-4 w-4" />
                        My Listings
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={activeTab === 'payments' ? 'secondary' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('payments')}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Payment Methods
                      </Button>
                    </li>
                    <li>
                      <Button 
                        variant={activeTab === 'profile' ? 'secondary' : 'ghost'} 
                        className="w-full justify-start"
                        onClick={() => setActiveTab('profile')}
                      >
                        <UserCircle className="mr-2 h-4 w-4" />
                        Profile Settings
                      </Button>
                    </li>
                  </ul>
                </nav>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <Button variant="outline" className="w-full text-red-500 hover:text-red-700 hover:border-red-200">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="lg:w-3/4">
            {activeTab === 'bookings' && (
              <>
                <h1 className="text-2xl font-bold text-secondary mb-6">My Bookings</h1>
                
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    {bookings.filter(b => b.status === 'upcoming').map((booking) => (
                      <Card key={booking.id} className="mb-4">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.spotName}</h3>
                              <div className="flex items-center text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1" />
                                <span>{booking.address}</span>
                              </div>
                              <div className="mt-2">
                                <span className="text-sm font-medium">Date: </span>
                                <span className="text-sm text-gray-700">{booking.date}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Time: </span>
                                <span className="text-sm text-gray-700">{booking.time}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Booking ID: </span>
                                <span className="text-sm text-gray-700">{booking.id}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 sm:text-right flex flex-col justify-between items-end">
                              <span className="text-lg font-bold">{booking.price}</span>
                              <div className="flex space-x-2 mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => navigate(`/booking/${booking.id}`)}
                                >
                                  View Details
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    {bookings.filter(b => b.status === 'completed').map((booking) => (
                      <Card key={booking.id} className="mb-4">
                        <CardContent className="p-4 sm:p-6">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.spotName}</h3>
                              <div className="flex items-center text-gray-500 mt-1">
                                <MapPin size={14} className="mr-1" />
                                <span>{booking.address}</span>
                              </div>
                              <div className="mt-2">
                                <span className="text-sm font-medium">Date: </span>
                                <span className="text-sm text-gray-700">{booking.date}</span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Time: </span>
                                <span className="text-sm text-gray-700">{booking.time}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 sm:text-right">
                              <span className="text-lg font-bold">{booking.price}</span>
                              <div className="mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full sm:w-auto"
                                  onClick={() => {
                                    toast({
                                      title: "Leave a review",
                                      description: "Thank you for your feedback!",
                                    });
                                  }}
                                >
                                  <Star className="mr-1 h-3 w-3" />
                                  Leave Review
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="cancelled">
                    <div className="text-center py-12">
                      <p className="text-gray-500">You don't have any cancelled bookings.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
            
            {activeTab === 'listings' && (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-secondary">My Listings</h1>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                      toast({
                        title: "Create listing",
                        description: "The listing creation feature is coming soon.",
                      });
                    }}
                  >
                    <ListPlus className="mr-2 h-4 w-4" />
                    Add New Listing
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <div className="h-40 bg-gray-200"></div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">{listing.name}</h3>
                        <div className="flex items-center text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{listing.address}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-bold">${listing.price}/hr</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'
                          }`}>
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          {listing.bookings} bookings total
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View Calendar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
            
            {activeTab === 'payments' && (
              <>
                <h1 className="text-2xl font-bold text-secondary mb-6">Payment Methods</h1>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Saved Payment Methods</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <CreditCard className="h-8 w-8 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">Visa ending in 1234</p>
                            <p className="text-sm text-gray-500">Expires 05/25</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <CreditCard className="h-8 w-8 text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">Mastercard ending in 5678</p>
                            <p className="text-sm text-gray-500">Expires 08/26</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="mt-6">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Billing History</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">Downtown Secure Parking</p>
                          <p className="text-sm text-gray-500">April 10, 2025</p>
                        </div>
                        <span className="font-medium">$10.50</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">Central Market Parking</p>
                          <p className="text-sm text-gray-500">March 20, 2025</p>
                        </div>
                        <span className="font-medium">$8.50</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">Riverside Parking Space</p>
                          <p className="text-sm text-gray-500">March 15, 2025</p>
                        </div>
                        <span className="font-medium">$7.00</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {activeTab === 'profile' && (
              <>
                <h1 className="text-2xl font-bold text-secondary mb-6">Profile Settings</h1>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Personal Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-md p-2"
                          defaultValue="Jane"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-md p-2"
                          defaultValue="Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full border rounded-md p-2"
                          defaultValue="jane.smith@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full border rounded-md p-2"
                          defaultValue="(555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bg-primary hover:bg-primary/90">
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Change Password</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <input 
                          type="password" 
                          className="w-full border rounded-md p-2"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input 
                          type="password" 
                          className="w-full border rounded-md p-2"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <input 
                          type="password" 
                          className="w-full border rounded-md p-2"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bg-primary hover:bg-primary/90">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive booking confirmations and updates</p>
                        </div>
                        <input type="checkbox" className="h-5 w-5" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive text messages about your bookings</p>
                        </div>
                        <input type="checkbox" className="h-5 w-5" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing Emails</p>
                          <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                        </div>
                        <input type="checkbox" className="h-5 w-5" />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button className="bg-primary hover:bg-primary/90">
                        Save Preferences
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
