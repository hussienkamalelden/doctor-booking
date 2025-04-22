import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  doctors: [],
  filteredDoctors: [],
  loading: false,
  currentPage: 1,
  doctorsPerPage: 6,
  error: null,
};

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
      state.filteredDoctors = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFilteredDoctors: (state, action) => {
      state.filteredDoctors = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    filterDoctors: (state, action) => {
      let filtered = [...state.doctors];
      const { specialty, availability } = action.payload;

      if (specialty) {
        filtered = filtered.filter(
          (doctor) => doctor.specialty.id === specialty.value
        );
      }

      if (availability) {
        filtered = filtered.filter((doctor) =>
          doctor.slots.includes(availability.value)
        );
      }

      state.filteredDoctors = filtered;
      state.currentPage = 1;
    },
  },
});

export const {
  setDoctors,
  setLoading,
  setFilteredDoctors,
  setCurrentPage,
  setError,
  filterDoctors,
} = doctorSlice.actions;

export default doctorSlice.reducer;
