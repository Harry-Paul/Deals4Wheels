const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowSellerChats = async(req,res)=>{
    const{email}=req.body
    const cont=await Int.find({seller:email})
    let arr=[]
    for(let i=0;i<cont.length;i++){
        if(cont[i].messages){
            arr.push(cont[i])
        }
    }
    res.json({"cont":cont})
}

module.exports={handleShowSellerChats}