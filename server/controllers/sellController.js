const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Car = require('../model/car');
const cloudinary = require("../utils/cloudinary");

const handleSell = async (req,res) => {
    const{brand,model,variant,transmission,engine,power,kilometers,owner,status,price,startTime,endTime,description,imgArray}=req.body;
    
   
            let images=[];
            let i=0;
            const date = new Date();
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
                Car.create({brand,model,variant,transmission,engine,power,kilometers,owner,status,price,startTime,endTime,description,images})
                res.json("Created")
            }
}

module.exports = {handleSell};