import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks
export const fetchDoctors = createAsyncThunk(
  'doctors/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/doctors');
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDoctorSlots = createAsyncThunk(
  'doctors/updateDoctorSlots',
  async ({ doctorId, updatedSlots }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/doctors/${doctorId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slots: updatedSlots }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update doctor slots');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
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
  extraReducers: (builder) => {
    builder
      // Fetch Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
        state.filteredDoctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Doctor Slots
      .addCase(updateDoctorSlots.fulfilled, (state, action) => {
        const updatedDoctor = action.payload;
        state.doctors = state.doctors.map((doctor) =>
          doctor.id === updatedDoctor.id ? updatedDoctor : doctor
        );
        state.filteredDoctors = state.filteredDoctors.map((doctor) =>
          doctor.id === updatedDoctor.id ? updatedDoctor : doctor
        );
      });
  },
});

export const { setCurrentPage, filterDoctors } = doctorSlice.actions;

export default doctorSlice.reducer;
