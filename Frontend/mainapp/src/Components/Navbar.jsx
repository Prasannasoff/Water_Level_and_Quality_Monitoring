import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

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

  const handleLogout = () => {
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <div className="w-full flex justify-between items-center p-6 shadow-md bg-gradient-to-r from-white to-blue-50">
      <div className="logo">
        <h1
          className="text-3xl text-blue-600 font-bold cursor-pointer"
          onClick={() => navigate('/')}
        >
          Grouno<span className="text-gray-600">Analysis</span>
        </h1>
      </div>

      <div className="flex gap-6 items-center text-lg">
        {navItems.map((item) => (
          <li
            key={item.path}
            className={`list-none cursor-pointer px-4 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-100 text-blue-600 font-semibold shadow'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </li>
        ))}
        <div
          className="flex items-center gap-2 px-4 py-2 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200 transition-all duration-200"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl text-red-600" />
          <span className="text-red-600 font-semibold">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
