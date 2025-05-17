
import { format } from 'date-fns';

export interface Booking {
  id: number;
  spotId: number;
  spotName: string;
  date: string;
  time: string;
  duration: number;
  price: string;
  totalPrice: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookedAt: string;
  paymentMethod?: string;
}

export interface PaymentDetails {
  method: string;
  amount: number;
  currency: string;
  status: string;
  transactionId: string;
}

const BOOKINGS_STORAGE_KEY = 'parkingBookings';

export const bookingService = {
  getAllBookings: (): Booking[] => {
    const bookingsJson = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return bookingsJson ? JSON.parse(bookingsJson) : [];
  },

  getUpcomingBookings: (): Booking[] => {
    const allBookings = bookingService.getAllBookings();
    return allBookings.filter(booking => booking.status === 'upcoming');
  },

  getPastBookings: (): Booking[] => {
    const allBookings = bookingService.getAllBookings();
    return allBookings.filter(booking => booking.status !== 'upcoming');
  },

  createBooking: (
    spotId: number,
    spotName: string,
    date: Date,
    time: string,
    duration: number,
    price: string,
    paymentMethod: string = 'card'
  ): Booking => {
    const allBookings = bookingService.getAllBookings();
    
    const priceValue = parseInt(price.replace(/\D/g, ''));
    const totalPrice = duration * priceValue;
    
    const newBooking: Booking = {
      id: Date.now(), // Use timestamp as unique ID
      spotId,
      spotName,
      date: format(date, "yyyy-MM-dd"),
      time,
      duration,
      price,
      totalPrice,
      status: 'upcoming',
      bookedAt: new Date().toISOString(),
      paymentMethod
    };
    
    const updatedBookings = [...allBookings, newBooking];
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings));
    
    return newBooking;
  },
  
  cancelBooking: (bookingId: number): boolean => {
    const allBookings = bookingService.getAllBookings();
    const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      return false;
    }
    
    allBookings[bookingIndex].status = 'cancelled';
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(allBookings));
    return true;
  },
  
  completeBooking: (bookingId: number): boolean => {
    const allBookings = bookingService.getAllBookings();
    const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId);
    
    if (bookingIndex === -1) {
      return false;
    }
    
    allBookings[bookingIndex].status = 'completed';
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(allBookings));
    return true;
  },
  
  processPayment: async (amount: number, method: string): Promise<PaymentDetails> => {
    // This is a mock implementation for a payment gateway
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // Simulate a successful payment 95% of the time
        if (Math.random() < 0.95) {
          resolve({
            method,
            amount,
            currency: 'INR',
            status: 'completed',
            transactionId: `TXN${Date.now()}`
          });
        } else {
          reject(new Error('Payment processing failed. Please try again.'));
        }
      }, 2000);
    });
  }
};
