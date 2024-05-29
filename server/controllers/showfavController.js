const Fav = require('../model/favourite');

const handleShowFav=async(req,res)=>{
    const user=req.user
    const cont=Fav.find({buyer:user})
    res.json({"Fav":cont})
}
module.exports={handleShowFav}