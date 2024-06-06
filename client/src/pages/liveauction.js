import {React, useState, useLayoutEffect} from 'react'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { FaBorderAll, FaHeart } from "react-icons/fa6";

const Liveauction = () => {
    const navigate=useNavigate()
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    let email=auth?.email
    let accessToken=auth?.accessToken
    const[cont,setCont]=useState([])
    const[fav,setFav]=useState(" ")
    const [color,setColor]=useState({})
    const[s1,setS1]=useState('bg-white text-black my-3 rounded-lg ml-20 px-4 hover:bg-gray-500')
    const[s2,setS2]=useState('bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
    const[s3,setS3]=useState('bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')

    useLayoutEffect(()=>{
        let fav=auth.email?true:false
        let type="Auction"
        axios.post("/car",{type,fav,email})
        .then(result=>{
            setCont(result.data.cont)
            setColor(result.data.color)
        })
        .catch(err=>console.log(err))
    },[])


    const car=(id)=>{
        return () => {
          navigate("/car", { state: { id: id} })
        }
      }

      const favourite=(id,status,seller)=>{
        send(accessToken,email)
        function send(){
        console.log("status: ",status)
        console.log("ert: ",accessToken)
        console.log("ert: ",email)
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
            
        }
        })
        }
        
      }

      const change=(type)=>{
        if(type==="latest"){
          if(s1==='bg-white text-black my-3 rounded-lg ml-20 px-4 hover:bg-gray-500'){
            if(s2==='bg-black text-white my-3 rounded-lg ml-5 px-4 hover:bg-gray-500'){
              setS2('bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
            }
            else if(s3==='bg-black text-white my-3 rounded-lg ml-5 px-4 hover:bg-gray-500'){
              setS3('bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
            }
            setS1('bg-black text-white my-3 rounded-lg ml-20 px-4 hover:bg-gray-500')
            let type="Live"
            let filter="latest"
            axios.post("/filter",{type,filter})
            .then(result=>{
              setCont(result.data.cont)
            })
            .catch(err=>console.log(err))
          }
        }
        else if(type==="soon"){
          if(s2==='bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500'){
            if(s1==='bg-black text-white my-3 rounded-lg ml-20 px-4 hover:bg-gray-500'){
              setS1('bg-white text-black my-3 rounded-lg ml-20 px-4 hover:bg-gray-500')
            }
            else if(s3==='bg-black text-white my-3 rounded-lg ml-5 px-4 hover:bg-gray-500'){
              setS3('bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
            }
            setS2('bg-black text-white my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
            let type="Live"
            let filter="soon"
            axios.post("/filter",{type,filter})
            .then(result=>{
              setCont(result.data.cont)
            })
            .catch(err=>console.log(err))
          }
        }
        else{
          if(s3==='bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500'){
            if(s2==='bg-black text-white my-3 rounded-lg ml-5 px-4 hover:bg-gray-500'){
              setS2('bg-white text-black my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
            }
            else if(s1==='bg-black text-white my-3 rounded-lg ml-20 px-4 hover:bg-gray-500'){
              setS1('bg-white text-black my-3 rounded-lg ml-20 px-4 hover:bg-gray-500')
            }
            setS3('bg-black text-white my-3 rounded-lg ml-5 px-4 hover:bg-gray-500')
            let type="Live"
            let filter="trending"
            axios.post("/filter",{type,filter})
            .then(result=>{
              setCont(result.data.cont)
            })
            .catch(err=>console.log(err))
          }
        }
      }

  return (
    <div>
        <Navbar/>
        <div className='mt-[0px] flex flex-row pl-[80px]  bg-gray-700 fixed z-10 w-full'>
            <p className=' py-2 text-white text-4xl'>Live Auctions</p>
            <button onClick={()=>change("latest")} className={s1}>Latest</button>
            <button onClick={()=>change("soon")} className={s2}>Ending Soon</button>
            <button onClick={()=>change("trending")} className={s3}>Trending</button>
        </div>
        <div className="pt-[100px] my-20 mx-20  items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-white " >
          {cont.map((arr2)=>(
                    <div className='col-span-1 shadow-xl  md:h-[360px] h-[300px] hover:scale-[1.010] cursor-pointer rounded-xl'>
                      <img onClick={car(arr2._id)} className='h-4/6 object-cover w-full rounded-t-xl' src={arr2.images[0]}/>
                      <div  className=" pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px] bg-white rounded-xl">
                        <p onClick={car(arr2._id)} className='md:text-lg font-medium truncate pb-1'>{arr2.brand} {arr2.model} {arr2.variant}</p>
                        <p onClick={car(arr2._id)} className='text-gray-600 flex flex-row truncate'><div className='pr-2 xl:pr-3'>{arr2.kilometers} kms </div> &#183;<div className='px-2 xl:px-3'>{arr2.transmission}</div> &#183; <div className='pl-2 xl:pl-3'>{arr2.fuel}</div></p>
                        <p className='mt-3 text-gray-600'>Highest bid:</p>
                        <p className='font-bold md:text-2xl text-md grid grid-cols-7'><div className='col-span-6 truncate'>{`₹${arr2.price}`}</div> <div className='col-span-1'><FaHeart onClick={()=>{var arr=color;if(color[arr2._id]==="red"){favourite(arr2._id,false,arr2.email);arr[arr2._id]="white"}else{favourite(arr2._id,true,arr2.email);arr[arr2._id]="red"};setColor(arr);fav===" "?setFav("acd"):setFav(" ")}} color={color[arr2._id]} style={{ stroke: "red", strokeWidth: "20"}}/></div></p>
                      </div>
                    </div>
                  
              ))}
          </div>
    </div>
  )
}

export default Liveauction