const Int = require('../model/interest');

const handleShowInt=async(req,res)=>{
    const user=req.user
    const cont=Fav.find({buyer:user})
    res.json({"Fav":cont})
}
module.exports={handleShowInt}