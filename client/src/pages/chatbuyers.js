import {React, useState, useLayoutEffect} from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'


const ChatBuyers = () => {
    const {auth}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    console.log("location: ",location)
    const user="seller"
    let email=auth?.email
    let accessToken=auth?.accessToken
    const {setAuth}=useAuth()
    const[cont,setCont]=useState([])
    const[arr,setArr]=useState([])
    const[style,setStyle]=useState([])
    const[s1,setS1]=useState('text-9xl')
    const[s2,setS2]=useState('hidden')
    const[message,setMessage]=useState('')
    const[test,setTest]=useState(' ')
    const[buyer,setBuyer]=useState('')
    const[id,setId]=useState('')
    console.log("abc")


    useLayoutEffect(()=>{
      console.log("bnm")
      navigate("/chatbuyers")
        axios.post("/showsellerchats",{email,user},
        {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }
        )
        .then(result=>{
            setCont(result.data.cont)
            console.log(cont)
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
          setStyle(result.data.chat)
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

  return (
    <div>
      <Navbar/>
      <div className='grid grid-cols-4 h-[800px] mt-[75px]'>
        <div className='flex flex-col col-span-1 '>
        {cont.map((arr2)=>(
                    <div onClick={()=>{select(arr2.car._id,arr2.buyer);setS1('hidden');setS2('')}} className='cursor-pointer h-[100px] border-b-2 border-black'>
                      <p className='mx-auto max-w-fit mt-[20px]'>{arr2.buyer}</p>
                    </div>
                  
              ))}
        </div>
        <div className='col-span-3 bg-gray-200 '>
          <p className={s1}>send chat</p>
          <div className={s2}>
          <p className='mx-[200px] h-[400px] bg-gray-100 mt-[100px]'>
            {style.map((tx)=>
            <div className={tx[0]} ><div className='bg-gray-300 max-w-fit rounded-md my-1 px-1 text-xl mx-2'>{tx[1]}</div></div>
            )}
          </p>
          <div class="mx-[230px] flex flex-row justify-center">
            <textarea className="min-w-full  mb-0 border-4 justify-self-end" onChange={(e)=>setMessage(e.target.value)} type="text"  placeholder="Enter Message" name="Description" id="" required />
            <button className='bg-black text-white px-[10px]' onClick={()=>{let a=arr;let s=style;if(user==="buyer"){a.push("1"+message)}else{a.push("0"+message)};s.push(['flex flex-row justify-end',message]);setArr(a);setStyle(s);sendChat();if(test===' '){setTest("abc")}else{setTest(' ')};console.log(arr)}}>Send</button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBuyers