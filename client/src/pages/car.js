import {React, useState, useLayoutEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'

const Car = () => {
    const location=useLocation()
    const id=location.id
    const auth=useAuth()
    const[message,setMessage]=useState()
    const[user,setUser]=useState('')
    const[cont,setCont]=useState({})
    const[style,setStyle]=useState([])



    useLayoutEffect(()=>{
        const type="single"
        const fav=auth.email?true:false
        axios.post("/car",{id,type,fav})
        .then(result=>{
          setCont(result.data.cont[0])
        })
        if(auth.email){
          if(auth.email===cont.email){
            setUser("seller")
          }
          else{
            setUser("buyer")
          }
        }
        if(user==="buyer"){
          arr=[]
          for(let i=0;i<arr.length;i++){
            if(arr[i].slice(0,1)==="0"){
              arr.push(["flex flex-row justify-start",arr[i].slice(1)])
            }
            else{
              arr.push(["flex flex-row justify-end",arr[i].slice(1)])
            }
          }
        }
        else{
          for(let i=0;i<arr.length;i++){
            if(arr[i].slice(0,1)==="0"){
              arr.push(["flex flex-row justify-end",arr[i].slice(1)])
            }
            
            else{
              arr.push(["flex flex-row justify-start",arr[i].slice(1)])
            }
          }
        }
    },[])

    const send=()=>{

    }

    const arr=["0hi","1hello","1how are you","1whats the price","03 lakhs"];

  return (
    <div>
        <Navbar/>
        <p className='mx-[200px] h-[400px] bg-gray-100 mt-[100px]'>
          {arr.map((tx)=>
          <div className={style} ><div className='bg-gray-300 max-w-fit rounded-md my-1 px-1 text-xl mx-2'>{tx.slice(1)}</div></div>
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