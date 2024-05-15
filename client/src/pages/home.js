import React from 'react'
import buy from '../hooks/buy.png'
import bg3 from '../hooks/bg3.jpg'
import sell from '../hooks/sell.png'
import calculate from '../hooks/calculate.png'
import live from '../hooks/live.png'
import upcomming from '../hooks/upcomming.png'
import Navbar from '../components/Navbar'
import swift from '../hooks/swift.jpg'
import etios from '../hooks/etios.jpg'
import santro from '../hooks/santro.jpeg'
import taigun from '../hooks/taigun.jpg'
import alto from '../hooks/alto.jpg'
import { useNavigate } from 'react-router-dom'




const Home = () => {

  const navigate=useNavigate()
  const arr=[{img:<img className='w-9 h-9' src={buy}/>,button:"Buy"}, 
{img: <img className='w-11 h-11' src={sell}/>,button:"Sell"}, 
{img: <img className='w-10 h-11' src={calculate}/>,button:"Calculate Price"},
{img: <img className='w-11 h-11' src={live}/>,button:"Live Auction"}, 
{img: <img className='w-11 h-11' src={upcomming}/>,button:"Upcoming Auction"}];

const arr2=[{img:<img className='bg-cover p-5' src={swift}/>,model:"Swift",brand:"Maruti Suzuki",varient:"VXi",transmission:"Manual",fuel:"Petrol",price:"6,78,000"}, 
{img: <img className='bg-cover p-5' src={alto}/>,model:"Alto",brand:"Maruti Suzuki",varient:"ZXi",transmission:"Manual",fuel:"Petrol",price:"3,56,000"}, 
{img: <img className='bg-cover p-5' src={taigun}/>,model:"Taigun",brand:"Volkswagen",varient:"TSI",transmission:"Manual",fuel:"Petrol",price:"14,87,000"}, 
{img: <img className='bg-cover p-5' src={etios}/>,model:"Etios",brand:"Toyota",varient:"G",transmission:"Manual",fuel:"Diesel",price:"6,63,000"}, 
{img: <img className='bg-cover p-5' src={santro}/>,model:"Santro",brand:"Hyundai",varient:"Magna",transmission:"Manual",fuel:"Petrol",price:"4,18,000"},
{img:<img className='bg-cover p-5' src={swift}/>,model:"Swift",brand:"Maruti Suzuki",varient:"VXi",transmission:"Manual",fuel:"Petrol",price:"6,78,000"}, 
{img: <img className='bg-cover p-5' src={alto}/>,model:"Alto",brand:"Maruti Suzuki",varient:"ZXi",transmission:"Manual",fuel:"Petrol",price:"3,56,000"}, 
{img: <img className='bg-cover p-5' src={taigun}/>,model:"Taigun",brand:"Volkswagen",varient:"TSI",transmission:"Manual",fuel:"Petrol",price:"14,87,000"}];



    return (
      <div>
        <Navbar/>
        <div className='bg-gray-200'>
        <div>
          <div className='mt-5 bg-white'>
          <img className='w-full' src={bg3} alt=""></img>
            <div className=" -mt-12 absolute mx-28 h-24 w-5/6 items-center justify-center grid grid-cols-5 gap-4 bg-white rounded-2xl shadow-lg">
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[0].img}{arr[0].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[1].img}{arr[1].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/predict')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-[60px] lg:h-13 md:h-11 h-9 bg-red-500 text-white  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[2].img}{arr[2].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[3].img}{arr[3].button}</div>
                  </div>
                  <div className="rounded-xl">
                    <div onClick={()=>navigate('/sell')} className='flex hover:scale-[1.050] cursor-pointer gap-4 justify-center  items-center xl:w-full lg:w- md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 text-red-700  xl:text-[22px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr[4].img}{arr[4].button}</div>
                  </div>                                  
            </div>

          <div className=" mt-20 mx-20 h-24 items-center justify-center grid grid-cols-4 gap-14 bg-white " >
          {arr2.map((arr2)=>(
                  <div>
                    <div className='col-span-1 shadow-2xl  md:h-[360px] h-[300px] hover:scale-[1.050] cursor-pointer'>
                      <div className='flex justify-center h-[200px]'>
                      {arr2.img}
                      </div>
                      <div className=" ml-2 pb-6 md:pl-5 md:py-[5px] px-[9px] py-[3px] bg-white">
                        <p>{`Brand: ${arr2.brand}`}</p>
                        <p>{`Model: ${arr2.model}`}</p>
                        <p>{`Varient: ${arr2.varient}`}</p>
                        <p>{`Transmission Type: ${arr2.transmission}`}</p>
                        <p>{`Fuel Type: ${arr2.fuel}`}</p>
                        <p className='mt-3 font-bold md:text-lg text-md'>{`₹ ${arr2.price}`}</p>
                      </div>
                    </div>
                  </div>
              ))}
          </div>

          </div>
        </div>
      </div>
      </div>
      
    )
  };
  
  export default Home;