import React from 'react'
import Form1 from '../components/form1'
import car from '../hooks/car.jpg'
import Navbar from '../components/Navbar'

const Signup = () => {
  return (
    <div>
      <Navbar/>
      <div className='bg-gray-200'>
      <div className='flex w-full h-screen rounded-3xl'>
        <div className='w-full flex lg:w-1/2 items-center justify-center'>
          <Form1/>
        </div>
        <div className='hidden lg:flex  w-1/2 items-center justify-center'>
          <img className='' src={car} alt=""></img>
        </div>
      </div>
    </div>
    </div>
    
  )
};

export default Signup;
