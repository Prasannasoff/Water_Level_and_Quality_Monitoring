import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'Regulation', path: '/reg' },
    { label: 'Schemes', path: '/schems' },
    { label: 'State-Dist Profile', path: '/state' },
    { label: 'Contact-Us', path: '/contact' }
  ];

  return (
    <div className='w-full flex justify-between items-center p-6 shadow-md bg-white'>
      <div className='logo'>
        <h1 className='text-3xl text-blue-600 font-bold cursor-pointer' onClick={() => navigate('/')}>
          Grouno<span className='text-gray-600'>Analysis</span>
        </h1>
      </div>
      <div className='flex gap-8 text-lg'>
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`cursor-pointer px-4 py-2 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
