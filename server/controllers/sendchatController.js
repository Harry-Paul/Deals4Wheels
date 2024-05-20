const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;


const handleSendChat=async(req,res)=>{
    const{email,id,arr}=req.body
    console.log("req: ",{email,id,arr})
    const obj = new ObjectID(id);
    const car=await Car.findOne({_id:obj})
    console.log("car: ",car)
    const int=await Int.find({buyer:email,car:car})
    console.log("int",int)
    if(int.length===0){
        const seller=car.email
        const buyer=email
        Int.create({buyer,seller,car})
    }
    run();
    async function run(){
        await Int.updateOne({buyer:email,car:car},{messages:arr})
    }
    res.json({"success":true})
}

module.exports={handleSendChat}