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
        navigate("/ownprop")
      }
    
      const interested = () => {
        navigate("/interested")
      }
    
      const interests = () => {
        navigate("/interests")
      }

      const home=()=>{
        navigate("/")
      }

      const [navbarOpen, setNavbarOpen]=useState(false)
    
      
  return (
    <div className="fixed shadow-xl left-0 right-0 top-0 z-10 bg-gray-900 md:h-[80px] h-[40px] ">
        <header className="flex flex-row md:h-[60px] h-[40px] px-5 items-center">
        <div className=' lg:text-2xl lg:py-[10px] text-white cursor-pointer' onClick={home}>
        <div className='ms-10 mt-4 xl:text-[44px] lg:text-[37px] md:text-[35px] text-[29px] text-blue-500 font-medium'>
      Deal<a className='text-red-700'>4</a>Wheels
      </div>
        </div>
        
        <div className="mobile-menu block md:hidden ml-auto">
                {!navbarOpen ? (
                    <button onClick={()=>setNavbarOpen(true)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                        <HiMenu className='h5 w-5'/>
                    </button>
                ) : (
                    <button onClick={()=>setNavbarOpen(false)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                        <IoIosCloseCircleOutline className="h-5 w-5"/>
                    </button>
                )
                }
            </div>
          <div className="md:flex md:flex-row py-[5px]  md:ml-auto md:mr-0 hidden ">
          <div className="md:px-10">
              <button class="peer px-5 py-2 text-white">CHAT</button>
              <div class="hidden absolute peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{navigate("/chatsellers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Sellers</a>
                <a onClick={()=>{navigate("/chatbuyers")}} class="px-5 py-3 hover:bg-gray-200" href="#">To Buyers</a>
              </div>
            </div>
          <div onClick={logout} className="cursor-pointer peer px-5 py-2 text-white">LOGOUT</div>
          <div onClick={()=>{navigate("/predict")}} className="cursor-pointer peer px-5 py-2 text-white">PREDICT</div>
            

            

            <div className="md:px-10">
              <button class="peer px-5 py-2 text-white">SELL</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={sell} class="px-5 py-3 hover:bg-gray-200" href="#">Sell Property</a>
                <a onClick={properties} class="px-5 py-3 hover:bg-gray-200" href="#">Your Properties</a>
              </div>
            </div>

            {auth.email && 
            <Menu className="ml-auto ">
              <MenuHandler>
                <img className="h-10 rounded-3xl mt-3" src={pic}></img>
              </MenuHandler>
              <MenuList className="z-20  text-xl">
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={favourites}>Favourites</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={properties}>Your Properties</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={interested}>Your interests</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={interests}>Interests on owned properties</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            }

            {!auth.email &&
              <buttton className="bg-white text-black my-2 px-2 hover:bg-slate-300 cursor-pointer" onClick={login}>LOGIN</buttton>
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