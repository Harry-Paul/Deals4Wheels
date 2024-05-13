import React from 'react'
import Googlelogin from '../components/googlelogin'

function Form1() {
  return (
    <div className='bg-white py-10 px-20 rounded-3xl' >
      <h1 className='xl:text-[33px] lg:text-[31px] md:text-[28px] text-[24px] font-semibold'>Welcome</h1>
      <p className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium text-gray-500 mt-3'>Welcome! Please enter your details.</p>
      <div className='mt-6'>
        <div>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium'>Email</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Email'></input>
        </div>
        <div className='mt-3'>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium '>Enter Password</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Password ' type='password'></input>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium '>Re-Enter Password</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Password ' type='password'></input>
        </div>
        
        <div className='mt-6 flex flex-col gap-y-4'>
            <button className='active:scale-[0.98] ease-in-out active:duration-75 hover:scale-[1.01] transition-all py-2 rounded-xl bg-violet-500 text-white xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-bold'>Sign up</button>
            <Googlelogin/>
        </div>
        <div className=' mt-6 flex justify-center items-center'>
            <p className='font-medium  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] '>Already have an account?</p>
            <button className='text-violet-500  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] font-medium ml-2 onClick={Signup}'>Sign In</button>
        </div>
      </div>
    </div>
  )
}

export default Form1
