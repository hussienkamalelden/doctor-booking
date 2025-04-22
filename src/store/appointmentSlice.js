import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
  modalState: {
    isOpen: false,
    selectedDoctor: null,
    selectedSlot: '',
    isSubmitting: false,
    bookingStatus: null,
    errorMessage: '',
    isVisible: false,
  },
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setModalState: (state, action) => {
      state.modalState = { ...state.modalState, ...action.payload };
    },
    setSelectedSlot: (state, action) => {
      state.modalState.selectedSlot = action.payload;
      state.modalState.errorMessage = '';
      state.modalState.bookingStatus = null;
    },
    setSubmitting: (state, action) => {
      state.modalState.isSubmitting = action.payload;
    },
    setBookingStatus: (state, action) => {
      state.modalState.bookingStatus = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.modalState.errorMessage = action.payload;
    },
    setModalVisibility: (state, action) => {
      state.modalState.isVisible = action.payload;
    },
    resetModalState: (state) => {
      state.modalState = {
        isOpen: false,
        selectedDoctor: null,
        selectedSlot: '',
        isSubmitting: false,
        bookingStatus: null,
        errorMessage: '',
        isVisible: false,
      };
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
    removeAppointment: (state, action) => {
      state.appointments = state.appointments.filter(
        (appointment) => appointment.id !== action.payload
      );
    },
  },
});

export const {
  setAppointments,
  setLoading,
  setError,
  setModalState,
  setSelectedSlot,
  setSubmitting,
  setBookingStatus,
  setErrorMessage,
  setModalVisibility,
  resetModalState,
  addAppointment,
  removeAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
