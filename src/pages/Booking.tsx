
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, ArrowRight, CreditCard, Calendar, Clock, 
  ChevronLeft, Shield, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookingStep, setBookingStep] = useState('details');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [loading, setLoading] = useState(false);
  
  // Mock spot data
  const spot = {
    id,
    name: "Downtown Secure Parking",
    address: "123 Main St, Downtown",
    price: "5.00",
    date: "April 12, 2025",
    startTime: "10:00 AM",
    endTime: "12:00 PM",
    imageUrl: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
  };

  const handleConfirmBooking = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setBookingStep('confirmation');
      toast({
        title: "Booking confirmed!",
        description: "Your parking spot has been successfully booked.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Back button */}
        {bookingStep !== 'confirmation' && (
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1 text-gray-600 hover:text-gray-900"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} />
            Back to spot details
          </Button>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Booking steps */}
          {bookingStep !== 'confirmation' && (
            <div className="mb-6">
              <div className="flex items-center justify-center">
                <div className={`flex items-center ${bookingStep === 'details' ? 'text-primary' : 'text-gray-400'}`}>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                    1
                  </div>
                  <span className="ml-2">Booking Details</span>
                </div>
                <div className="w-16 h-0.5 mx-2 bg-gray-200"></div>
                <div className={`flex items-center ${bookingStep === 'payment' ? 'text-primary' : 'text-gray-400'}`}>
                  <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center font-medium">
                    2
                  </div>
                  <span className="ml-2">Payment</span>
                </div>
              </div>
            </div>
          )}

          {bookingStep === 'details' && (
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-secondary mb-6">Booking Details</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-4">Reservation Information</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                        <span>Date: {spot.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-500 mr-2" />
                        <span>Time: {spot.startTime} - {spot.endTime}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                        <span>Location: {spot.address}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Vehicle Information</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="license">License Plate</Label>
                          <Input id="license" placeholder="Enter your license plate number" />
                        </div>
                        <div>
                          <Label htmlFor="make">Vehicle Make</Label>
                          <Input id="make" placeholder="e.g. Toyota, Honda, etc." />
                        </div>
                        <div>
                          <Label htmlFor="model">Vehicle Model</Label>
                          <Input id="model" placeholder="e.g. Camry, Civic, etc." />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <h3 className="font-semibold mb-3">Booking Summary</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">{spot.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Date</span>
                        <span>{spot.date}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Time</span>
                        <span>{spot.startTime} - {spot.endTime}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Duration</span>
                        <span>2 hours</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Rate</span>
                        <span>${spot.price}/hr</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal</span>
                        <span>${(Number(spot.price) * 2).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Service fee</span>
                        <span>${(Number(spot.price) * 0.1).toFixed(2)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(Number(spot.price) * 2.1).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mb-6 flex items-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      <span>Your booking is protected by our Secure Booking Guarantee</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => setBookingStep('payment')}
                    >
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {bookingStep === 'payment' && (
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold text-secondary mb-6">Payment</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
                      <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="credit">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="credit" className="space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="paypal" className="flex flex-col items-center justify-center py-8">
                        <div className="text-center">
                          <CreditCard className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                          <p className="mb-4">Click the button below to pay with PayPal</p>
                          <Button className="bg-blue-500 hover:bg-blue-600">
                            Continue with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Billing Information</h3>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="address">Billing Address</Label>
                          <Input id="address" placeholder="Street address" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input id="city" placeholder="City" />
                          </div>
                          <div>
                            <Label htmlFor="zipCode">Zip Code</Label>
                            <Input id="zipCode" placeholder="Zip code" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 p-4 rounded-md mb-6">
                      <h3 className="font-semibold mb-3">Booking Summary</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">{spot.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Date</span>
                        <span>{spot.date}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Time</span>
                        <span>{spot.startTime} - {spot.endTime}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>${(Number(spot.price) * 2.1).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mb-6 flex items-center text-sm text-gray-600">
                      <Shield className="h-4 w-4 mr-2 text-primary" />
                      <span>Your payment is secure and encrypted</span>
                    </div>
                    
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleConfirmBooking}
                      disabled={loading}
                    >
                      {loading ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Confirm and Pay
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {bookingStep === 'confirmation' && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-secondary mb-2">Booking Confirmed!</h1>
                  <p className="text-gray-600 mb-6">Your booking has been successfully confirmed.</p>
                  
                  <div className="max-w-md w-full bg-gray-50 rounded-lg p-6 text-left">
                    <h2 className="font-semibold mb-4">{spot.name}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p>{spot.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p>{spot.startTime} - {spot.endTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p>{spot.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <p>PK-{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col items-center space-y-3">
                    <p className="flex items-center text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 mr-2 text-primary" />
                      <span>A confirmation email has been sent with all details</span>
                    </p>
                    <Button 
                      variant="outline" 
                      className="mr-4"
                      onClick={() => navigate('/dashboard')}
                    >
                      View in Dashboard
                    </Button>
                    <Button 
                      variant="link"
                      onClick={() => navigate('/')}
                    >
                      Return to Home
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookingPage;
