import React from 'react';

const Intro = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Content Section */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-emerald-600"
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
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Easy Booking
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Schedule your appointments with just a few clicks
              </p>
            </div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Expert Doctors
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Access to qualified and experienced medical professionals
              </p>
            </div>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                24/7 Support
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Get assistance whenever you need it
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
