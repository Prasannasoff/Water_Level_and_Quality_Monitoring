import React from 'react';
import { FaEnvelope, FaPhone, FaInfoCircle, FaChartBar, FaNewspaper, FaQuestionCircle, FaFacebook, FaTwitter, FaInstagram, FaRegFileAlt, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='mt-20 p-10 mb-4 bg-gradient-to-r from-blue-700 to-blue-600 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-8 text-white'>
      {/* Logo Section */}
      <div className='flex flex-col mt-10'>
        <h1 className='text-4xl font-bold pb-2'>
          <strong className='text-black'>Grouno</strong>Analysis
        </h1>
        <p className='opacity-80 leading-6'>Save Water for Future Generations</p>
      </div>

      {/* Analysis Links */}
      <div className='ml-6'>
        <span className='text-lg font-semibold pb-2 mb-10'>Analysis</span>
        <ul className='grid gap-3 mt-6'>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaInfoCircle className='mr-2 text-xl' /> About Us
          </li>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaChartBar className='mr-2 text-xl' /> Features
          </li>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaNewspaper className='mr-2 text-xl' /> News
          </li>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaQuestionCircle className='mr-2 text-xl' /> FAQ
          </li>
        </ul>
      </div>

      {/* Profile Links */}
      <div>
        <span className='text-lg font-semibold pb-2 mt-10'>Profile</span>
        <ul className='grid gap-3 mt-6'>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaRegFileAlt className='mr-2 text-xl' /> Regulation
          </li>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaShieldAlt className='mr-2 text-xl' /> Schemas
          </li>
          <li className='flex items-center hover:text-gray-200 cursor-pointer'>
            <FaMoneyBillWave className='mr-2 text-xl' /> Finance
          </li>
        </ul>
      </div>

      {/* Contact Section */}
      <div>
        <span className='text-lg font-semibold pb-2'>Contact:</span>
        <ul className='grid gap-3 mt-6'>
          <li className='flex items-center'>
            <FaEnvelope className='mr-2 text-xl' /> govgroundlvlckecker@gmail.com
          </li>
          <li className='flex items-center'>
            <FaPhone className='mr-2 text-xl' /> 9234645016
          </li>
        </ul>
      </div>

      {/* Follow Us Section */}
      <div className='col-span-full mt-8'>
        <h3 className='text-lg font-semibold pb-2'></h3>
        <div className='flex justify-center space-x-6'>
          <a href="https://facebook.com" className='text-white hover:text-gray-200'>
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className='text-white hover:text-gray-200'>
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className='text-white hover:text-gray-200'>
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
