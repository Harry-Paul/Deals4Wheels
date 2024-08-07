import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const MenuOverlay = () => {

    const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;

  const buy = (e, type, status) => {
    e.preventDefault()
    console.log(location)
    if(location.pathname==="/buy"){
      navigate('/home', { state: { type: type, status: status } });
    }
    else{
      navigate('/buy', { state: { type: type, status: status } });
    }
  }
    
      const sell = () => {
        navigate('/sell');
      }

      const login=()=>{
        navigate("/login")
      }
    
      const logout = () => {
        console.log("sdf")
        axios.post('/auth/logout', { email },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          }).then(result => {
            setAuth({})
            navigate("/")
          })
          .catch(err => console.log(err))
      }
    
      const favourites = () => {
        navigate("/favourites")
      }
    
      const properties = () => {
        navigate("/owncars")
      }
    
    
      const interests = () => {
        navigate("/interests")
      }

  return (
    <div className="z-20">
        {auth.email && 
        <div className="flex flex-row bg-black z-20 items-center">
          <div className="mx-auto my-4">
            <div className="">
              <button class="peer w-[95px]  py-2 my-2 text-white border-2">CHAT</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{navigate("/chatsellers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Sellers</a>
                <a onClick={()=>{navigate("/chatbuyers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Buyers</a>
              </div>
            </div>

            <div className="">
              <button onClick={()=>{navigate("/predict")}} class="peer w-[95px] py-2 my-2 text-white border-2">PREDICT</button>
            </div>

            <div className="">
              <button class="peer w-[95px] py-2 my-2 text-white border-2">SELL</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{navigate("/sell")}} class="px-5 py-3 hover:bg-gray-200" href="#">Sell Cars</a>
                <a onClick={()=>{navigate("/owncars")}} class="px-5 py-3 hover:bg-gray-200" href="#">My Cars</a>
              </div>
            </div>
            </div>

            <div className="text-white border-2 mx-auto px-10 py-[4px] text-2xl cursor-pointer text-center">
                <div className="hover:text-blue-300" onClick={favourites}>Favourites</div>
                <div className="hover:text-blue-300" onClick={properties}>My Cars</div>
                <div className="hover:text-blue-300" onClick={interests}>My interests</div>
                <div className="hover:text-blue-300" onClick={logout}>Logout</div>
            </div>

          </div>
          }
          {!auth.email &&
          <div className="flex flex-row bg-black text-white justify-center py-8">
            <div className="">
              <button class="peer w-[75px] mx-3 p-3 text-white border-2">CHAT</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg text-black">
                <a onClick={()=>{navigate("/chatsellers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Sellers</a>
                <a onClick={()=>{navigate("/chatbuyers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Buyers</a>
              </div>
            </div>
            <button className="  text-white border-2 p-3 mx-3 hover:bg-slate-300" onClick={()=>{navigate("/predict")}}>PREDICT</button>
            <button className="bg-white w-[75px] text-black p-3 mx-3 hover:bg-slate-300" onClick={login}>LOGIN</button>
          </div>
          }
    </div>
  )
}

export default MenuOverlay