import {React, useState, useLayoutEffect} from 'react'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import axios from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { FaBorderAll, FaHeart } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const Liveauction = () => {
    const navigate=useNavigate()
    const {auth}=useAuth()
    const {setAuth}=useAuth()
    let email=auth?.email
    let accessToken=auth?.accessToken
    const[cont,setCont]=useState([])
    const[fav,setFav]=useState(" ")
    const [color,setColor]=useState({})
    const[s1,setS1]=useState('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
    const[s2,setS2]=useState('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
    const[s3,setS3]=useState('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
    const[s6,setS6]=useState('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
    const[s4,setS4]=useState('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
    const[s5,setS5]=useState('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
    const[b6,setB6]=useState('black')
    const[b4,setB4]=useState('black')
    const[b5,setB5]=useState('black')
    const[dates,setDates]=useState({})

    useLayoutEffect(()=>{
        let fav=auth.email?true:false
        let type="Auction"
        axios.post("/car",{type,fav,email})
        .then(result=>{
            setCont(result.data.cont)
            setColor(result.data.color)
            let date={}
            for(let i=0;i<result.data.cont.length;i++){
              let date2=new Date(result.data.cont[i].endTime)
              let date1=new Date()
              console.log(date1," ",date2)
              const differenceInMs = date2 - date1;
              console.log(differenceInMs)
              const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
              const differenceInHours = Math.floor((differenceInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              date[result.data.cont[i]._id]=[differenceInDays,differenceInHours]
            }
            console.log("date: ",date)
            setDates(date)
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

      const change=(t)=>{
        if(t==="latest"){
          if(s1==='bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
            if(s2==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
              setS2('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            }
            else if(s3==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
              setS3('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            }
            else if(s6==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS6('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB6('black')
            }
            else if(s4==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS4('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB4('black')
            }
            else if(s5==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS5('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB5('black')
            }
            setS1('bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            let type="Live"
            let filter="latest"
            axios.post("/filter",{type,filter})
            .then(result=>{
              setCont(result.data.cont)
            })
            .catch(err=>console.log(err))
          }
        }
        else if(t==="soon"){
          if(s2==='bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
            if(s1==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
              setS1('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            }
            else if(s3==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
              setS3('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            }
            else if(s6==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS6('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB6('black')
            }
            else if(s4==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS4('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB4('black')
            }
            else if(s5==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS5('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB5('black')
            }
            setS2('bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            let type="Live"
            let filter="soon"
            axios.post("/filter",{type,filter})
            .then(result=>{
              setCont(result.data.cont)
            })
            .catch(err=>console.log(err))
          }
        }
        else if(t==="trending"){
          if(s3==='bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
            if(s2==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
              setS2('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            }
            else if(s1==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
              setS1('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            }
            else if(s6==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS6('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB6('black')
            }
            else if(s4==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS4('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB4('black')
            }
            else if(s5==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
              setS5('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
              setB5('black')
            }
            setS3('bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
            let type="Live"
            let filter="trending"
            axios.post("/filter",{type,filter})
            .then(result=>{
              setCont(result.data.cont)
            })
            .catch(err=>console.log(err))
          }
        }
        else if(t.includes("price")){
          if(s1==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
            setS1('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
          }
          else if(s2==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
            setS2('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
          }
          else if(s3==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
            setS3('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
          }
          else if(s5==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
            setS5('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
            setB5('black')
          }
          else if(s6==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
            setS6('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
            setB6('black')
          }
          setS4('peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
          setB4('white')
          let type="Live"
          let filter=t
          axios.post("/filter",{type,filter})
          .then(result=>{
            setCont(result.data.cont)
          })
          .catch(err=>console.log(err))
      }
      else if(t.includes("distance")){
        if(s1==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
          setS1('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
        }
        else if(s2==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
          setS2('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
        }
        else if(s3==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
          setS3('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
        }
        else if(s4==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
          setS4('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
          setB4('black')
        }
        else if(s6==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
          setS6('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
          setB6('black')
        }
        setS5('peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
        setB5('white')
        let type="Live"
        let filter=t
        axios.post("/filter",{type,filter})
        .then(result=>{
          setCont(result.data.cont)
        })
        .catch(err=>console.log(err))
      }
      else if(t.includes("year")){
        if(s1==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
          setS1('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
        }
        else if(s2==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
          setS2('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
        }
        else if(s3==='bg-black text-white py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500'){
          setS3('bg-white text-black py-[5px] h-[35px] rounded-lg mt-[5px] mr-5 px-4 hover:bg-gray-500')
        }
        else if(s4==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
          setS4('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
          setB4('black')
        }
        else if(s5==='peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row'){
          setS5('peer bg-white text-black py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
          setB5('black')
        }
        setS6('peer bg-black text-white py-[5px] rounded-lg mr-5 px-4 hover:bg-gray-500 flex flex-row')
        setB6('white')
        let type="Live"
        let filter=t
        axios.post("/filter",{type,filter})
        .then(result=>{
          setCont(result.data.cont)
        })
        .catch(err=>console.log(err))
      }
      }

  return (
    <div>
        <Navbar/>
        <div className='flex-wrap  flex md:pl-[80px] pl-[50px] py-[10px]  bg-gray-700 fixed z-10 w-full'>
            <p className=' text-white text-4xl md:mr-40 mr-10'>Live Auctions</p>
            <button onClick={()=>change("latest")} className={s1}>Latest</button>
            <button onClick={()=>change("soon")} className={s2}>Ending Soon</button>
            <button onClick={()=>change("trending")} className={s3}>Trending</button>
            <div className='py-[5px]'>
            <button className={s4}><div className='mt-[2px] pr-[6px]'><IoMdArrowDropdown color={b4} size="20px"/></div>Sort by Price</button> 
            <div class="hidden absolute peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{change("pricelow")}} class="px-5 py-3 hover:bg-gray-200" href="#">Lowest to Highest</a>
                <a onClick={()=>{change("pricehigh")}} class="px-5 py-3 hover:bg-gray-200" href="#">Highest to Lowest</a>
              </div>   
            </div>
            <div className='py-[5px]'>
              <button className={s5}><div className='mt-[2px] pr-[6px]'><IoMdArrowDropdown color={b5} size="20px"/></div>Sort by Distance</button>
              <div class="hidden absolute peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{change("distancelow")}} class="px-5 py-3 hover:bg-gray-200" href="#">Lowest to Highest</a>
                <a onClick={()=>{change("distancehigh")}} class="px-5 py-3 hover:bg-gray-200" href="#">Highest to Lowest</a>
              </div>
            </div>
            <div className='py-[5px]'>
              <button className={s6}><div className='mt-[2px] pr-[6px]'><IoMdArrowDropdown color={b6} size="20px"/></div>Sort by Year</button>
              <div class="hidden absolute peer-hover:flex hover:flex w-[200px] flex-col bg-white drop-shadow-lg">
                <a onClick={()=>{change("yearlow")}} class="px-5 py-3 hover:bg-gray-200" href="#">Lowest to Highest</a>
                <a onClick={()=>{change("yearhigh")}} class="px-5 py-3 hover:bg-gray-200" href="#">Highest to Lowest</a>
              </div>
            </div>
            
            
        </div>
        <div className="xl:pt-[100px] md:pt-[150px] pt-[230px] md:my-20 my-[60px] md:mx-20 mx-10  items-center justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-white " >
          {cont.map((arr2)=>(
                    <div className='col-span-1 shadow-xl  md:h-[360px] h-[300px] hover:scale-[1.010] cursor-pointer rounded-xl my-4'>
                      <img onClick={car(arr2._id)} className='h-4/6 object-cover w-full rounded-t-xl' src={arr2.images[0]}/>
                      <div  className=" pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px] bg-white rounded-xl">
                        <p onClick={car(arr2._id)} className='md:text-lg font-medium truncate pb-1'>{arr2.brand} {arr2.model} {arr2.variant}</p>
                        <p onClick={car(arr2._id)} className='text-gray-600 flex flex-row truncate'><div className='pr-2 xl:pr-3'>{arr2.kilometers} kms </div> &#183;<div className='px-2 xl:px-3'>{arr2.transmission}</div> &#183; <div className='pl-2 xl:pl-3'>{arr2.fuel}</div></p>
                        <p className='mt-3 text-gray-600'>Highest bid:</p>
                        <p className='font-bold md:text-2xl text-md grid grid-cols-7'><div className='col-span-6 truncate'>{`₹${arr2.price}`}</div> <div className='col-span-1'><FaHeart onClick={()=>{var arr=color;if(color[arr2._id]==="red"){favourite(arr2._id,false,arr2.email);arr[arr2._id]="white"}else{favourite(arr2._id,true,arr2.email);arr[arr2._id]="red"};setColor(arr);fav===" "?setFav("acd"):setFav(" ")}} color={color[arr2._id]} style={{ stroke: "red", strokeWidth: "20"}}/></div></p>
                        <div className='text-orange-800 flex flex-row'><p>Ends in </p> &nbsp;{dates[arr2._id][0]} Days {dates[arr2._id][1]} Hours </div>
                      </div>
                    </div>
                  
              ))}
          </div>
    </div>
  )
}

export default Liveauction