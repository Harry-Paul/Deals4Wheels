const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;


const handleSendChat=async(req,res)=>{
    const{buyer,id,arr}=req.body
    console.log("req: ",{buyer,id,arr})
    const car_id=id
    const int=await Int.find({buyer:buyer,car_id:car_id})
    console.log("int",int)
    const lastTime=new Date()
    if(int.length===0){
        const obj = new ObjectID(id);
        const cont=await Car.findOne({ _id : obj});
        const car_name=cont.brand+" "+cont.model+" "+cont.variant
        const year=cont.year
        const kilometers=cont.kilometers
        const transmission=cont.transmission
        const fuel=cont.fuel
        const price=cont.price
        const seller=cont.email
        const image=cont.images[0]
        Int.create({buyer,seller,car_id,lastTime,car_name,year,car_name,kilometers,transmission,fuel,price,image})
    }
    run();
    async function run(){
        await Int.updateOne({buyer:buyer,car_id:car_id},{messages:arr,lastTime:lastTime})
    }
    res.json({"success":true})
}

module.exports={handleSendChat}