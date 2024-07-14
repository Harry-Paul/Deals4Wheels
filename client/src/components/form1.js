import {React, useState} from 'react'
import Googlelogin from '../components/googlelogin'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

function Form1() {
  const pic="https://res.cloudinary.com/dstxl4pzw/image/upload/v1715797500/user_3177440_no4g5v.png"

  const navigate=useNavigate()
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[repassword,setRepassword]=useState('')

  const check=()=>{
    if(password===repassword){
      axios.post("/auth/signup",{email,password,pic})
      .then(result=>{
        console.log(result.data)
      })
      .catch(err=>{console.log(err)})
      navigate("/login")
    }
    else{
      alert("Passwords doesn't match")
    }
  }


  return (
    <div className='bg-white py-10 mx-50 px-10 rounded-3xl' >
      <h1 className='xl:text-[33px] lg:text-[31px] md:text-[28px] text-[24px] font-semibold'>Welcome</h1>
      <p className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium text-gray-500 mt-3'>Welcome! Please enter your details.</p>
      <div className='mt-6'>
        <div>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium'>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Email'></input>
        </div>
        <div className='mt-3'>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium '>Enter Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Password ' type='password'></input>
            
        </div>
        <div className='mt-3'>
            <label className='xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-medium '>Re-enter Password</label>
            <input onChange={(e)=>setRepassword(e.target.value)} className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' placeholder='Enter Password ' type='password'></input>
            
        </div>
        <div className='mt-6 flex flex-col gap-y-4'>
            <button onClick={check} className='active:scale-[0.98] ease-in-out active:duration-75 hover:scale-[1.01] transition-all py-2 rounded-xl bg-gray-800 text-white xl:text-[17px] lg:text-[16px] md:text-[15px] text-[14px] font-bold'>Sign up</button>
            <div className='flex justify-center'><Googlelogin/></div>
        </div>
      </div>
    </div>
  )
}



export default Form1
