import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/Landing.css';

const Landing = () => {
  return (
    <div className="outerCont">
      {/* Navbar added directly within the Landing component */}
      <div className="navbar">
        <div className="logo">
          <img src="logo.png" alt="Water Logo" className="logoImage" />
        </div>
        <div className="navLinks">
          <Link to="/home" className="navLink">Home</Link>
          <Link to="/about" className="navLink">About</Link>
          <Link to="/contact" className="navLink">Contact</Link>
        </div>
      </div>

      <div className="mainCont">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className='textCont'>GROUND WATER ANALYSIS</div>
          <div style={{ fontSize: '20px', color: 'grey', marginTop: '-10px' }}>
            Access Real-Time Groundwater Levels and Quality for Your Location.
          </div>
          <div className='loginBtn'>Login</div>
          <div style={{ display: 'flex', width: '700px', paddingTop: '10px' }}>
            <div style={{ display: 'flex', width: '800px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <div style={{ fontSize: '40px', fontWeight: '800' }}>Level</div>
                <div style={{ fontFamily: 'Lato', fontSize: '15px', color: 'grey' }}>
                  Groundwater level is the depth at which soil or rock is saturated with water, known as the water table.
                </div>
              </div>

              <div className="vertical-line"></div>

              <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <div style={{ fontSize: '40px', fontWeight: '800' }}>Quality</div>
                <div style={{ fontFamily: 'Lato', fontSize: '15px', color: 'grey' }}>
                  Groundwater level is the depth at which soil or rock is saturated with water, known as the water table.
                </div>
              </div>

              <div className="vertical-line"></div>

              <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
                <div style={{ fontSize: '40px', fontWeight: '800' }}>Report</div>
                <div style={{ fontFamily: 'Lato', fontSize: '15px', color: 'grey' }}>
                  Groundwater level is the depth at which soil or rock is saturated with water, known as the water table.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='imageCont'>
          <img src='watersplash.png' className='bottleImage' />
        </div>
      </div>
    </div>
  );
};

export default Landing;
