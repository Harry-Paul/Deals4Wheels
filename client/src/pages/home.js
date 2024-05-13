import React from 'react'
import buy from '../hooks/buy.png'
import bg3 from '../hooks/bg3.jpg'
import sell from '../hooks/sell.png'
import calculate from '../hooks/calculate.png'
import live from '../hooks/live.png'
import upcomming from '../hooks/upcomming.png'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const navigate=useNavigate()
  const arr=[{img:<img className='w-9 h-9' src={buy}/>,button:"Buy"}, 
  {img: <img className='w-11 h-11' src={sell}/>,button:"Sell"}, 
  {img: <img onClick={()=>{navigate("/predict")}} className='w-10 h-11' src={calculate}/>,button:"Calculate Price"}, 
  {img: <img className='w-11 h-11' src={live}/>,button:"Live Auction"}, 
  {img: <img className='w-11 h-11' src={upcomming}/>,button:"Upcomming Auction"}];
  
  const arr2=[{img:<img className='w-9 h-9' src={buy}/>,model:"Swift",brand:"Maruti Suzuki",varient:"VXi",transmission:"Manual",fuel:"Petrol"}, 
  {img: <img className='w-11 h-11' src={sell}/>,model:"Alto",brand:"Maruti Suzuki",varient:"ZXi",transmission:"Manual",fuel:"Petrol"}, 
  {img: <img className='w-10 h-11' src={calculate}/>,model:"Taigun",brand:"volkswagen",varient:"TSI",transmission:"Manual",fuel:"Petrol"}, 
  {img: <img className='w-11 h-11' src={live}/>,model:"Etios",brand:"Toyota",varient:"G",transmission:"Manual",fuel:"Diesel"}, 
  {img: <img className='w-11 h-11' src={upcomming}/>,model:"Santro",brand:"Hyundai",varient:"Magna",transmission:"Manual",fuel:"Petrol"}];
  


    return (
      <div>
        <Navbar/>
        <div className='bg-gray-200'>
        <div>
          <div className='mt-5 bg-white'>
          <img className='w-full' src={bg3} alt=""></img>
            <div className=" -mt-12 absolute mx-28 h-24 items-center justify-center grid grid-cols-5 -gap- bg-white rounded-2xl shadow-lg">
              {arr.map((arr)=>(
                  <div className="rounded-xl">
                    <div className='flex gap-4 justify-center  items-center xl:w-64 lg:w-40 md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr.img}{arr.button}</div>
                  </div>
              ))}
            </div>

          <div >
              
          </div>

          </div>
        </div>
      </div>
      </div>
      
    )
  };
  
  export default Home;