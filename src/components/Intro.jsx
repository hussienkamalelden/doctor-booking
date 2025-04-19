const Intro = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Content Section */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Easy Booking</h2>
            <p className="text-gray-600">
              Schedule your appointments with just a few clicks
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Expert Doctors</h2>
            <p className="text-gray-600">
              Access to qualified and experienced medical professionals
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">24/7 Support</h2>
            <p className="text-gray-600">Get assistance whenever you need it</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
