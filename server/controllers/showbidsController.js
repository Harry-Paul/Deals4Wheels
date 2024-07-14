const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowbids=async(req,res)=>{
    const{id}=req.body
    const obj = new ObjectID(id);
    const car=await Car.findOne({_id:obj})
    const bids=car.bidders
    arr=[]
    for(let i=0;i<bids.length;i++){
        a=bids[i].split(":")
        arr.push(a)
    }
    arr.reverse()
    res.json({"bids":arr})
}

module.exports={handleShowbids}