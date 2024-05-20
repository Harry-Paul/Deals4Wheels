import {React, useState, useLayoutEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

const Car = () => {
    const location=useLocation()
    const id=location.state.id
    console.log("id: ",id)
    const {auth}=useAuth()
    let email=auth?.email
    const[message,setMessage]=useState()
    const[user,setUser]=useState('buyer')
    const[cont,setCont]=useState({})
    const[style,setStyle]=useState([])
    const arr=["0hi","1hello","1how are you","1whats the price","03 lakhs"];



    useLayoutEffect(()=>{
        const type="single"
        const fav=auth.email?true:false
        console.log({id,type,fav})
        axios.post("/car",{id,type,fav})
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

    const send=()=>{

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
          <button className='bg-black text-white px-[10px]' onClick={()=>{}}>Send</button>
        </div>
    </div>
  )
}

export default Car