import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBy from '../components/FilterBy';
import DoctorCard from '../components/DoctorCard';
import Intro from '../components/Intro';
import Pagination from '../components/Pagination';
import {
  setDoctors,
  setLoading,
  setCurrentPage,
  filterDoctors,
} from '../store/doctorSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { doctors, loading, filteredDoctors, currentPage, doctorsPerPage } =
    useSelector((state) => state.doctors);

  const fetchDoctors = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('http://localhost:3001/doctors');
      const data = await response.json();
      dispatch(setDoctors(data));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleFilterChange = (filters) => {
    dispatch(filterDoctors(filters));
  };

  // Calculate pagination
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
