import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  appointments: [],
  loading: false,
  error: null,
  modalState: {
    isOpen: false,
    selectedDoctor: null,
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
      state.modalState = action.payload;
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload);
    },
  },
});

export const {
  setAppointments,
  setLoading,
  setError,
  setModalState,
  addAppointment,
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
