import React from 'react';

const AppointmentCard = ({ appointment }) => {
  const { name, specialty, location, slot } = appointment;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-50 text-emerald-700">
              {specialty.name}
            </span>
          </div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors duration-200">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-xl group-hover:bg-emerald-50 transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white mr-3">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">{location}</span>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-xl group-hover:bg-emerald-50 transition-colors duration-200">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white mr-3">
              <svg
                className="w-4 h-4 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-gray-700 font-medium">{slot}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
