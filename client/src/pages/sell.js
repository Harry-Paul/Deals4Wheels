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
    const [transmission, setTransmission] = useState('Manual');
    const [kilometers, setKilometers] = useState('');
    const [owner, setOwner] = useState('First');
    const [status, setStatus] = useState('Fixed Price');
    const [price, setPrice] = useState('');
    const [starttime, setStartTime] = useState('');
    const [endtime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    const [currentTime, setCurrentTime]=useState('')
    const [style,setStyle]=useState('py-[10px] hidden')
    const [style1,setStyle1]=useState("py-[17px] mt-[55px] mb-[77px] mx-auto px-8  rounded-3xl bg-white shadow-xl")

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


    const submit=(e)=>{
        e.preventDefault()
        if(brand==='' || model==='' ||variant==='' || kilometers==='' || price==='' || (status==="auction" && starttime==='') || (status==="auction" && endtime==='') ){
            alert("Fill out required fields")
        }
        else{
            prevSrc.forEach(src => {
                imgArray.push(src);
            })
            console.log(imgArray)
            console.log({email,brand,model,variant,transmission,kilometers,owner,status,price,starttime,endtime,description,imgArray})
            axios.post('/sell',{email,brand,model,variant,transmission,kilometers,owner,status,price,starttime,endtime,description,imgArray})
            .then(result=>{
                console.log(result.data)
                navigate("/home")
            })
            .catch(err=>{
                console.log(err)
            })
            
        }
    }


    return (
        <>
            {<Navbar />}

            <form onSubmit={submit} className="grid  lg:grid-cols-2 md:pt-[42px] mt-[50px] bg-gray-300">
                <div className={style1} >

                    <div class="py-[10px]">
                        <label className="" for="propname">&nbsp; Brand : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setBrand(e.target.value) }} placeholder="Brand" name="Brand" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="street">&nbsp; Model : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setModel(e.target.value) }} placeholder="Model" name="Model" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="city">&nbsp;  Variant : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setVariant(e.target.value) }} placeholder="Variant" name="Variant" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="beds">&nbsp; Kilometers : </label>
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
                            <select onClick={(e)=>{setStatus(e.target.value);if(e.target.value==="Auction"){setStyle("py-[10px]")}}} className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="Manual" >Fixed Price</option>
                                <option value="Auction" >Auction</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class={style}>
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Start Time : </label>
                        <input onChange={(e)=>setStartTime(e.target.value)}
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value={starttime}
                            min={currentTime} />
                    </div>
                    <div class={style}>
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;End Time : </label>
                        <input onChange={(e)=>{setEndTime(e.target.value)}}
                            type="datetime-local"
                            id="meeting-time"
                            name="meeting-time"
                            value={endtime}
                            min={currentTime} />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; Price : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setPrice(e.target.value) }} placeholder="Price" name="Price" id="" required />
                    </div>
                    <div class="py-[10px] flex flex-wrap">
                        <label className="" for="description">&nbsp; &nbsp; &nbsp; Description : </label>
                        <textarea className="p-4 mx-1 border-2" type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" name="Description" id="" required />
                    </div>

                    
                    
                </div>

                <div className="mx-auto md:mt-[100px] mt-10">
                    <h1 className="px-4 text-center font-bold md:text-4xl text-2xl" >Upload Images</h1>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        className="ml-[90px] p-5"
                    />
                    <div className=" flex flex-wrap justify-center">
                        {prevSrc && prevSrc?.map((img) => (
                            <div className=" m-2">
                            <img
                                className="ml-[10px] object-cover h-[100px] w-[150px]"
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