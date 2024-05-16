const Car = require('../model/car');

const handleCar=async (req,res)=>{
    const{type}=req.body;
    if(type==="All"){
        let cont=await Car.find();
        res.json({"success":true,"cont":cont})
    }
    else if(type==="Auction"){
        let cont=await Car.find({status:"Auction"})
        res.json({"success":true,"cont":cont})
    }
    else if(type==="Home"){
        let cont=await Car.find();
        cont=cont.slice(0,8)
        res.json({"success":true,"cont":cont})
    }
    else if(type==="User"){
        const{email}=req.body
        let cont=await Car.find({email:email})
        res.json({"success":true,"cont":cont})
    }
}

module.exports = {handleCar};