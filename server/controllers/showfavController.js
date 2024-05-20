const Fav = require('../model/favourite');

const handleShowFav=async(req,res)=>{
    const{email}=req.body
    const cont=Fav.find({buyer:email})
    res.json({"Fav":cont})
}
module.exports={handleShowFav}