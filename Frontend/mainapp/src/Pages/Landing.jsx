import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center">
      {/* Title */}
      <h1 className="text-6xl font-bold text-blue-600 text-center mb-4">GrounoAnalysis</h1>
      <p className="text-2xl text-gray-600 text-center mb-8">Monitor Groundwater Levels and Quality</p>

      {/* Image */}
      <div className="mb-8 w-full h-96">
        <img
          src="https://via.placeholder.com/1200x400?text=Groundwater+Analysis"
          alt="Groundwater Analysis Placeholder"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4">
        <Link to="/signup">
          <button className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md text-xl hover:bg-blue-600">
            Signup
          </button>
        </Link>
        <Link to="/login">
          <button className="bg-gray-500 text-white px-8 py-3 rounded-lg shadow-md text-xl hover:bg-gray-600">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
