const Fav = require('../model/favourite');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleFav=async(req,res)=>{
    const email=req.user
    const{id,status,seller}=req.body
    console.log(req.body)
    run().catch(error => console.log(error.stack));
    async function run(){
        const obj = new ObjectID(id);
        const car=await Car.findOne({_id:obj})
        console.log(car)
        if(status===true){
            const buyer=email
            Fav.create({buyer,seller,car})
            res.json({"success":true})
        }
        else{
            await Fav.findOneAndRemove({buyer:email,car:car})
            console.log("cvb")
            res.json({"success":true})
        }
    }
}

module.exports={handleFav}