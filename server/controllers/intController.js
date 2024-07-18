const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleInt=async(req,res)=>{
    const email=req.user
    const{id}=req.body
    console.log(req.body)
    run().catch(error => console.log(error.stack));
    async function run(){
        car_id=id
        console.log(car_id)
        const obj = new ObjectID(id);
        const cont=await Car.findOne({ _id : obj});
        const car_name=cont.brand+" "+cont.model+" "+cont.variant
        const kilometers=cont.kilometers
        const transmission=cont.transmission
        const fuel=cont.fuel
        const price=cont.price
        const seller=cont.email
        const year=cont.year
        const lastTime=cont.lastTime
        const image=cont.images[0]
            const buyer=email
            const int=await Int.findOne({buyer:email,car_id:id})
            if(!int){
                const messages=["0Interested"]
                Int.create({buyer,seller,car_id,year,lastTime,car_name,kilometers,transmission,fuel,price,image})
            }
            res.json({"success":true})
    }
}

module.exports={handleInt}