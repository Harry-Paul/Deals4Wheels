import React from 'react'
import { useNavigate } from "react-router-dom";

function Root() {
  const Navigate=useNavigate();
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Root = () => {
  const navigate=useNavigate()
  return (
    <div>
      <div className='xl:text-[500px] lg:text-[300px] md:text-[200px] text-[100px]'>root</div>
      <div onClick={()=>{navigate("/googlelogin")}}>Google Login</div>
    </div>
  )
}

  const Login=()=>{
      Navigate("/login")
  }
return (
  <div>
    <div className='xl:text-[300px] lg:text-[200px] md:text-[100px] text-[50px]'>root</div>
    <div className="cursor-pointer" onClick={Login}>Login Page</div>
  </div>
);
}
export default Root;