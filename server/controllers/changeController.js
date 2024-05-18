const Car = require('../model/car');

const handleChange=async(req,res)=>{
    const date=new Date()
    Car.updateMany({type:"Auction",endTime:{$gte:date}},{status:"sold"})
    res.json({"success":true})
}

module.exports={handleChange}