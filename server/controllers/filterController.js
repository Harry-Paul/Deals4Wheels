const Car = require('../model/car');

const handleFilter = async(req,res)=>{
    const{type,filter}=req.body
    if(type==="Live"){
        if(filter==="latest"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({startTime:-1});
            console.log(cont)
            res.json({"cont":cont})
        }
        else if(filter==="soon"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({endTime:1})
            res.json({"cont":cont})
        }
        else{
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({activity:-1})
            res.json({"cont":cont})
        }
    }
    else if(type==="Upcoming"){

    }
}

module.exports={handleFilter}