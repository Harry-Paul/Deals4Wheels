import {React, useState, useLayoutEffect, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")



const ChatSellers = () => {
    const {auth}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    const user="buyer"
    let email=auth?.email
    let accessToken=auth?.accessToken
    const {setAuth}=useAuth()
    const[cont,setCont]=useState([])
    const[arr,setArr]=useState([])
    const[style,setStyle]=useState([])
    const[s1,setS1]=useState('md:text-9xl md:h-[730px] md:block hidden ')
    const[s2,setS2]=useState('hidden')
    const[s3,setS3]=useState('hidden')
    const[s4,setS4]=useState('flex flex-col col-span-1 bg-gray-500 text-white overflow-y-scroll h-[750px]')
    const[message,setMessage]=useState('')
    const[test,setTest]=useState(' ')
    const[buyer,setBuyer]=useState('')
    const[id,setId]=useState('')
    const[car,setCar]=useState('')
    const[user1,setUser1]=useState('')
    const [room, setRoom] = useState("");
    const [mes, setMes] = useState([]);
    const [m, setM] = useState('');

  // Messages States
  const [messageReceived, setMessageReceived] = useState("");
    console.log("jkl")

    useEffect(()=>{
      if (room !== "") {
        console.log("joined")
        socket.emit("join_room", room);
      }
    },[room])


    useLayoutEffect(()=>{
      console.log("bnm")
      navigate("/chatsellers")
        axios.post("/showchats",{email,user},
        {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }
        )
        .then(result=>{
            setCont(result.data.cont)
            console.log('cont: ',cont)
        })
        .catch(err=>{console.log(err)})
    },[])

    const select=(id,buyer)=>{
      send(email,accessToken)
      function send(email,accessToken){
        axios.post("/showchat",{id,buyer,user},
        {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }
        )
        .then(result=>{
          console.log(result)
          setStyle(result.data.chat)
          console.log("style1: ",style)
          setArr(result.data.arr)
          setId(id)
          setBuyer(buyer)
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
    }

    const sendChat=()=>{
      
      send(email,accessToken)
      console.log("arr: ",arr)
      function send(email, accessToken){
      console.log("wer")
      axios.post("/sendchat",{buyer,id,arr},
      {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        withCredentials: true
      }
      )
      .then(result=>{console.log(result);socket.emit("send_message", { mes, room });})
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

  
    useLayoutEffect(() => {
      socket.on("receive_message", (data) => {
        console.log(data)
        console.log("style: ",style)
        
      });
    }, [socket,style]);

  return (
    <div>
      <Navbar/> 
      <div className='grid md:grid-cols-4 grid-cols-1 md:h-[700px] md:mt-[80px]  mt-[60px]'>
        <div className={s4}>
        {cont.map((arr2)=>(
                    <div onClick={()=>{setRoom(arr2._id);select(arr2.car_id,arr2.buyer);setS1('hidden');setS2('bg-gray-200');setCar(arr2.car_name+" ("+arr2.year+")");setUser1(arr2.seller);setS3('flex flex-row  bg-gray-800 text-white ');setS4('hidden md:flex flex-col col-span-1 bg-gray-500 text-white overflow-y-scroll h-[750px]');}} className='cursor-pointer h-[100px] mx-[2px] mt-[2px] bg-gray-800 rounded-lg'>
                      <p className=' pt-[20px] truncate ml-[20px] text-lg text-white'>{arr2.seller}</p>
                      <p className='truncate mx-[20px] mt-1 text-sm text-gray-400'>{arr2.car_name} ({arr2.year})</p>
                    </div>
                  
              ))}
        </div>
        <div className=' md:col-span-3 col-span-1 '>
          <p className={s1}>send chat</p>
          <div className={s3}>
            <div className='md:hidden block mx-[10px] my-[20px] border-2 border-gray-600 p-2' onClick={()=>{setS3('hidden');setS2('hidden');setS4('flex flex-col col-span-1 bg-gray-500 text-white overflow-y-scroll h-[900px]')}}>< FaArrowLeft size="30px"/></div>
            <div className='py-[10px] flex flex-col justify-center align-middle md:px-[50px] pl-[20px]'>
            <p className='pb-2 text-2xl'>{user1}</p>
            <p className='pb-2 text-md text-gray-400 truncate'>{car}</p>
            </div>
          </div>
          <div className={s2}>
          <p className='md:h-[580px] h-[700px] bg-gray-300 overflow-y-scroll overscroll-y-contain'>
            {style.map((tx)=>
            <div className={tx[0]} ><div className='bg-gray-800 text-white lg:max-w-[500px] md:max-w-[400px] max-w-[275px] rounded-md my-1 px-3 py-1 text-2xl mx-2 '>{tx[1]}</div></div>
            )}
            <div className={style1} ><div className='bg-gray-800 text-white lg:max-w-[500px] md:max-w-[400px] max-w-[275px] rounded-md my-1 px-3 py-1 text-2xl mx-2 '>{m}</div></div>
          </p>
          <div class="mx-[35px] flex flex-row justify-center">
            <textarea className="min-w-full  mb-0 border-4 justify-self-end" onChange={(e)=>{setMes(['flex flex-row justify-start',e.target.value]);setMessage(e.target.value);console.log(message)}} type="text" onfocus="this.value=''"  placeholder="Enter Message" name="Description" id="" required />
            <button className='bg-black text-white px-[15px]' onClick={()=>{let a=arr;let s=style;if(user==="buyer"){a.push("1"+message)}else{a.push("0"+message)};s.push(['flex flex-row justify-end',message]);setArr(a);setStyle(s);sendChat();if(test===' '){setTest("abc")}else{setTest(' ')};console.log(arr)}}>Send</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatSellers