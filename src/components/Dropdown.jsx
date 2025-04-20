import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        aria-label={
          value ? `${value.label} dropdown` : `${placeholder} dropdown`
        }
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="dropdown-list"
        className={`
          w-full px-4 py-2.5 text-left bg-white border border-gray-200 rounded-xl
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
          transition-all duration-200
          ${
            disabled
              ? 'opacity-50 cursor-not-allowed bg-gray-50'
              : 'cursor-pointer hover:border-emerald-300'
          }
          ${value ? 'text-gray-900' : 'text-gray-500'}
        `}
        disabled={disabled}
      >
        <div className="flex items-center justify-between">
          <span>{value ? value.label : placeholder}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div
          id="dropdown-list"
          role="listbox"
          aria-label="Select an option"
          className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 transform origin-top transition-all duration-200"
        >
          <ul className="py-2 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={value?.value === option.value}
                tabIndex={0}
                className={`
                  px-4 py-2.5 text-sm cursor-pointer
                  transition-colors duration-200
                  ${
                    value?.value === option.value
                      ? 'bg-emerald-50 text-emerald-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center">
                  {value?.value === option.value && (
                    <svg
                      className="w-4 h-4 mr-2 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {option.label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
