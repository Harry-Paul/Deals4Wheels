import React from 'react'
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

export default Root