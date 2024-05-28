const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleUpdatePrice = async(req,res)=>{
    const{id,price}=req.body
    const user=req.user
    
}

module.exports={handleUpdatePrice}