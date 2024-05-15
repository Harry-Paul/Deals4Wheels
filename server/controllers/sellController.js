const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Car = require('../model/car');
const cloudinary = require("../utils/cloudinary");

const handleSell = async (req,res) => {
    const{email,brand,model,variant,transmission,kilometers,owner,status,price,starttime,endtime,description,imgArray}=req.body;
    
   
            let images=[];
            let i=0;
            console.log(imgArray.length)
            console.log(starttime,"  ",endtime)
            const date = new Date();
            const syear=starttime.slice(0,4)
            const smonth=starttime.slice(5,7)
            const sday=starttime.slice(8,10)
            const shour=starttime.slice(11,13)
            const sminute=starttime.slice(14,16)
            const startTime=new Date(syear,smonth,sday,shour,sminute)
            console.log(syear," ",smonth," ",sday," ",shour," ",sminute)
            const eyear=endtime.slice(0,4)
            const emonth=endtime.slice(5,7)
            const eday=endtime.slice(8,10)
            const ehour=endtime.slice(11,13)
            const eminute=endtime.slice(14,16)
            const endTime=new Date(eyear,emonth,eday,ehour,eminute)
            console.log(startTime,"  ",endTime)
            console.log(imgArray.length)
            loop(images);
            function loop(images){
                imgArray.forEach(async img => {
                        try{
                            const result = await cloudinary.uploader.upload(img, {
                                folder: "properties"
                            })
                            images.push(result.secure_url)
                            console.log(images)
                            i++
                            if(i===imgArray.length){
                                upload(images);
                            }
                        }
                        catch(error){
                            console.log(error)
                        }
                })
                if(i===imgArray.length){
                    upload(images);
                }
            }
            function upload(images){
                console.log(images);
                const activity=0
                console.log({email,activity,date,brand,model,variant,transmission,kilometers,owner,status,price,startTime,endTime,description,images})
                Car.create({email,activity,date,brand,model,variant,transmission,kilometers,owner,status,price,startTime,endTime,description,images})
                res.json("Created")
            }
}

module.exports = {handleSell};