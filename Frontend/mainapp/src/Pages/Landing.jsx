import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div className="min-w-screen min-h-screen bg-blue-50 flex flex-col justify-center relative overflow-hidden px-6 py-8">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/Water.jpeg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.3,
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center space-y-10 px-4 md:px-8 lg:px-16">
        {/* Title Animation */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-blue-700 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          GrounoAnalysis
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Monitor Groundwater Levels and Quality
        </motion.p>

        {/* Water Fill Animation with Waves */}
        <div className="relative flex justify-center items-center my-10">
          <div className="relative w-32 h-48 border-4 border-blue-500 rounded-b-full overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0 30 Q 25 60 50 30 T 100 30 V 100 H 0 Z"
                fill="#3b82f6"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
              />
              <motion.path
                d="M0 35 Q 25 65 50 35 T 100 35 V 100 H 0 Z"
                fill="#60a5fa"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
              />
            </svg>
          </div>
        </div>

        {/* Right-Side Water Ripple Animation */}
        <div className="absolute right-10 top-1/4 w-32 h-32 bg-blue-400 rounded-full opacity-70 water-ripple animate-pulse"></div>
        <div className="absolute right-24 top-1/3 w-24 h-24 bg-blue-300 rounded-full opacity-50 water-ripple animate-pulse"></div>
        <div className="absolute right-40 top-1/5 w-20 h-20 bg-blue-200 rounded-full opacity-50 water-ripple animate-pulse"></div>

        {/* Floating Animation */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <motion.div
            className="absolute bg-blue-200 rounded-full opacity-40"
            style={{ width: '400px', height: '400px', top: '-150px', right: '-200px' }}
            animate={{ y: [0, 20, 0], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
          ></motion.div>
          <motion.div
            className="absolute bg-blue-300 rounded-full opacity-30"
            style={{ width: '300px', height: '300px', top: '300px', left: '-100px' }}
            animate={{ x: [0, -20, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
          ></motion.div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mt-10">
          <Link to="/signup">
            <motion.button
              className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-md text-lg md:text-xl transform hover:bg-blue-600 hover:shadow-lg"
              whileHover={{ scale: 1.1, rotate: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Signup
            </motion.button>
          </Link>
          <Link to="/login">
            <motion.button
              className="bg-gray-500 text-white px-8 py-3 rounded-lg shadow-md text-lg md:text-xl transform hover:bg-gray-600 hover:shadow-lg"
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
