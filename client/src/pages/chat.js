import {React, useState, useLayoutEffect} from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'



const Chat = () => {
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    const[cont,setCont]=useAuth()


    useLayoutEffect(()=>{
        axios.post("/showsellerchats",{email})
        .then(result=>{
            setCont(result.data.cont)
        })
    },[])

  return (
    <div>Chat</div>
  )
}

export default Chat