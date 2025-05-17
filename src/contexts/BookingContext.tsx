
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Booking } from '../services/bookingService';

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: number) => void;
  searchFilters: SearchFilters | null;
  setSearchFilters: (filters: SearchFilters | null) => void;
}

export interface SearchFilters {
  location: string;
  date?: Date;
  priceRange: string;
  availability: string;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchFilters, setSearchFilters] = useState<SearchFilters | null>(null);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem('bookings');
    if (storedBookings) {
      try {
        setBookings(JSON.parse(storedBookings));
      } catch (error) {
        console.error('Error parsing bookings from localStorage:', error);
      }
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const cancelBooking = (bookingId: number) => {
    setBookings(prev => prev.filter(booking => booking.id !== bookingId));
  };

  return (
    <BookingContext.Provider 
      value={{ 
        bookings, 
        addBooking, 
        cancelBooking, 
        searchFilters, 
        setSearchFilters 
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
