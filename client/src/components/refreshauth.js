import {React, useLayoutEffect} from 'react'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'

const Refreshauth = () => {
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    const email=auth?.email
    const navigate=useNavigate()

     useLayoutEffect(()=>{
        axios.post('/auth/refresh', { email },
                            {
                                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
                                withCredentials: true
                            })
                            .then(result => {
                                console.log(result)
                                const accessToken = result.data.accessToken;
                                const pic=result.data.pic
                                setAuth({ email, accessToken,pic })
                            })
                            .catch(err => {
                                if (err.response.data.message === "Forbidden" || err.response.data.message === "Unauthorized") {
                                    setAuth({});
                                    navigate('/login')
                                }
                            })
     })
  return (
    <div></div>
  )
}

export default Refreshauth