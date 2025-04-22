import { configureStore } from '@reduxjs/toolkit';
import doctorReducer from './doctorSlice';
import appointmentReducer from './appointmentSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    doctors: doctorReducer,
    appointments: appointmentReducer,
    filters: filterReducer,
  },
});
