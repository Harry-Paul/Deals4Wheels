import {React, useState, useLayoutEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Dialog from "@material-ui/core/Dialog";
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { Carousel } from "@material-tailwind/react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { FaBorderAll, FaHeart } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import { BiLike } from "react-icons/bi";


const Car = () => {
    const location=useLocation()
    const id=location.state.id
    const navigate=useNavigate()
    console.log("id: ",id)
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    let email=auth?.email
    let accessToken=auth?.accessToken
    const[message,setMessage]=useState()
    const[user,setUser]=useState('buyer')
    const[cont,setCont]=useState({})
    const[style,setStyle]=useState([])
    const[arr,setArr]=useState([])
    const[test,setTest]=useState(' ')
    const[open1,setOpen1]=useState(false)
    const[s,setS]=useState('hidden')
    const[open2,setOpen2]=useState(false)
    const[price,setPrice]=useState(0)


    useLayoutEffect(()=>{
        axios.post("/updatetrend",{id,email})
        const type="single"
        const fav=auth.email?true:false
        console.log({id,type,fav,email})
        axios.post("/car",{id,type,fav,email})
        .then(result=>{
          console.log(result.data.cont)
          setCont(result.data.cont[0])
          setPrice(parseInt(result.data.cont[0].price))
          console.log("type: ",cont)
          if(result.data.cont[0].type==="Auction"){
            setS("items-center justify-center   text-lg font-semibold  bg-black hover:bg-blue-500 text-white md:py-1 mt-5 text-black rounded-xl w-1/4 flex")
          }
          if(auth.email){
            if(auth.email===cont.email){
              setUser("seller")
            }
            else{
              send(email,accessToken)
              function send(email,accessToken){
                setUser("buyer")
              email=auth.email
              let buyer=email
              axios.post("/showchat",{id,buyer,user},
              {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                withCredentials: true
              }
              )
              .then(result=>{
                setStyle(result.data.chat)
                setArr(result.data.arr)
              })
              .catch(err=>{
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
                          send(email,accessToken);
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
              })
              }
              
              console.log(style)
            }
          }
          else{
            setUser("buyer")
          }
          
          console.log(style)
        })
        .catch(err=>console.log(err))
        
        
    },[])

    const sendChat=()=>{
      send(email,accessToken)
      console.log("arr: ",arr)
      function send(email, accessToken){
      console.log("wer")
      let buyer=email
      axios.post("/sendchat",{buyer,id,arr},
      {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      }
      )
      .then(result=>{console.log(result)})
      .catch(err=>{
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
                  send(email,accessToken);
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
      })
      }
    }

    

    const handleToClose1 = () => {
      setOpen1(false);
  };

  const handleToClose2 = () => {
    setOpen2(false);
};

const gallery=["https://images.classic.com/vehicles/36380d8bc6a0f92dbed9ce879c5196951aa3ce07.jpg?auto=format&fit=crop&ar=16:9&w=2258",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
  "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
];


  return (
    <div>
        <Navbar/>
        <div className='lg:mt-[130px] lg:ml-[100px] md:mt-[50px] flex flex-col-reverse lg:grid lg:grid-cols-2 h-screen'>
          <div>
          <Carousel className="rounded-xl h-[400px]">

          {gallery.map((pic)=>(
                    <img
                    src={pic}
                    alt="image 1"
                    className="h-full w-full object-cover"
                    />
              ))}   
      </Carousel>
      <div className='pl-[80px] mx-[0px] shadow-xl rounded-xl mt-[50px] pb-[20px]'>
      <p className='md:text-4xl font-[550] truncate mb-[20px]'>Car Overview</p>
      <div className='flex flex-row gap-10'>
        <div className='grid grid-cols-2 gap-y-2 gap-x-4'>
        <p className='text-gray-600 flex flex-row text-lg'>Registration Year:</p>
        <p className='text-lg flex '>2019</p>
        <p className='text-gray-600 text-lg'>Fuel Type:</p>
        <p className='text-lg'>Petrol</p>
        <p className='text-gray-600 flex flex-row text-lg'>Transmission:</p>
        <p className='text-lg flex '>Manual</p>
        <p className='text-gray-600 text-lg'>Ownership:</p>
        <p className='text-lg'>1st Ownership</p>
        </div>

        <div className='grid grid-cols-2 gap-y-2 gap-x-4'>
        <p className='text-gray-600 text-lg'>Kms Driven:</p>
        <p className='text-lg'>30,000kms</p>
        <p className='text-gray-600 text-lg'>Engine:</p>
        <p className='text-lg'>5204cc</p>
        <p className='text-gray-600 text-lg'>Insurance:</p>
        <p className='text-lg'>Expired</p>
        <p className='text-gray-600 text-lg'>RTO:</p>
        <p className='text-lg'>Mallappally</p>

        </div>

      </div>
      
    </div>
    </div>
      <div className='pr-[20px] mx-[80px] shadow-xl rounded-xl lg:mt-[100px] md:mt-[10px] h-[300px] lg:fixed lg:right-0 '>
        <div  className="ml-[40px] pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px] bg-white rounded-xl">
          <p className='md:text-3xl font-[550] truncate pb-1'>Audi RS8 Sports</p>
          <p className='text-gray-600 flex flex-row truncate text-lg'><div className='pr-2 xl:pr-3'>30,000 kms </div> &#183;<div className='px-2 xl:px-3'>Automatic</div> &#183; <div className='pl-2 xl:pl-3'>Petrol</div></p>
          <p className='mt-3 font-bold md:text-2xl text-md grid grid-cols-7'><div className='col-span-6 truncate'>{`₹50,00,000`}</div></p>
  
          <p className='text-gray-600 truncate text-lg mt-[8px]'>Mumbai</p>
          </div>
          <div className='items-center justify-center flex flex-col '>
            <button className=' items-center justify-center flex text-xl font-semibold bg-purple-800 hover:bg-blue-500 md:py-1 mt-5 text-white rounded-xl w-2/5' onClick={()=>{setOpen1(true)}}> Send Message <IoChatboxEllipsesOutline size={26} className='ml-[10px]' /></button>
            <button className={s} onClick={()=>{setOpen2(true)}}>Bid <RiAuctionLine size={26} className='ml-[15px]'/></button>
          </div>
          <div className='flex flex-row mb-[10px]'>
          <button type="submit" className=" ml-[50px] flex text-md font-medium md:py-1 mt-5 text-blue-900 dark:text-blue-900  hover:underline rounded-xl ">Wishlist <FaHeart className='ml-[10px] mt-[3px]'/></button>
          <button type="submit" className=" ml-[50px]  flex text-md font-medium md:py-1 mt-5 text-blue-900 dark:text-blue-900  hover:underline rounded-xl ">View Seller Details <LuNewspaper className='ml-[5px] mt-[3px]' /></button>
          <button type="submit" className=" ml-[50px]  flex text-md font-medium md:py-1 mt-5 text-blue-900 dark:text-blue-900  hover:underline rounded-xl ">Sent "Interested<BiLike className='ml-[5px] mt-[3px]' />"</button>
        
          </div>
          
        
      </div>

    
  </div>

        
        <Dialog class="dialog-desc" open={open1} onClose={handleToClose1}>
          <p className='w-[600px] h-[400px] bg-gray-100 '>
            {style.map((tx)=>
            <div className={tx[0]} ><div className='bg-gray-300 max-w-fit rounded-md my-1 px-1 text-xl mx-2'>{tx[1]}</div></div>
            )}
          </p>
          <div class="mx-[30px] flex flex-row justify-center">
            <textarea className="min-w-full  mb-0 border-4 justify-self-end" onChange={(e)=>setMessage(e.target.value)} type="text"  placeholder="Enter Message" name="Description" id="" required />
            <button className='bg-black text-white px-[10px]' onClick={()=>{let a=arr;let s=style;if(user==="buyer"){a.push("1"+message)}else{a.push("1"+message)};s.push(['flex flex-row justify-end',message]);setArr(a);setStyle(s);sendChat();if(test===' '){setTest("abc")}else{setTest(' ')};console.log(arr)}}>Send</button>
          </div>
        </Dialog>
        <Dialog class="dialog-desc" open={open2} onClose={handleToClose2}>
          <div className='text-xl text-center m-3'>{price}</div>
          <div><button className=' mx-1 py-1 px-10 bg-gray-500' onClick={()=>{let x=price;x=x+5000;setPrice(x)}}>+</button><button className='mx-1 py-1 px-10 bg-gray-500' onClick={()=>{let x=price;x=x-5000;if(x>=cont.price){setPrice(x)}}}>-</button></div>
          <button className='bg-gray-500 py-1 px-15 m-1' >PLACE BID</button>
        </Dialog>
    </div>
  )
}

export default Car