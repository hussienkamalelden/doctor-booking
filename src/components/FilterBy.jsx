import React, { useState, useEffect } from 'react';
import Dropdown from './Dropdown';

const FilterBy = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    specialty: null,
    availability: null,
  });

  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await fetch('http://localhost:3001/specialties');
        const data = await response.json();
        setSpecialties(
          data.map((specialty) => ({
            value: specialty.id,
            label: specialty.name,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching specialties:', error);
        setLoading(false);
      }
    };

    fetchSpecialties();
  }, []);

  const availabilities = [
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
            placeholder={loading ? 'Loading...' : 'Select Specialty'}
            className="w-full"
            disabled={loading}
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
            placeholder="Select Time"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBy;
