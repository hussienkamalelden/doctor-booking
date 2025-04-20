import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent">
              Doctor Booking
            </span>
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/appointments"
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 font-medium"
            >
              Appointments
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
