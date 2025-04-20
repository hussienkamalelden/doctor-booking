import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DoctorModal from '../DoctorModal';

// Mock the doctor data
const mockDoctor = {
  name: 'Dr. John Doe',
  specialty: { name: 'Cardiology' },
  image: 'doctor-image.jpg',
  location: 'New York',
  slots: ['10:00 AM', '11:00 AM', '2:00 PM'],
};

describe('DoctorModal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnBookAppointment = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when isOpen is true', () => {
    render(
      <DoctorModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
    expect(screen.getByText('Cardiology')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    const { container } = render(
      <DoctorModal
        doctor={mockDoctor}
        isOpen={false}
        onClose={mockOnClose}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <DoctorModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    const closeButton = screen.getByLabelText('Close modal');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles appointment booking successfully', async () => {
    mockOnBookAppointment.mockResolvedValueOnce();

    render(
      <DoctorModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    // Select a time slot
    const timeSlotSelect = screen.getByLabelText(
      'Select appointment time slot'
    );
    fireEvent.change(timeSlotSelect, { target: { value: '10:00 AM' } });

    // Submit the form
    const submitButton = screen.getByText('Book Appointment');
    fireEvent.click(submitButton);

    // Check if booking function was called with correct parameters
    await waitFor(() => {
      expect(mockOnBookAppointment).toHaveBeenCalledWith(
        mockDoctor,
        '10:00 AM'
      );
    });

    // Check if success message is displayed
    expect(
      await screen.findByText('Appointment booked successfully!')
    ).toBeInTheDocument();
  });

  it('handles appointment booking failure', async () => {
    const errorMessage = 'Failed to book appointment';
    mockOnBookAppointment.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <DoctorModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    // Select a time slot
    const timeSlotSelect = screen.getByLabelText(
      'Select appointment time slot'
    );
    fireEvent.change(timeSlotSelect, { target: { value: '10:00 AM' } });

    // Submit the form
    const submitButton = screen.getByText('Book Appointment');
    fireEvent.click(submitButton);

    // Check if error message is displayed
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('disables submit button when no time slot is selected', () => {
    render(
      <DoctorModal
        doctor={mockDoctor}
        isOpen={true}
        onClose={mockOnClose}
        onBookAppointment={mockOnBookAppointment}
      />
    );

    const submitButton = screen.getByText('Book Appointment');
    expect(submitButton).toBeDisabled();
  });
});
