import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppointmentCard from '../components/AppointmentCard';
import {
  setAppointments,
  setLoading,
  setError,
} from '../store/appointmentSlice';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, loading, error } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        dispatch(setLoading(true));
        const response = await fetch('http://localhost:3001/appointments');
        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }
        const data = await response.json();
        dispatch(setAppointments(data));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.message));
        dispatch(setLoading(false));
      }
    };

    fetchAppointments();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600">Loading appointments...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-emerald-600 mb-6">
            Your Appointments
          </h1>
          <p className="text-xl text-gray-600">
            View your scheduled appointments
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              You don't have any appointments scheduled.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
