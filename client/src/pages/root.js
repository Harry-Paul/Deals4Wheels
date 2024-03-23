import React from 'react'
import { useNavigate } from "react-router-dom";

function Root() {
  const Navigate=useNavigate();

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