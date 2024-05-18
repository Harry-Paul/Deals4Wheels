const Fav = require('../model/favourite');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleFav=async(req,res)=>{
    const{email,id,status,seller}=req.body
    console.log(req.body)
    run().catch(error => console.log(error.stack));
    async function run(){
        const obj = new ObjectID(id);
        const prop=await Car.find({_id:obj})
        const car=prop[0]
        if(status===true){
            const buyer=email
            Fav.create({buyer,seller,car})
            res.json({"success":true})
        }
        else{
            await Fav.findOneAndRemove({buyer:email,car:car})
            res.json({"success":true})
        }
    }
}

module.exports={handleFav}