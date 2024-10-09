import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-[3rem]'>
        <div className='logo'>
              <h1 className='text-[25px] text-blueColor'><strong>Grouno</strong>Analysis</h1>
        </div>
        <div className='flex gap-8 text-[20px] p-3 m-3'>
            <li className='text-black hover:text-blueColor'>Regulation</li>
            <li className='text-black hover:text-blueColor'>Schemes</li>
            <li className='text-black hover:text-blueColor'>State-Dist Profile</li>
            <li className='text-black hover:text-blueColor'>Finance</li>
            <li className='text-black hover:text-blueColor'>Contact-Us</li>
        </div>
        <div className='gap-8 flex'><button className='p-3 text-white bg-blueColor rounded-3xl w-32'>Login</button>
            <button className='p-3 text-white bg-blueColor rounded-3xl w-32'>SignUp</button>
        </div>
            
    </div>
  )
}

export default Navbar
