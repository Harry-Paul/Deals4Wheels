import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function Sell() {
    const navigate = useNavigate();
    const location = useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email = auth?.email;
    const accessToken = auth?.accessToken;
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [variant, setVariant] = useState('');
    const [transmission, setTransmission] = useState('');
    const [engine, setEngine] = useState('');
    const [power, setPower] = useState('');
    const [kilometers, setKilometers] = useState('');
    const [owner, setOwner] = useState('');
    const [status, setStatus] = useState('Fixed Price');
    const [price, setPrice] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [currentTime, setCurrentTime]=useState('')
    

    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');
    const [prevImg, setPrevImg] = useState([]);
    const [prevSrc, setPrevSrc] = useState([]);
    const imgArray = [];

    useLayoutEffect(()=>{
        var date= new Date();
        let year=date.getFullYear()
        let month=date.getMonth()
        let day=date.getDate()
        let hours=date.getHours()
        let minutes=date.getMinutes()
        if(month<10){
            month="0"+month
        }
        if(day<10){
            day="0"+day
        }
        if(hours<10){
            hours="0"+hours
        }
        if(minutes<10){
            minutes="0"+minutes
        }
        let str=year+"-"+month+"-"+day+"T"+hours+":"+minutes
        setCurrentTime(str)
        setStartTime(str)
        setEndTime(str)
        console.log(str)
    },[])

    const handleFileInputChange = (e) => {
        const prev = [...prevImg]
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            prev.push(file);
            setPrevImg(prev)
            previewFile(file);
            setSelectedFile(file);
            setFileInputState(e.target.value);
        }
    };

    const previewFile = (file) => {
        const Src = [...prevSrc]
        const reader = new FileReader();
        console.log(prevImg.length)
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            Src.push(reader.result);
        };
        setPrevSrc(Src)
    };


    const submit=()=>{
        if(brand==='' || model==='' ||variant==='' || engine==='' || power==='' || kilometers==='' || price==='' || (status==="auction" && startTime==='') || (status==="auction" && endTime==='') ){
            alert("Fill out required fields")
        }
        else{
            prevSrc.forEach(src => {
                imgArray.push(src);
            })
            console.log(imgArray)
            axios.post('/sell',{brand,model,variant,transmission,engine,power,kilometers,owner,status,price,startTime,endTime,description,imgArray})
            .then(result=>{
                console.log(result.data)
            })
            .catch(err=>{
                console.log(err)
            })
            navigate()
        }
    }


    return (
        <>
            <Navbar />

            <form onSubmit={submit} className="grid lg:grid-cols-2 md:mt-[80px] mt-[50px]">
                <div className="mx-auto">
                    <div class="py-[10px]">
                        <label className="" for="propname">Brand : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setBrand(e.target.value) }} placeholder="Brand" name="Brand" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="street">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Model : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setModel(e.target.value) }} placeholder="Model" name="Model" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="city">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Variant : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setVariant(e.target.value) }} placeholder="Variant" name="Variant" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="state">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Engine : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setEngine(e.target.value) }} placeholder="Engine" name="Engine" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="country">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Power : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setPower(e.target.value) }} placeholder="Power" name="Power" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="beds">&nbsp; &nbsp; &nbsp;Kilometers : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setKilometers(e.target.value) }} placeholder="Kilometers" name="Kilometers" id="" required />
                    </div>
                    <div className="flex flex-wrap py-[15px]">
                        <label className="" for="type">&nbsp; Transmission Type : </label>
                        <div className="">
                            <select onClick={(e)=>{setTransmission(e.target.value)}} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Manual" >Manual</option>
                                <option value="Automatic" >Automatic</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap py-[15px]">
                        <label className="" for="type">&nbsp; Owner Type : </label>
                        <div className="">
                            <select onClick={(e)=>{setOwner(e.target.value)}} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Manual" >First</option>
                                <option value="Second" >Second</option>
                                <option value="Third" >Third</option>
                                <option value="Fourth & above" >Fourth & above</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap py-[15px]">
                        <label className="" for="type">&nbsp; Status : </label>
                        <div className="">
                            <select onClick={(e)=>{setStatus(e.target.value)}} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Manual" >Fixed Price</option>
                                <option value="Second" >Auction</option>
                            </select>
                        </div>
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Price : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setPrice(e.target.value) }} placeholder="Price" name="Price" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Start Time : </label>
                        <input onChange={(e)=>setStartTime(e.target.value)}
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value={startTime}
                            min={currentTime} />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;End Time : </label>
                        <input onChange={(e)=>{setEndTime(e.target.value);console.log(endTime)}}
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value={endTime}
                            min={currentTime} />
                    </div>
                    <div class="py-[10px] flex flex-wrap">
                        <label className="" for="description">&nbsp; &nbsp; &nbsp; Description : </label>
                        <textarea className="p-4 mx-1 border-2" type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" name="Description" id="" required />
                    </div>

                    
                    
                </div>

                <div className="mx-auto md:mt-10 mt-5">
                    <h1 className="px-4 text-center font-bold md:text-4xl text-2xl" >Upload Images</h1>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        className="ml-5 p-5"
                    />
                    <div className="flex flex-wrap justify-center">
                        {prevSrc && prevSrc?.map((img) => (
                            <div className=" m-2">
                            <img
                                className="object-cover h-[100px] w-[150px]"
                                src={img}
                                alt="chosen"

                            />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                    <button className="bg-black text-white hover:bg-slate-400 hover:text-black p-3 m-5 rounded-xl" onClick={submit}>Submit</button>
                    
                </div>
                </div>
                
            </form>
            

            <div>

            </div>
        </>
    )

}