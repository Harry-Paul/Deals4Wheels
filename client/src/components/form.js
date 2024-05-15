import {React, useState} from 'react'
import { useNavigate } from "react-router-dom";
import Googlelogin from '../components/googlelogin'
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

function Form() {
  const navigate=useNavigate();
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {auth}=useAuth()
  const {setAuth}=useAuth()

  const Signup=()=>{
    navigate("/signup")
  }
  const pic="https://res.cloudinary.com/dstxl4pzw/image/upload/v1715797500/user_3177440_no4g5v.png"

  const submit=()=>{
    axios.post("/auth/signin",{email,password})
    .then(result=>{
      console.log(result.data)
      const accessToken=result.data.accessToken
      if(result.data.auth===true){
        setAuth({email,accessToken,pic})
        navigate("/home")
      }
      else if(result.data.auth==false){
        alert("Wrong Credentials")
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  return (
    <div className='bg-white py-10 px-20 rounded-3xl' >
      <h1 className='xl:text-[33px] lg:text-[31px] md:text-[28px] text-[24px] font-semibold'>Welcome Back </h1>
      <p className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium text-gray-500 mt-3'>Welcome Back! Please enter your details.</p>
      <div className='mt-6'>
        <div>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium'>Email</label>
            <input onChange={(e)=>{setEmail(e.target.value)}} className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Email'></input>
        </div>
        <div className='mt-3'>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium '>Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Password ' type='password'></input>
        </div>
        <div className='mt-6 flex justify-between items-center'>
            <div>
                <input type='checkbox' id='remember'/>
                <label className='ml-2 font-medium xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px]' for="remember"> Remember For 30 Days</label>
            </div>
            <button className=' xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] font-medium text-violet-500'>Forgot Password</button>
        </div>
        <div className='mt-6 flex flex-col gap-y-4'>
            <button onClick={submit} className='active:scale-[0.98] ease-in-out active:duration-75 hover:scale-[1.01] transition-all py-2 rounded-xl bg-violet-500 text-white xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-bold'>Sign In</button>
            <Googlelogin/>
        </div>
        <div className=' mt-6 flex justify-center items-center'>
            <p className='font-medium  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] '>Don't have an account?</p>
            <button onClick={Signup} className='text-violet-500  xl:text-[15px] lg:text-[14px] md:text-[12px] text-[11.5px] font-medium ml-2' >Sign Up</button>

        </div>
      </div>
    </div>
  )
}

export default Form;
