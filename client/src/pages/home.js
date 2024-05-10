import React from 'react'
import buy from '../hooks/buy.png'

const arr=[{img:"",button:"Buy"}, {img:"",button:"Sell"}, {img:"",button:"Calculate Price"}, {img:"",button:"Live Auction"}, {img:"",button:"Upcomming Auction"}];

const Home = () => {
    return (
      <div className='bg-gray-200'>
        <div className='ms-10 mt-4 xl:text-[44px] lg:text-[37px] md:text-[35px] text-[29px] text-blue-500 font-medium'>
        Deal<a className='text-red-700'>4</a>Wheels
        </div>
        <div>
          <div className="lg:mt-[225px] md:mt-[185px] mt-[135px] mx-auto rounded-xl z-0">
            <div className="px-16 grid grid-cols-5 gap-0 bg-white ">
              {arr.map((arr)=>(
                  <div className="rounded-xl">
                    <div className='xl:w-56 lg:w-40 md:w-32 w-20 xl:h-16 lg:h-13 md:h-11 h-9 bg-blue-200 text-red-700  xl:text-[20px] lg:text-[16px] md:text-[12px] text-[11.5px] font-medium ml-2 rounded-2xl'>{arr.button}</div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  };
  
  export default Home;