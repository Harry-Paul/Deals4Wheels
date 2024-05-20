import {React, useState, useLayoutEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

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



    useLayoutEffect(()=>{
        const type="single"
        const fav=auth.email?true:false
        console.log({id,type,fav,email})
        axios.post("/car",{id,type,fav,email})
        .then(result=>{
          console.log(result.data.cont)
          setCont(result.data.cont[0])
          console.log(cont)
          if(auth.email){
            if(auth.email===cont.email){
              setUser("seller")
            }
            else{
              setUser("buyer")
            }
            email=auth.email
            axios.post("/showchat",{id,email,user})
            .then(result=>{
              setStyle(result.data.chat)
              setArr(result.data.arr)
            })
            console.log(style)
          }
          else{
            setUser("buyer")
          }
          
          console.log(style)
        })
        .catch(err=>{
          console.log(err)
        })
        
    },[])

    const sendChat=()=>{
      send(email,accessToken)
      console.log("arr: ",arr)
      function send(email, accessToken){
      console.log("wer")
      axios.post("/sendchat",{email,id,arr},
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
        <p className='mx-[200px] h-[400px] bg-gray-100 mt-[100px]'>
          {style.map((tx)=>
          <div className={tx[0]} ><div className='bg-gray-300 max-w-fit rounded-md my-1 px-1 text-xl mx-2'>{tx[1]}</div></div>
          )}
        </p>
        <div class="mx-[230px] flex flex-row justify-center">
          <textarea className="min-w-full  mb-0 border-4 justify-self-end" onChange={(e)=>setMessage(e.target.value)} type="text"  placeholder="Enter Message" name="Description" id="" required />
          <button className='bg-black text-white px-[10px]' onClick={()=>{let a=arr;let s=style;if(user==="buyer"){a.push("1"+message)}else{a.push("1"+message)};s.push(['flex flex-row justify-end',message]);setArr(a);setStyle(s);sendChat();if(test===' '){setTest("abc")}else{setTest(' ')};console.log(arr)}}>Send</button>
        </div>
    </div>
  )
}

export default Car