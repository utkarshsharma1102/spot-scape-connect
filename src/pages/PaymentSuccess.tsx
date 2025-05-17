
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { CheckCircle, CreditCard, Clock, Calendar } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center py-12 px-6">
        <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="mb-6 text-green-500 flex justify-center">
            <CheckCircle size={80} />
          </div>
          
          <h1 className="text-3xl font-bold text-secondary mb-4">Payment Successful!</h1>
          
          <p className="text-gray-600 mb-8">
            Your parking spot has been successfully booked. You can view your booking details below or in your profile.
          </p>
          
          <div className="bg-muted/30 p-4 rounded-lg mb-8">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-secondary" />
                <span className="text-gray-600">Payment Method: Card</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-secondary" />
                <span className="text-gray-600">Booking ID: #{Math.floor(Math.random() * 10000)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              Book Another Spot
            </Button>
            
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              onClick={() => navigate('/profile')}
            >
              View My Bookings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
