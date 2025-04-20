import React, { useState } from 'react';
import DoctorModal from './DoctorModal';

const DoctorCard = ({ doctor, onDoctorUpdate }) => {
  const { name, specialty, location, image, slots } = doctor;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get the first available slot as the next availability
  const nextAvailability = slots.length > 0 ? slots[0] : 'No slots available';

  const handleBookAppointment = async (doctor, selectedSlot) => {
    try {
      // 1. Check for existing appointments at the same time
      const appointmentsResponse = await fetch(
        'http://localhost:3001/appointments'
      );
      const appointments = await appointmentsResponse.json();

      const hasExistingAppointment = appointments.some(
        (appointment) => appointment.slot === selectedSlot
      );

      if (hasExistingAppointment) {
        throw new Error(
          'You already have an appointment scheduled at this time. Please choose a different time slot.'
        );
      }

      // 2. Create the appointment
      const appointmentData = {
        id: `a${Date.now()}`, // Generate a unique ID
        name: doctor.name,
        specialty: doctor.specialty,
        location: doctor.location,
        slot: selectedSlot,
      };

      const appointmentResponse = await fetch(
        'http://localhost:3001/appointments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (!appointmentResponse.ok) {
        throw new Error('Failed to book appointment');
      }

      // 3. Update the doctor's slots
      const updatedSlots = doctor.slots.filter((slot) => slot !== selectedSlot);
      const doctorUpdateResponse = await fetch(
        `http://localhost:3001/doctors/${doctor.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slots: updatedSlots,
          }),
        }
      );

      if (!doctorUpdateResponse.ok) {
        throw new Error('Failed to update doctor slots');
      }

      // 4. Refresh the doctors list
      await onDoctorUpdate();

      // Show success message or handle the response
      console.log('Appointment booked successfully and doctor slots updated');
    } catch (error) {
      console.error('Error in booking process:', error);
      throw error; // Re-throw to handle in the modal
    }
  };

  return (
    <>
      <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        {/* Doctor Image with Title Overlay */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={image}
            alt={`Dr. ${name}`}
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
              <span className="inline-block bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {specialty.name}
              </span>
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                Next available: {nextAvailability}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <svg
                className="w-5 h-5 mr-2 text-emerald-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="font-medium">{location}</span>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => setIsModalOpen(true)}
          >
            Book Appointment
          </button>
        </div>
      </div>

      <DoctorModal
        doctor={doctor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAppointment={handleBookAppointment}
      />
    </>
  );
};

export default DoctorCard;
