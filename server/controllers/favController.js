const Fav = require('../model/favourite');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleFav=async(req,res)=>{
    const email=req.user
    const{id,status,seller}=req.body
    console.log(req.body)
    run().catch(error => console.log(error.stack));
    async function run(){
        car_id=id
        console.log(car_id)
        if(status===true){
            const buyer=email
            Fav.create({buyer,seller,car_id})
            res.json({"success":true})
        }
        else{
            await Fav.findOneAndRemove({buyer:email,car_id:car_id})
            console.log("cvb")
            res.json({"success":true})
        }
    }
}

module.exports={handleFav}