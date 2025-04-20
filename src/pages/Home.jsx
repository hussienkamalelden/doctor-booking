import React, { useState, useEffect } from 'react';
import FilterBy from '../components/FilterBy';
import DoctorCard from '../components/DoctorCard';
import Intro from '../components/Intro';

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:3001/doctors');
      const data = await response.json();
      setDoctors(data);
      setFilteredDoctors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...doctors];

    if (filters.specialty) {
      filtered = filtered.filter(
        (doctor) => doctor.specialty.id === filters.specialty.value
      );
    }

    if (filters.availability) {
      filtered = filtered.filter((doctor) =>
        doctor.slots.includes(filters.availability.value)
      );
    }

    setFilteredDoctors(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Calculate pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-emerald-600 mb-6">
            Welcome to Doctor Booking
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Book your appointments with the best doctors in town
          </p>
        </div>

        <Intro />

        <section className="mt-10">
          <FilterBy onFilterChange={handleFilterChange} />
        </section>

        <section className="mt-10">
          {loading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          ) : filteredDoctors.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">
                No doctors found matching your criteria
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentDoctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    onDoctorUpdate={fetchDoctors}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 space-x-2">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                          currentPage === number
                            ? 'bg-emerald-600 text-white font-medium shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-200'
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300'
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
