import React, { useState } from 'react';
import Dropdown from './Dropdown';

const FilterBy = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    specialty: null,
    availability: null,
  });

  const specialties = [
    { value: 'cardiology', label: 'Cardiology' },
    { value: 'dermatology', label: 'Dermatology' },
    { value: 'pediatrics', label: 'Pediatrics' },
    { value: 'orthopedics', label: 'Orthopedics' },
    { value: 'neurology', label: 'Neurology' },
  ];

  const availabilities = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this_week', label: 'This Week' },
    { value: 'next_week', label: 'Next Week' },
  ];

  const handleFilterChange = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Filter by:</h2>
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Specialty
          </label>
          <Dropdown
            options={specialties}
            value={filters.specialty}
            onChange={(value) => handleFilterChange('specialty', value)}
            placeholder="Select Specialty"
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <Dropdown
            options={availabilities}
            value={filters.availability}
            onChange={(value) => handleFilterChange('availability', value)}
            placeholder="Select Availability"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBy;
