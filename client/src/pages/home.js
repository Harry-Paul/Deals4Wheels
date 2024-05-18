import {React, useLayoutEffect, useState, useEffect} from 'react'
import axios from '../api/axios'
import buy from '../hooks/buy.png'
import bg3 from '../hooks/bg3.jpg'
import sell from '../hooks/sell.png'
import calculate from '../hooks/calculate.png'
import live from '../hooks/live.png'
import upcomming from '../hooks/upcomming.png'
import Navbar from '../components/Navbar'
import swift from '../hooks/swift.jpg'
import etios from '../hooks/etios.jpg'
import santro from '../hooks/santro.jpeg'
import taigun from '../hooks/taigun.jpg'
import alto from '../hooks/alto.jpg'
import { useNavigate } from 'react-router-dom'
import { FaBorderAll, FaHeart } from "react-icons/fa6";
import useAuth from '../hooks/useAuth'
import Refreshauth from '../components/refreshauth'
import { AuthProvider } from '../context/AuthProvider'





const Home = () => {
  const[cont,setCont]=useState([])
  const {auth}=useAuth();
  const {setAuth}=useAuth()
  let email=auth?.email
  let accessToken=auth?.accessToken
  // console.log(auth)
  const[fav,setFav]=useState([])
  const navigate=useNavigate()
  const [color,setColor]=useState({})
  console.log("auth :",auth)
  console.log(color)

  useLayoutEffect(()=>{
    console.log("sdf")
    
    let fav=auth.email?true:false
    console.log(fav)
    const type="Home"
    axios.post("/car",{type,fav,email})
    .then(result=>{
      console.log(result.data)
      setCont(result.data.cont)
      setColor(result.data.color)})
    .catch(err=>{
      console.log(console.log(err))
    })
      
  },[])

  const favourite=(id,status,seller)=>{
    send(accessToken)
    function send(){
    email=auth?.email
    console.log("status: ",status)
    console.log("ert: ",accessToken)
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
                    const email=result.data.accessToken
                    accessToken = result.data.accessToken;
                    const pic = result.data.pic;
                    console.log(accessToken)
                    setAuth({ email, accessToken,pic })
                    send(accessToken);
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

  
  const arr=[{img:<img className='w-9 h-9' src={buy}/>,button:"Buy"}, 
{img: <img className='w-11 h-11' src={sell}/>,button:"Sell"}, 
{img: <img className='w-10 h-11' src={calculate}/>,button:"Calculate Price"},
{img: <img className='w-11 h-11' src={live}/>,button:"Live Auction"}, 
{img: <img className='w-11 h-11' src={upcomming}/>,button:"Upcoming Auction"}];

const arr2=[{img:<img className='bg-cover p-5' src={swift}/>,model:"Swift",brand:"Maruti Suzuki",varient:"VXi",transmission:"Manual",fuel:"Petrol",price:"6,78,000"}, 
{img: <img className='bg-cover p-5' src={alto}/>,model:"Alto",brand:"Maruti Suzuki",varient:"ZXi",transmission:"Manual",fuel:"Petrol",price:"3,56,000"}, 
{img: <img className='bg-cover p-5' src={taigun}/>,model:"Taigun",brand:"Volkswagen",varient:"TSI",transmission:"Manual",fuel:"Petrol",price:"14,87,000"}, 
{img: <img className='bg-cover p-5' src={etios}/>,model:"Etios",brand:"Toyota",varient:"G",transmission:"Manual",fuel:"Diesel",price:"6,63,000"}, 
{img: <img className='bg-cover p-5' src={santro}/>,model:"Santro",brand:"Hyundai",varient:"Magna",transmission:"Manual",fuel:"Petrol",price:"4,18,000"},
{img:<img className='bg-cover p-5' src={swift}/>,model:"Swift",brand:"Maruti Suzuki",varient:"VXi",transmission:"Manual",fuel:"Petrol",price:"6,78,000"}, 
{img: <img className='bg-cover p-5' src={alto}/>,model:"Alto",brand:"Maruti Suzuki",varient:"ZXi",transmission:"Manual",fuel:"Petrol",price:"3,56,000"}, 
{img: <img className='bg-cover p-5' src={taigun}/>,model:"Taigun",brand:"Volkswagen",varient:"TSI",transmission:"Manual",fuel:"Petrol",price:"14,87,000"}];



    return (
      <div>
        <Navbar/>
        <div className='bg-gray-200'>
        <div>
          <div className='mt-5 bg-white'>
          <img className='w-full' src={bg3} alt=""></img>
            <div className=" -mt-12 absolute mx-28 h-24 w-5/6 items-center justify-center grid grid-cols-5 gap-4 bg-white rounded-2xl shadow-lg">
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[0].img}{arr[0].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[1].img}{arr[1].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/predict')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-[70px] lg:h-13 md:h-11 h-9 bg-red-500 text-white  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[2].img}{arr[2].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[3].img}{arr[3].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[4].img}{arr[4].button}</div>
                  </div>                                  
            </div>

          <div className=" my-20 mx-20  items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-14 bg-white " >
          {cont.map((arr2)=>(
                    <div className='col-span-1 shadow-xl  md:h-[360px] h-[300px] hover:scale-[1.020] cursor-pointer rounded-xl'>
                      <img className='h-4/6 object-cover w-full rounded-t-xl' src={arr2.images[0]}/>
                      <div className=" pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px] bg-white rounded-xl">
                        <p className='md:text-lg font-medium truncate pb-1'>{arr2.brand} {arr2.model} {arr2.variant}</p>
                        <p className='text-gray-600 flex flex-row truncate'><div className='pr-2 xl:pr-3'>{arr2.kilometers} kms </div> &#183;<div className='px-2 xl:px-3'>{arr2.transmission}</div> &#183; <div className='pl-2 xl:pl-3'>{arr2.fuel}</div></p>
                        <p className='mt-3 font-bold md:text-2xl text-md flex flex-row'>{`₹${arr2.price}`} <div className='pl-[100px] md:pl-[180px] xl:pl-[180px]'><FaHeart onClick={()=>{var arr=color;if(color[arr2._id]==="red"){favourite(arr2._id,false,arr2.email);arr[arr2._id]="white"}else{favourite(arr2._id,true,arr2.email);arr[arr2._id]="red"};setColor(arr);navigate("/home")}} color={color[arr2._id]} style={{ stroke: "red", strokeWidth: "20"}}/></div></p>
                      </div>
                    </div>
                  
              ))}
          </div>

          </div>
        </div>
      </div>
      </div>
      
    )
  };
  
  export default Home;