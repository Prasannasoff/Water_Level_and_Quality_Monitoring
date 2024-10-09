import React from 'react'
import Navbar from '../Components/Navbar'
import Search from  '../Components/WaterLevelChecker'
import Footer from '../Components/Footer'
import Modal from '../Components/Modal'
const Home = () => {
  return (
    <div>
      <Navbar/>
      <Search/>
      <Modal/>
      <Footer/>
    </div>
  )
}

export default Home
