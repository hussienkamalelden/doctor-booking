import React, { useState } from 'react';

const DoctorModal = ({ doctor, isOpen, onClose, onBookAppointment }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSlot) {
      setIsSubmitting(true);
      setErrorMessage(''); // Clear any previous error messages
      setBookingStatus(null);
      try {
        await onBookAppointment(doctor, selectedSlot);
        setBookingStatus('success');
        // Close the modal after 2 seconds
        setTimeout(() => {
          onClose();
          setBookingStatus(null);
          setSelectedSlot('');
        }, 1000);
      } catch (error) {
        setBookingStatus('error');
        setErrorMessage(
          error.message || 'Failed to book appointment. Please try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{doctor.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Specialty</h3>
              <p className="text-gray-600">{doctor.specialty.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Location</h3>
              <p className="text-gray-600">{doctor.location}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="timeSlot"
              className="block text-lg font-semibold text-gray-700 mb-2"
            >
              Select Available Time Slot
            </label>
            <select
              id="timeSlot"
              value={selectedSlot}
              onChange={(e) => {
                setSelectedSlot(e.target.value);
                setErrorMessage(''); // Clear error when user changes selection
                setBookingStatus(null);
              }}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={isSubmitting}
            >
              <option value="">Select a time slot</option>
              {doctor.slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          {bookingStatus === 'success' && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              Appointment booked successfully!
            </div>
          )}

          {bookingStatus === 'error' && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {errorMessage}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!selectedSlot || isSubmitting}
              className={`px-6 py-2 rounded-md transition-colors duration-300 ${
                selectedSlot && !isSubmitting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;
