
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, MapPin, Plus, User, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center">
            <MapPin className="h-6 w-6 text-primary mr-2" />
            <span className="font-poppins font-bold text-xl text-secondary">SpotScape</span>
          </Link>
          
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search for parking spots..." 
              className="pl-10 w-[300px] rounded-full bg-gray-50" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex items-center gap-2">
            <Plus size={16} />
            <span>List Your Spot</span>
          </Button>
          
          <Button className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90">
            <LogIn size={16} />
            <span>Sign In</span>
          </Button>
          
          <Button variant="ghost" className="p-2 md:hidden">
            <Search size={20} />
          </Button>
          
          <Button variant="ghost" className="p-2 relative">
            <User size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
