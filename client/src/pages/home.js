import React from 'react'
import buy from '../hooks/buy.png'
import bg3 from '../hooks/bg3.jpg'
import sell from '../hooks/sell.png'
import calculate from '../hooks/calculate.png'
import live from '../hooks/live.png'
import upcomming from '../hooks/upcomming.png'

const arr=[{img:<img className='w-9 h-9' src={buy}/>,button:"Buy"}, 
{img: <img className='w-11 h-11' src={sell}/>,button:"Sell"}, 
{img: <img className='w-10 h-11' src={calculate}/>,button:"Calculate Price"}, 
{img: <img className='w-11 h-11' src={live}/>,button:"Live Auction"}, 
{img: <img className='w-11 h-11' src={upcomming}/>,button:"Upcomming Auction"}];

const Home = () => {
    return (
      <div className='bg-gray-200'>
        <div className='bg-gray-200 ms-10 mt-4 xl:text-[44px] lg:text-[37px] md:text-[35px] text-[29px] text-blue-500 font-medium'>
        Deal<a className='text-red-700'>4</a>Wheels
        </div>
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
          <select onChange={Option} className="cursor-pointer lg:w-[110px] lg:text-xl md:w-[80px] w-[75px] lg:pl-[30px] md:pl-[20px] pl-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {/* <option selected>{option}</option> */}
              <option className="cursor-pointer" value="US" >BUY</option>
              <option className="cursor-pointer" value="CA" >RENT</option>
            </select>
          </div>

          </div>
        </div>
      </div>
    )
  };
  
  export default Home;