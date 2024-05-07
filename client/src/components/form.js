import React from 'react'
import { useNavigate } from "react-router-dom";

function Form() {
  const Navigate=useNavigate();

  const Signup=()=>{
    Navigate("/signup")
  }
  return (
    <div className='bg-white py-10 px-20 rounded-3xl' >
      <h1 className='xl:text-[33px] lg:text-[31px] md:text-[28px] text-[24px] font-semibold'>Welcome Back </h1>
      <p className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium text-gray-500 mt-3'>Welcome Back! Please enter your details.</p>
      <div className='mt-6'>
        <div>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium'>Email</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Email'></input>
        </div>
        <div className='mt-3'>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium '>Password</label>
            <input className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Password ' type='password'></input>
        </div>
        <div className='mt-6 flex justify-between items-center'>
            <div>
                <input type='checkbox' id='remember'/>
                <label className='ml-2 font-medium xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px]' for="remember"> Remember For 30 Days</label>
            </div>
            <button className=' xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] font-medium text-violet-500'>Forgot Password</button>
        </div>
        <div className='mt-6 flex flex-col gap-y-4'>
            <button className='active:scale-[0.98] ease-in-out active:duration-75 hover:scale-[1.01] transition-all py-2 rounded-xl bg-violet-500 text-white xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-bold'>Sign In</button>
            <button className=' xl:text-[16px] lg:text-[14px] md:text-[12px] text-[12px] py-1.5 active:scale-[0.98] ease-in-out active:duration-75 hover:scale-[1.01] transition-all flex items-center justify-center gap-2'>
                
                Sign in with Google
            </button>
        </div>
        <div className=' mt-6 flex justify-center items-center'>
            <p className='font-medium  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] '>Don't have an account?</p>
<<<<<<< HEAD
            <button onClick={Signup} className='text-violet-500  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] font-medium ml-2' >Sign Up</button>
=======
            <button onClick={Signup} className='text-violet-500  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] font-medium ml-2'>Sign Up</button>
>>>>>>> 4b8c02ae35fd56fc5ae5f94e23da190a4748b094
        </div>
      </div>
    </div>
  )
}

export default Form;
