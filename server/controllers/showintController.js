const Int = require('../model/interest');

const handleShowInt=async(req,res)=>{
    const{email}=req.body
    const cont=Fav.find({buyer:email})
    res.json({"Fav":cont})
}
module.exports={handleShowInt}