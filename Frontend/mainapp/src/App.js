import React from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Location from './Components/Location'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
const App = () => {
  const routes = (
    <Router>
      <Routes>
        <Route path="/home" exact element={<Home />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/location" exact element={<Location />} />

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
