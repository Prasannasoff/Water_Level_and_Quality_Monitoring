import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  return (
    <div className='flex justify-between items-center p-[3rem]'>
      <div className='logo'>
        <h1 className='text-[25px] text-blueColor'>
          <strong>Grouno</strong>Analysis
        </h1>
      </div>
      <div className='flex gap-8 text-[20px] p-3 m-3'>
        <li className='text-black hover:text-blueColor' onClick={() => navigate('/reg')}>
          Regulation
        </li>
        <li className='text-black hover:text-blueColor' onClick={() => navigate('/schems')}>
          Schemes
        </li>
        <li className='text-black hover:text-blueColor' onClick={() => navigate('/state')}>
          State-Dist Profile
        </li>
        {/* <li className='text-black hover:text-blueColor'>Finance</li> */}
        <li className='text-black hover:text-blueColor' onClick={() => navigate('/contact')}>
          Contact-Us
        </li>
      </div>
    </div>
  );
};

export default Navbar;