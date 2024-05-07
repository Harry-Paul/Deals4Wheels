import React from 'react'
import Form from '../components/form'

const Login = () => {
  return (
    <div>
      <div className='ms-10 mt-4 xl:text-[40px] lg:text-[30px] md:text-[25px] text-[18px] text-blue-500 font-medium'>
      Deal<a className='text-red-700'>4</a>Wheels
      </div>
      <div className='flex w-full h-screen'>
        <div className='w-full flex lg:w-1/2 items-center justify-center'>
          <Form />
        </div>
        <div className='hidden lg:flex h-full w-1/2 items-center justify-center'>
          <div className='w-80 h-80 bg-gradient-to-tr from-violet-700 to-pink-700'>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Login;
