import {React, useState, useLayoutEffect} from 'react'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { FaBorderAll, FaHeart } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const Favourites = () => {
    const navigate=useNavigate()
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    let email=auth?.email
    let accessToken=auth?.accessToken
    const[cont,setCont]=useState([])
    const[fav,setFav]=useState(" ")
    const [color,setColor]=useState({})

    useLayoutEffect(()=>{
        let fav=false
        let type="Favourites"
        axios.post("/car",{type,fav,email})
        .then(result=>{
            console.log(result)
            setCont(result.data.cont)
            console.log(cont)
        })
        .catch(err=>console.log(err))
    },[])

    const car=(id)=>{
        return () => {
          navigate("/car", { state: { id: id} })
        }
      }

      const favourite=(id,status,seller)=>{
        send(accessToken,email)
        function send(){
        console.log("status: ",status)
        console.log("ert: ",accessToken)
        console.log("ert: ",email)
        axios.post("/favourite",{email,status,id,seller},
        {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }
        )
        .then(result=>console.log(result))
        .catch(err=>{
          {
            console.log(err)
            if (err.response.data.message === "Forbidden") {
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
                        send(accessToken,email);
                        // submit();
                        // navigate("/home")
                    })
                    .catch(err => {
                        if (err.response.data.message === "Forbidden" ) {
                            setAuth({});
                            navigate('/login')
                        }
                        else if(err.response.data.message === "Unauthorized"){
                            navigate("/login")
                        }
                    })
            }
            
        }
        })
        }
        
      }

  return (
    <div>
        <Navbar/>
        <div className=' flex-wrap  flex md:pl-[80px] pl-[50px] py-[10px]  bg-gray-700 fixed z-10 w-full'>
            <p className=' text-white text-4xl '>My Favourites</p>
 
        </div>
        <div className="xl:pt-[100px] md:pt-[150px] pt-[100px] md:my-20 my-[60px] md:mx-20 mx-10  items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-white " >
          {cont?.map((arr2)=>(
                    <div className='col-span-1 shadow-xl  md:h-[360px] h-[300px] hover:scale-[1.010] cursor-pointer rounded-xl'>
                      <img onClick={car(arr2._id)} className='h-4/6 object-cover w-full rounded-t-xl' src={arr2.image}/>
                      <div  className=" pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px] bg-white rounded-xl">
                        <p onClick={car(arr2._id)} className='md:text-lg font-medium truncate pb-1'>{arr2.car_name}</p>
                        <p onClick={car(arr2._id)} className='text-gray-600 flex flex-row truncate'><div className='pr-2 xl:pr-3'>{arr2.kilometers} kms </div> &#183;<div className='px-2 xl:px-3'>{arr2.transmission}</div> &#183; <div className='pl-2 xl:pl-3'>{arr2.fuel}</div></p>
                        <p className='mt-3 font-bold md:text-2xl text-md grid grid-cols-7'><div className='col-span-6 truncate'>{`₹${arr2.price}`}</div> <div className='col-span-1'></div></p>
                      </div>
                    </div>
                  
              ))}
          </div>
    </div>
  )
}

export default Favourites