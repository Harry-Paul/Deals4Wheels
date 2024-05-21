const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowSellerChats = async(req,res)=>{
    const{email}=req.body
    const cont=await Int.find({seller:email})
    function send(){
        let arr=[]
        for(let i=0;i<cont.length;i++){
            if(cont[i].messages){
                arr.push(cont[i])
            }
        }
        return arr;
    }
    async function run(){
        let arr=send()
        res.json({"cont":arr})
    }
    run()
}

module.exports={handleShowSellerChats}