
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from "lucide-react";
import AuthForm from '@/components/auth/AuthForm';

const Auth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="py-6 px-6 flex justify-center">
        <Link to="/" className="flex items-center">
          <MapPin className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl text-secondary">SpotScape</span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-4">
        <AuthForm />
      </div>
      
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>© 2025 SpotScape. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Auth;
