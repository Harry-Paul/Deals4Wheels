const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;


const handleBid=async(req,res)=>{
    const{buyer,price1,id}=req.body
    console.log(req.body)
    const obj = new ObjectID(id);
    const car =await Car.findOne({_id:obj})
    console.log(car)
    let arr=car.bidders
    let str=buyer+":"+price1;
    arr.push(str)
    console.log(arr)
    run();
    async function run(){
        await Car.updateOne({_id:obj},{bidders:arr,price:price1})
    }
    res.json({"success":true})
}

module.exports={handleBid}