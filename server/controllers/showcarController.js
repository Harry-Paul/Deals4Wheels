const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowCar=async(req,res)=>{
    const{id,email}=req.body
    run().catch(error => console.log(error.stack));
    async function run(){
        console.log(id);
        const obj = new ObjectID(id);
        const cont=await Car.find({ _id : obj});
        if(cont[0].email!=email){
            const activity=cont[0].activity+1
            await ar.findOneAndUpdate({_id:obj},{activity:activity})
        }
        console.log(cont);        
        res.json({"cont":cont})
    }
}

module.exports={handleShowCar}