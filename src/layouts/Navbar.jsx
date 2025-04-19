import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-800">
              Doctor Booking
            </span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/appointments"
              className="text-gray-600 hover:text-gray-900"
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
