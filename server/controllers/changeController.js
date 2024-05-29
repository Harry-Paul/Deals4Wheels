const Car = require('../model/car');

const handleChange=async(req,res)=>{
    const date=new Date()
    await Car.updateMany({type:"Auction",status:"Upcoming",startTime:{$lte:date}},{status:"Active"})
    await Car.updateMany({type:"Auction",endTime:{$lte:date}},{status:"sold"})
    res.json({"success":true})
}

module.exports={handleChange}