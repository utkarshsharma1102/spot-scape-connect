
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, MapPin, Phone, Mail, User, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  // Placeholder data - would come from authentication provider
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    avatarUrl: ""
  });

  // Placeholder data - would come from database
  const bookings = [
    {
      id: 1,
      spotName: "Delhi Central Park",
      date: "2025-06-15",
      time: "14:00",
      duration: 2,
      price: "₹400",
      status: "upcoming"
    },
    {
      id: 2,
      spotName: "Mumbai Marine Drive",
      date: "2025-06-10",
      time: "10:00",
      duration: 3,
      price: "₹1050",
      status: "upcoming"
    },
    {
      id: 3,
      spotName: "Chennai Marina Beach",
      date: "2025-05-28",
      time: "09:00",
      duration: 4,
      price: "₹720",
      status: "completed"
    }
  ];

  const { toast } = useToast();

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for profile update logic
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
  };

  const handleLogout = () => {
    // Placeholder for logout logic
    console.log("Logging out...");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleCancelBooking = (bookingId: number) => {
    // Placeholder for cancel booking logic
    console.log("Cancelling booking:", bookingId);
    toast({
      title: "Booking cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile sidebar */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="mt-4">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user.phone}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="bookings">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="settings">Account Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bookings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Bookings</CardTitle>
                    <CardDescription>View and manage your parking bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookings.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Parking Spot</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map((booking) => (
                            <TableRow key={booking.id}>
                              <TableCell className="font-medium">{booking.spotName}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span className="flex items-center">
                                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                    {booking.date}
                                  </span>
                                  <span className="flex items-center text-muted-foreground">
                                    <Clock className="h-3.5 w-3.5 mr-1.5" />
                                    {booking.time}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>{booking.duration} hr</TableCell>
                              <TableCell>{booking.price}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={booking.status === 'upcoming' ? 'default' : 'secondary'}
                                >
                                  {booking.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {booking.status === 'upcoming' && (
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleCancelBooking(booking.id)}
                                  >
                                    Cancel
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">You don't have any bookings yet.</p>
                        <Button asChild className="mt-4">
                          <Link to="/">Find Parking</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Update your profile information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="name"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="phone"
                            value={user.phone}
                            onChange={(e) => setUser({...user, phone: e.target.value})}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Update Profile
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
