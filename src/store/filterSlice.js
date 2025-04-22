import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    specialty: null,
    availability: null,
  },
  specialties: [],
  loading: true,
  availabilities: [
    { value: '2:00 PM', label: '2:00 PM' },
    { value: '3:00 PM', label: '3:00 PM' },
    { value: '4:00 PM', label: '4:00 PM' },
    { value: '5:00 PM', label: '5:00 PM' },
    { value: '6:00 PM', label: '6:00 PM' },
    { value: '7:00 PM', label: '7:00 PM' },
    { value: '8:00 PM', label: '8:00 PM' },
    { value: '9:00 PM', label: '9:00 PM' },
    { value: '10:00 PM', label: '10:00 PM' },
    { value: '11:00 PM', label: '11:00 PM' },
  ],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSpecialties: (state, action) => {
      state.specialties = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateFilter: (state, action) => {
      const { type, value } = action.payload;
      state.filters[type] = value;
    },
  },
});

export const { setFilters, setSpecialties, setLoading, updateFilter } =
  filterSlice.actions;

export default filterSlice.reducer;
