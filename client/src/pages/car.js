import {React, useState, useLayoutEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { Carousel } from "@material-tailwind/react";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiAuctionLine } from "react-icons/ri";
import { FaBorderAll, FaHeart } from "react-icons/fa6";
import { LuNewspaper } from "react-icons/lu";
import { BiLike } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";


const Car = () => {
    const loc=useLocation()
    const id=loc.state.id
    const navigate=useNavigate()
    console.log("id: ",id)
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    let email=auth?auth.email:""
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
    const[price1,setPrice1]=useState(0)
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [variant, setVariant] = useState('');
    const [transmission, setTransmission] = useState('Manual');
    const [kilometers, setKilometers] = useState('');
    const [owner, setOwner] = useState('First');
    const [type, setType] = useState('Fixed Price');
    const [fuel, setFuel] = useState('Petrol');
    const [starttime, setStartTime] = useState('');
    const [endtime, setEndTime] = useState('');
    const [year, setYear] = useState('');
    const [location, setLocation] = useState('');
    const [rto, setRto] = useState('');
    const [images, setImages] = useState([]);
    const [insurance, setInsurance] = useState('Valid');
    const [bids, setBids] = useState([]);

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
          setPrice1(parseInt(result.data.cont[0].price))
          setKilometers(result.data.cont[0].kilometers)
          setBrand(result.data.cont[0].brand)
          setModel(result.data.cont[0].model)
          setVariant(result.data.cont[0].variant)
          setTransmission(result.data.cont[0].transmission)
          setOwner(result.data.cont[0].owner)
          setType(result.data.cont[0].type)
          setFuel(result.data.cont[0].fuel)
          setStartTime(result.data.cont[0].starttime)
          setEndTime(result.data.cont[0].endtime)
          setYear(result.data.cont[0].year)
          setImages(result.data.cont[0].images)
          setInsurance(result.data.cont[0].insurance)
          setRto(result.data.cont[0].rto)
          setLocation(result.data.cont[0].location)
            if(email===result.data.cont[0].email){
              axios.post("/showbids",{id},
                {
                  headers: {
                      'Authorization': `Bearer ${accessToken}`
                  },
                  withCredentials: true
                })
              .then(result=>{
                setBids(result.data.bids)
                console.log(result.data.bids)
              })
              .catch(err=>console.log(err))
            }
          console.log("type: ",cont)
          if(result.data.cont[0].type==="Auction"){
            setS("items-center justify-center  text-xl  px-[75px]  bg-black hover:bg-gray-700 text-white py-[8px] mt-2 text-black rounded-lg flex")
          }
        })
        .catch(err=>console.log(err))
        
        
    },[])


    const openmessage=()=>{
      setOpen1(true)
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
    }

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

    const bid=(id,buyer)=>{
      send(buyer,accessToken)
      function send(buyer,accessToken){
        email=buyer
        axios.post("/bid",{id,buyer,price1},
          {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          })
        .then(result=>{console.log(result);setPrice(price1)})
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
        <div className='xl:mt-[100px] md:mx-[70px] mx-[10px] md:mt-[50px] flex flex-col-reverse 2xl:grid 2xl:grid-cols-2 2xl:gap-2'>
          <div className='mt-[50px] mr-[20px]'>
          <Carousel className="rounded-xl 2xl:h-[450px] md:h-[400px]">

          {images.map((pic)=>(
                    <img
                    src={pic}
                    alt="image 1"
                    className="h-full w-full object-cover"
                    />
              ))}   
      </Carousel>
      <div className='p-[50px] mx-[0px] shadow-xl rounded-xl my-[20px] md:my-[50px] '>
      <p className='text-4xl font-[550] truncate mb-[20px]'>Car Overview</p>
      <div className='flex md:flex-row flex-col gap-10'>
        <div className='grid grid-cols-2 gap-y-2 gap-x-4'>
        <p className='text-gray-600 flex flex-row text-lg'>Registration Year:</p>
        <p className='text-lg flex '>{year}</p>
        <p className='text-gray-600 text-lg'>Fuel Type:</p>
        <p className='text-lg'>{fuel}</p>
        <p className='text-gray-600 flex flex-row text-lg'>Transmission:</p>
        <p className='text-lg flex '>{transmission}</p>
        <p className='text-gray-600 text-lg'>Ownership:</p>
        <p className='text-lg'>{owner}</p>
        </div>

        <div className='grid grid-cols-2 gap-y-2 gap-x-4'>
        <p className='text-gray-600 text-lg'>Kms Driven:</p>
        <p className='text-lg'>{kilometers}</p>
        <p className='text-gray-600 text-lg'>Engine:</p>
        <p className='text-lg'>5204cc</p>
        <p className='text-gray-600 text-lg'>Insurance:</p>
        <p className='text-lg'>{insurance}</p>
        <p className='text-gray-600 text-lg'>RTO:</p>
        <p className='text-lg'>{rto}</p>

        </div>

      </div>
      
    </div>
    </div>
      <div className='px-[50px] py-[30px]  2xl:mx-[20px] shadow-xl rounded-xl 2xl:mt-[120px] mt-[80px] h-[450px] 2xl:w-2/5 2xl:fixed 2xl:right-8 bg-gray-100'>
        <div  className="ml-[10px] pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px]  rounded-xl">
          <p className='text-3xl font-[650] truncate pb-1 mt-5'>{brand} {model} {variant}</p>
          <p className='text-gray-600 flex flex-row truncate text-xl'><div className='pr-2 xl:pr-3'>{kilometers} kms </div> &#183;<div className='px-2 xl:px-3'>{transmission}</div> &#183; <div className='pl-2 xl:pl-3'>{fuel}</div></p>
          <p className=' font-bold md:text-3xl mt-7 text-md grid grid-cols-7'><div className='col-span-6 truncate'>{`₹${price}`}</div></p>
  
          <p className='text-gray-600 truncate text-lg mt-[8px] flex flex-row align-middle'><div className='pt-1'><FaLocationDot /></div>{location}</p>
          </div>
          <div className='items-center justify-center flex flex-col '>
            <button className=' items-center justify-center flex text-xl  bg-purple-800 hover:bg-blue-500 py-[9px] px-[25px] mt-5 text-white rounded-lg ' onClick={()=>{openmessage()}}> Send Message <IoChatboxEllipsesOutline size={26} className='ml-[10px]' /></button>
            <button className={s} onClick={()=>{setOpen2(true)}}>Bid <RiAuctionLine size={26} className='ml-[15px]'/></button>
          </div>
          <div className='flex flex-row justify-center my-[10px]'>
          <button type="submit" className=" flex text-md font-medium md:py-1 mt-5 text-blue-900 dark:text-blue-900  hover:underline rounded-xl ">Wishlist <FaHeart className='ml-[10px] mt-[3px]'/></button>
          <button type="submit" className=" md:ml-20 ml-4 flex text-md font-medium md:py-1 mt-5 text-blue-900 dark:text-blue-900  hover:underline rounded-xl ">Sent "Interested<BiLike className='ml-[5px] mt-[3px]' />"</button>
        
          </div>
          
        
      </div>

    
  </div>
  <div>
  {/* {bids?.map((bid)=>(
    <div>{bid[0]} {bid[1]}</div>
  )
    
            )} */}
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
          <div className='text-xl text-center m-3'>{price1}</div>
          <div><button className=' mx-1 py-1 px-10 bg-gray-500' onClick={()=>{let x=price1;x=x+5000;setPrice1(x)}}>+</button><button className='mx-1 py-1 px-10 bg-gray-500' onClick={()=>{let x=price;x=x-5000;if(x>=cont.price){setPrice(x)}}}>-</button></div>
          <button onClick={()=>{if(price1>price){bid(id,email)}}} className='bg-gray-500 py-1 px-15 m-1' >PLACE BID</button>
        </Dialog>
    </div>
  )
}

export default Car