import React from 'react'
import Form1 from '../components/form1'
import car from '../hooks/car.jpg'

const Signup = () => {
  return (
    <div className='bg-gray-200'>
      <div className='ms-10 mt-4 xl:text-[44px] lg:text-[37px] md:text-[35px] text-[29px] text-blue-500 font-medium'>
      Deal<a className='text-red-700'>4</a>Wheels
      </div>
      <div className='flex w-full h-screen rounded-3xl'>
        <div className='w-full flex lg:w-1/2 items-center justify-center'>
          <Form/>
        </div>
        <div className='hidden lg:flex  w-1/2 items-center justify-center'>
          <img className='' src={car} alt=""></img>
        </div>
      </div>
    </div>
  )
};

export default Signup;
