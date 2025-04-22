import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setModalState,
  setSelectedSlot,
  setSubmitting,
  setBookingStatus,
  setErrorMessage,
  setModalVisibility,
  resetModalState,
} from '../store/appointmentSlice';
import { updateDoctorSlots } from '../store/doctorSlice';

const DoctorModal = React.memo(({ doctor, isOpen, onBookAppointment }) => {
  const dispatch = useDispatch();
  const { selectedSlot, isSubmitting, bookingStatus, errorMessage, isVisible } =
    useSelector((state) => state.appointments.modalState);

  useEffect(() => {
    if (isOpen) {
      dispatch(setModalVisibility(true));
    } else {
      dispatch(setModalVisibility(false));
    }
  }, [isOpen, dispatch]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (selectedSlot) {
        dispatch(setSubmitting(true));
        dispatch(setErrorMessage(''));
        dispatch(setBookingStatus(null));
        try {
          await onBookAppointment(selectedSlot);
          dispatch(setBookingStatus('success'));
          setTimeout(() => {
            dispatch(resetModalState());
          }, 1000);
        } catch (error) {
          dispatch(setBookingStatus('error'));
          dispatch(
            setErrorMessage(
              error.message || 'Failed to book appointment. Please try again.'
            )
          );
        } finally {
          dispatch(setSubmitting(false));
        }
      }
    },
    [selectedSlot, onBookAppointment, dispatch]
  );

  const handleSlotChange = useCallback(
    (e) => {
      dispatch(setSelectedSlot(e.target.value));
    },
    [dispatch]
  );

  const handleClose = useCallback(() => {
    dispatch(resetModalState());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <h2 id="modal-title" className="text-2xl font-bold text-white">
                {doctor.name}
              </h2>
              <p id="modal-description" className="text-emerald-100 mt-1">
                {doctor.specialty.name}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors duration-200 hover:scale-110 transform"
              aria-label="Close modal"
              tabIndex={0}
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
            <div className="relative h-64 rounded-xl overflow-hidden group">
              <img
                src={doctor.image}
                alt={`${doctor.name}'s profile picture`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">
                  Location
                </h3>
                <p className="text-gray-800">{doctor.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
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
              <div className="relative">
                <select
                  id="timeSlot"
                  value={selectedSlot}
                  onChange={handleSlotChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                  required
                  disabled={isSubmitting}
                  aria-label="Select appointment time slot"
                  aria-describedby="timeSlot-description"
                  tabIndex={0}
                >
                  <option value="">Select a time slot</option>
                  {doctor.slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {bookingStatus === 'success' && (
              <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 animate-fade-in">
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
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 animate-fade-in">
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
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${
                  selectedSlot && !isSubmitting
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label={
                  isSubmitting ? 'Booking appointment' : 'Book appointment'
                }
                aria-disabled={!selectedSlot || isSubmitting}
                tabIndex={0}
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
});

DoctorModal.displayName = 'DoctorModal';

export default DoctorModal;
