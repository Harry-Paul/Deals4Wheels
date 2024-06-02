const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleUpdateTrend=async(req,res)=>{
    const{id,email}=req.body
    const obj = new ObjectID(id);
    const car=await Car.findOne({_id:obj})
    if(!email || email!=car.email){
        let act=car.activity
        act=act+1
        await Car.findOneAndUpdate({_id:obj},{activity:act})
    }
}

module.exports={handleUpdateTrend}