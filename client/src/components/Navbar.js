import React, { useEffect, useState, useLayoutEffect } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MenuOverlay from "./MenuOverlay";
import {HiMenu} from "react-icons/hi"
import {IoIosCloseCircleOutline} from "react-icons/io"

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  let email = auth?.email;
  let accessToken = auth?.accessToken;
  const pic=auth.pic;

    const [option, setOption] = useState("buy");

    useLayoutEffect(()=>{
      if(!auth.email){
        axios.post('/auth/refresh', { email },
                {
                    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                .then(result => {
                    console.log(result)
                    email=result.data.email
                    accessToken = result.data.accessToken;
                    const pic = result.data.pic;
                    console.log(accessToken)
                    setAuth({ email, accessToken,pic })
                    // submit();
                    // navigate("/home")
                })
                .catch(err => {
                    if (err.response.data.message === "Forbidden" ) {
                        setAuth({});
                        // navigate('/login')
                    }
                    else if(err.response.data.message === "Unauthorized"){
                        // navigate("/login")
                    }
                })
      }
      axios.post("/change")
      .then(result=>console.log(result))
      .catch(err=>console.log(err))
    },[])

    
     

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

      const home=()=>{
        navigate("/")
      }

      const [navbarOpen, setNavbarOpen]=useState(false)
    
      
  return (
    <div className="fixed shadow-xl left-0 right-0 top-0 z-20 bg-black md:h-[80px] h-[60px] ">
        <header className="flex flex-row md:h-[80px] h-[40px] px-5 items-center">
        <div className=' lg:text-2xl lg:py-[10px] text-white cursor-pointer' onClick={home}>
       <img className="h-[60px] md:mt-0 mt-4" src="https://res.cloudinary.com/dstxl4pzw/image/upload/v1720879773/Deals_2_ptlgol.png"/>
        </div>
        
        <div className="mobile-menu block md:hidden ml-auto">
                {!navbarOpen ? (
                    <button onClick={()=>setNavbarOpen(true)} className="flex items-center  border rounded border-white text-slate-200 hover:text-white hover:border-white">
                        <HiMenu className='h-8 w-8 mt-4 'v color="white"/>
                    </button>
                ) : (
                    <button onClick={()=>setNavbarOpen(false)} className="flex items-center px-3 py-2 border rounded border-white text-slate-200 hover:text-white hover:border-white">
                        <IoIosCloseCircleOutline className="h-6 w-5 mt-1" color="white"/>
                    </button>
                )
                }
            </div>
          <div className="md:flex md:flex-row lg:text-xl text-lg  md:ml-auto md:mr-0 hidden ">
          <div className="md:px-5">
              <button class="peer lg:px-5 px-2 py-2 text-white">CHAT</button>
              <div class="hidden absolute peer-hover:flex hover:flex w-[200px] px-2 lg:px-5 flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{navigate("/chatsellers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Sellers</a>
                <a onClick={()=>{navigate("/chatbuyers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Buyers</a>
              </div>
            </div>
          <div onClick={()=>{navigate("/predict")}} className="cursor-pointer peer px-2 lg:px-5 py-2 text-white">PREDICT</div>
            

            

            <div className="md:px-10">
              <button class="peer px-2 lg:px-5 py-2 text-white">SELL</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{navigate("/sell")}} class="px-5 py-3 hover:bg-gray-200" href="#">Sell Car</a>
                <a onClick={()=>{navigate("/owncars")}} class="px-5 py-3 hover:bg-gray-200" href="#">MY Cars</a>
              </div>
            </div>

            {auth.email && 
            <Menu className="ml-auto ">
              <MenuHandler>
                <img className="h-10 rounded-3xl mt-1 cursor-pointer" src={pic}></img>
              </MenuHandler>
              <MenuList className="z-20  text-xl">
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={()=>{navigate("/favourites")}}>Favourites</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={()=>{navigate("/owncars")}}>My Cars</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={()=>{navigate("/interests")}}>My Interests</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            }

            {!auth.email && <div className="mt-2">
              <buttton className="bg-white text-black my-2 px-3 py-1 hover:bg-slate-300 cursor-pointer rounded-l-xl rouned-r-lg hover:bg-gray-600" onClick={login}>LOGIN</buttton>
              <buttton className=" ml-1 bg-white text-black my-2 px-2 py-1 hover:bg-slate-300 cursor-pointer rounded-r-xl hover:bg-gray-600" onClick={()=>{navigate("/signup")}}>SIGN UP</buttton>
            </div>
              
            }

          </div>
          
        </header>
        <div className='md:hidden z-10'>
        {navbarOpen ? <MenuOverlay />:null}
        </div>
    </div>
  )
}

export default Navbar