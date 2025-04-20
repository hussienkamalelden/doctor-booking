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
      setErrorMessage('');
      setBookingStatus(null);
      try {
        await onBookAppointment(doctor, selectedSlot);
        setBookingStatus('success');
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">{doctor.name}</h2>
              <p className="text-emerald-100 mt-1">{doctor.specialty.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors duration-200"
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
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Location
                </h3>
                <p className="text-gray-800">{doctor.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Next Available
                </h3>
                <p className="text-gray-800">
                  {doctor.slots[0] || 'No slots available'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="timeSlot"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Select Available Time Slot
              </label>
              <select
                id="timeSlot"
                value={selectedSlot}
                onChange={(e) => {
                  setSelectedSlot(e.target.value);
                  setErrorMessage('');
                  setBookingStatus(null);
                }}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
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
              <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Appointment booked successfully!
                </div>
              </div>
            )}

            {bookingStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {errorMessage}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!selectedSlot || isSubmitting}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedSlot && !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Booking...
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
