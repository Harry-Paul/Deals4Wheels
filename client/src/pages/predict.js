import React, { useState,useEffect,useLayoutEffect } from 'react'
import axios from '../api/axios'
import useAuth from "../hooks/useAuth";
import Navbar from '../components/Navbar';
import robo from '../hooks/robo.gif'


export const Predict = () => {
    const [pred, setPred]=useState('')
    const [year, setYear]=useState('')
    const [kilometers, setKilometers]=useState('')
    const [mileage, setMileage]=useState('')
    const [engine, setEngine]=useState('')
    const [power, setPower]=useState('')
    const [seats, setSeats]=useState('');
    const [manufacturer, setManufacturer]=useState('Audi')
    const [fuel, setFuel]=useState('Petrol')
    const [transmission, setTransmission]=useState('Manual')
    const [owner, setOwner]=useState('First')
    const { auth } = useAuth();
    const[style,setStyle]=useState('hidden')
    const accessToken = auth?.accessToken;

    const Submit=(e)=>{
      e.preventDefault()
      console.log("abc")
      axios.post("/predict",{year,kilometers,mileage,engine,power,seats,manufacturer,fuel,transmission,owner},
      {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }, withCredentials: true
      })
      .then(result=>{
        console.log(result)
        setPred(parseFloat(result.data.data).toFixed(2))
        setStyle('mt-[20px] flex justify-center bg-black text-[25px] rounded-lg')
      })

    }



  return (
    <div>
      <Navbar/>
      <div className='flex-wrap  flex md:pl-[80px] pl-[50px] py-[10px]  bg-gray-700 fixed z-5 w-full justify-center'><p className='text-white text-4xl md:mr-40 mr-10'>AI Powered Price Calculation</p></div>
      
        <form className=" xl:pt-[100px] md:pt-[150px] pt-[250px] md:my-20 my-[60px] grid lg:grid-cols-2 bg-gradient-to-r from-neutral-300 to-slate-50 text-lg md:text-xl">
          <div className="py-[17px] mt-[10px] mb-[10px] mx-auto px-8  rounded-3xl bg-white shadow-xl">
            <div class="py-[10px] md:ml-[175px]">
              <label className="" >Year : </label>
                <input className="border-2 md:px-2" type="text" onChange={(e) => {let x=e.target.value.slice(2); setYear(x) }} placeholder="Year" name="Year" id="" required />
            </div>
            <div className="py-[10px] ">
              <label className="" >Distance Travelled (Km) : </label>
                <input className="border-2 md:px-2" type="text" onChange={(e) => { setKilometers(e.target.value) }} placeholder="Distance Travelled" name="Kilometers" id="" required />
            </div>
            <div className="py-[10px] md:ml-[78px]">
              <label className="" >Mileage (Km/L) : </label>
                <input className="border-2 md:px-2" type="text" onChange={(e) => { setMileage(e.target.value) }} placeholder="Mileage" name="Mileage" id="" required />
            </div>
            <div className="py-[10px] md:ml-[103px]">
              <label className="" >No. of Seats : </label>
                <input className="border-2 md:px-2" type="text" onChange={(e) => { setSeats(e.target.value) }} placeholder="No. of Seats" name="Seats" id="" required />
            </div>
            <div className="py-[10px] md:ml-[23px]">
              <label className="" >Engine Capacity (Cc) : </label>
                <input className="border-2 md:px-2" type="text" onChange={(e) => { setEngine(e.target.value) }} placeholder="Engine Capacity" name="Seats" id="" required />
            </div>
            <div className="py-[10px] md:ml-[100px]">
              <label className="" >Power (Bhp) : </label>
                <input className="border-2 md:px-2" type="text" onChange={(e) => { setPower(e.target.value) }} placeholder="Power" name="Seats" id="" required />
            </div>
            <div className="flex flex-wrap py-[8px] md:ml-[93px]">
              <label className="" for="type">Manufacturer : </label>
              <div className="">
                  <select onChange={(e)=>setManufacturer(e.target.value)} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {/* <option selected>{option}</option> */}
                      <option value="Audi" >Audi</option>
                      <option value="BMW" >BMW</option>
                      <option value="Chevrolet" >Chevrolet</option>
                      <option value="Datsun" >Datsun</option>
                      <option value="Fiat" >Fiat</option>
                      <option value="Force" >Force</option>
                      <option value="Ford" >Ford</option>
                      <option value="Honda" >Honda</option>
                      <option value="Hyundai" >Hyundai</option>
                      <option value="ISUZU" >ISUZU</option>
                      <option value="Isuzu" >Isuzu</option>
                      <option value="Jaguar" >Jaguar</option>
                      <option value="Jeep" >Jeep</option>
                      <option value="Lamborghini" >Lamborghini</option>
                      <option value="Land" >Land Rover</option>
                      <option value="Mahindra" >Mahindra</option>
                      <option value="Maruti" >Maruti</option>
                      <option value="Mercedes-Benz" >Mercedes-Benz</option>
                      <option value="Mini" >Mini</option>
                      <option value="Mitsubishi" >Mitsubishi</option>
                      <option value="Nissan" >Nissan</option>
                      <option value="Porsche" >Porsche</option>
                      <option value="Renault" >Renault</option>
                      <option value="Skoda" >Skoda</option>
                      <option value="Tata" >Tata</option>
                      <option value="Toyota" >Toyota</option>
                      <option value="Volkswagen" >Volkswagen</option>
                      <option value="Volvo" >Maruti</option>
                  </select>
              </div>
            </div>
            <div className="flex flex-wrap py-[8px] md:ml-[123px]">
              <label className="" for="type">Fuel Type : </label>
              <div className="">
                  <select onChange={(e)=>setFuel(e.target.value)} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {/* <option selected>{option}</option> */}
                      <option value="Petrol" >Petrol</option>
                      <option value="CNG" >CNG</option>
                      <option value="Diesel" >Diesel</option>
                      <option value="LPG" >LPG</option>
                      <option value="Electric" >Electric</option>
                  </select>
              </div>
            </div>
            <div className="flex flex-wrap py-[8px] md:ml-[33px]">
              <label className="" for="type">&nbsp; Transmission Type : </label>
              <div className="">
                  <select onChange={(e)=>setTransmission(e.target.value)} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {/* <option selected>{option}</option> */}
                      <option value="Manual" >Manual</option>
                      <option value="Automatic" >Automatic</option>
                  </select>
              </div>
            </div>
            <div className="flex flex-wrap py-[8px] md:ml-[103px]">
              <label className="" for="type">Owner Type : </label>
              <div className="">
                  <select onChange={(e)=>setOwner(e.target.value)} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      {/* <option selected>{option}</option> */}
                      <option value="First" >First</option>
                      <option value="Second" >Second</option>
                      <option value="Third" >Third</option>
                      <option value="Fourth & Above" >Fourth & above</option>
                  </select>
              </div>
            </div>
            <div className='flex justify-center'><button className='bg-black text-white py-2 px-3 rounded-xl mt-[10px] hover:bg-gray-700' onClick={Submit}>SUBMIT</button></div>
            <div className={style}><div className='text-white pt-3'>Price : </div> <div className='bg-white text-black my-2 rounded-lg px-2 py-1 ml-3'> {pred} Lakhs</div></div>
          </div>
          <div>
            
          <div className='flex justify-center'><img className='h-[600px]' src={robo} alt=""></img></div>
          </div>
        </form>
        
    </div>
  )
}

