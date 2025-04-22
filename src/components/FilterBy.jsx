import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import { setSpecialties, setLoading, updateFilter } from '../store/filterSlice';

const FilterBy = ({ onFilterChange }) => {
  const dispatch = useDispatch();
  const { filters, specialties, loading, availabilities } = useSelector(
    (state) => state.filters
  );

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:3001/specialties');
        const data = await response.json();
        dispatch(
          setSpecialties(
            data.map((specialty) => ({
              value: specialty.id,
              label: specialty.name,
            }))
          )
        );
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching specialties:', error);
        dispatch(setLoading(false));
      }
    };

    fetchSpecialties();
  }, [dispatch]);

  const handleFilterChange = (type, value) => {
    dispatch(updateFilter({ type, value }));
    onFilterChange({ ...filters, [type]: value });
  };

  return (
    <div
      className="space-y-4"
      role="region"
      aria-label="Filter doctors"
      aria-describedby="filter-description"
    >
      <h2
        id="filter-description"
        className="text-2xl font-bold text-emerald-600"
      >
        Filter by:
      </h2>
      <div
        className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm"
        role="group"
        aria-label="Filter options"
      >
        <div className="flex-1" role="group" aria-labelledby="specialty-label">
          <label
            id="specialty-label"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Specialty
          </label>
          <Dropdown
            options={specialties}
            value={filters.specialty}
            onChange={(value) => handleFilterChange('specialty', value)}
            placeholder={loading ? 'Loading...' : 'Select Specialty'}
            className="w-full"
            disabled={loading}
            aria-label="Select doctor specialty"
            aria-describedby="specialty-label"
          />
        </div>
        <div
          className="flex-1"
          role="group"
          aria-labelledby="availability-label"
        >
          <label
            id="availability-label"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Availability
          </label>
          <Dropdown
            options={availabilities}
            value={filters.availability}
            onChange={(value) => handleFilterChange('availability', value)}
            placeholder="Select Time"
            className="w-full"
            aria-label="Select appointment time"
            aria-describedby="availability-label"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBy;
