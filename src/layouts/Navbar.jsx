import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-emerald-800 transition-all duration-300">
              Doctor Booking
            </span>
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/appointments"
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-sm hover:shadow-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10">Appointments</span>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
