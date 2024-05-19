const Int = require('../model/interest');

const handleShowChat=async(req,res)=>{
    const{email,id}=req.body
    const obj = new ObjectID(id);
    const prop=await Car.find({_id:obj})
    const cont=Int.find({buyer:email,car:prop[0]})
    const chat=cont[0]
    res.json({"Chat":chat})
}
module.exports={handleShowChat}