import React from 'react';
import FilterBy from '../components/FilterBy';
import DoctorCard from '../components/DoctorCard';
import doctorImg from '../assets/images/doctors/doctor.jpg';

const Home = () => {
  const handleFilterChange = (filters) => {
    console.log('Filters changed:', filters);
    // Update your data based on these filters
  };

  const doctor = {
    name: 'Dr. John Smith',
    specialty: 'Cardiology',
    availability: 'Available Today',
    location: 'Downtown Medical Center',
    imageUrl: doctorImg,
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Doctor Booking
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointments with the best doctors in town
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Section */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Easy Booking</h2>
                <p className="text-gray-600">
                  Schedule your appointments with just a few clicks
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Expert Doctors</h2>
                <p className="text-gray-600">
                  Access to qualified and experienced medical professionals
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">24/7 Support</h2>
                <p className="text-gray-600">
                  Get assistance whenever you need it
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <FilterBy onFilterChange={handleFilterChange} />
        </section>
        <section className="mt-10">
          <DoctorCard doctor={doctor} />
        </section>
      </div>
    </div>
  );
};

export default Home;
