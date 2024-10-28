import React from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Location from './Components/Location'
import  State from './Pages/StateDistrict'
import Regulation from './Pages/Regulations';
import Schems from './Pages/Schemes';
import Contact from './Pages/Contact';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing';
import WaterAnalysis from './Components/WaterAnalysis';
const App = () => {
  const routes = (
    <Router>
      <Routes>
      <Route path="/" exact element={<Landing />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/location" exact element={<Location />} />
        <Route path="/state" exact element={< State/>} />
        <Route path="/schems"exact element={< Schems/>} />
        <Route path="/contact" exact element={< Contact/>} />
        <Route path="/reg" exact element={< Regulation/>} />
        <Route path="/analysis" element={<WaterAnalysis />} />
      </Routes>
    </Router>
  );
  return (

    <div className='w-[85%] m-auto bg-white'>
      {routes}
    </div>
  );
};

export default App;