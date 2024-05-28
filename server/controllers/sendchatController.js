const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;


const handleSendChat=async(req,res)=>{
    const{buyer,id,arr}=req.body
    console.log("req: ",{buyer,id,arr})
    const obj = new ObjectID(id);
    const car=await Car.findOne({_id:obj})
    console.log("car: ",car)
    const int=await Int.find({buyer:buyer,car:car})
    console.log("int",int)
    const lastTime=new Date()
    if(int.length===0){
        const seller=car.email
        Int.create({buyer,seller,car,lastTime})
    }
    run();
    async function run(){
        await Int.updateOne({buyer:buyer,car:car},{messages:arr,lastTime:lastTime})
    }
    res.json({"success":true})
}

module.exports={handleSendChat}