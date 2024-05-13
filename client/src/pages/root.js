import React from 'react'
import { useNavigate } from "react-router-dom";

function Root() {
  const navigate=useNavigate();

  const Login=()=>{
      navigate("/login")
  }

  const Home=()=>{
    navigate("/home")
}
return (
  <div>
    <div className='xl:text-[300px] lg:text-[200px] md:text-[100px] text-[50px]'>root</div>
    <div className="cursor-pointer" onClick={Login}>Login Page</div>
    <div className="cursor-pointer" onClick={Home}>Home Page</div>
    <div onClick={()=>{navigate("/googlelogin")}}>Google Login</div>
    <div onClick={()=>{navigate("/predict")}}>Predict</div>
  </div>
);
}
export default Root;