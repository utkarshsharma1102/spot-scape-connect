
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ParkingMeter, Users, Calendar, DollarSign, PlusCircle, Edit, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  
  // Sample data - would come from a database
  const [parkingSpots, setParkingSpots] = useState([
    { 
      id: 1, 
      name: "Delhi Central Park", 
      location: "Central Delhi", 
      price: "200", 
      bookings: 24, 
      revenue: 4800, 
      status: "active" 
    },
    { 
      id: 2, 
      name: "Mumbai Marine Drive", 
      location: "South Mumbai", 
      price: "350", 
      bookings: 42, 
      revenue: 14700, 
      status: "active" 
    },
    { 
      id: 3, 
      name: "Bangalore Tech Park", 
      location: "Whitefield", 
      price: "250", 
      bookings: 18, 
      revenue: 4500, 
      status: "inactive" 
    },
  ]);
  
  const [bookings, setBookings] = useState([
    { 
      id: 1, 
      spotName: "Delhi Central Park", 
      userName: "Raj Sharma", 
      date: "2025-06-15", 
      time: "14:00", 
      duration: 2, 
      amount: 400, 
      status: "upcoming" 
    },
    { 
      id: 2, 
      spotName: "Mumbai Marine Drive", 
      userName: "Priya Patel", 
      date: "2025-06-10", 
      time: "10:00", 
      duration: 3, 
      amount: 1050, 
      status: "upcoming" 
    },
    { 
      id: 3, 
      spotName: "Delhi Central Park", 
      userName: "Amit Kumar", 
      date: "2025-05-28", 
      time: "09:00", 
      duration: 4, 
      amount: 800, 
      status: "completed" 
    },
  ]);
  
  const totalRevenue = parkingSpots.reduce((sum, spot) => sum + spot.revenue, 0);
  const totalBookings = parkingSpots.reduce((sum, spot) => sum + spot.bookings, 0);
  const activeSpots = parkingSpots.filter(spot => spot.status === "active").length;

  const handleAddSpot = () => {
    toast({
      title: "Feature coming soon",
      description: "Adding new parking spots will be available soon.",
    });
  };

  const handleEditSpot = (spotId: number) => {
    toast({
      title: "Editing spot",
      description: `Editing parking spot #${spotId}`,
    });
  };

  const handleDeleteSpot = (spotId: number) => {
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
    });
  };

  const handleApproveBooking = (bookingId: number) => {
    toast({
      title: "Booking approved",
      description: `Booking #${bookingId} has been approved`,
    });
  };

  const handleRejectBooking = (bookingId: number) => {
    toast({
      title: "Booking rejected",
      description: `Booking #${bookingId} has been rejected`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-muted-foreground">Manage your parking spots and bookings</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBookings}</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Spots</CardTitle>
                <ParkingMeter className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeSpots}</div>
                <p className="text-xs text-muted-foreground">Out of {parkingSpots.length} total spots</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="spots">
            <TabsList>
              <TabsTrigger value="spots">My Parking Spots</TabsTrigger>
              <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="spots" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Manage Parking Spots</CardTitle>
                    <CardDescription>View and edit your listed parking spots</CardDescription>
                  </div>
                  <Button onClick={handleAddSpot} className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add New Spot
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Price (₹/hr)</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Revenue (₹)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parkingSpots.map((spot) => (
                        <TableRow key={spot.id}>
                          <TableCell className="font-medium">{spot.name}</TableCell>
                          <TableCell>{spot.location}</TableCell>
                          <TableCell>₹{spot.price}</TableCell>
                          <TableCell>{spot.bookings}</TableCell>
                          <TableCell>₹{spot.revenue}</TableCell>
                          <TableCell>
                            <Badge variant={spot.status === "active" ? "default" : "secondary"}>
                              {spot.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEditSpot(spot.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteSpot(spot.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Requests</CardTitle>
                  <CardDescription>Manage bookings for your parking spots</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Label htmlFor="filter" className="whitespace-nowrap">Filter:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="filter">
                        <SelectValue placeholder="Filter bookings" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Bookings</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parking Spot</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.spotName}</TableCell>
                          <TableCell>{booking.userName}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{booking.date}</span>
                              <span className="text-muted-foreground">{booking.time}</span>
                            </div>
                          </TableCell>
                          <TableCell>{booking.duration} hr</TableCell>
                          <TableCell>₹{booking.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                booking.status === 'upcoming' ? 'default' : 
                                booking.status === 'completed' ? 'secondary' : 
                                'destructive'
                              }
                            >
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {booking.status === 'upcoming' && (
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleApproveBooking(booking.id)}>
                                  Approve
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => handleRejectBooking(booking.id)}>
                                  Reject
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
