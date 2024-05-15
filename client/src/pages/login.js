import React from 'react'
import Form from '../components/form'
import car from '../hooks/car.jpg'
import Navbar from '../components/Navbar'

const Login = () => {
  return (
    <div>
      <Navbar/>
      <div className='bg-gray-200'>
      
      <div className=' -mt- flex w-full h-screen rounded-3xl'>
        <div className='mt-[100px] w-full flex lg:w-1/2 items-center justify-center'>
          <Form />
        </div>
        <div className='hidden lg:flex  w-1/2 h-100% items-center justify-center'>
          <img className='bg-fill' src={car} alt=""></img>
        </div>
      </div>
    </div>
    </div>
    
  )
};

export default Login;
