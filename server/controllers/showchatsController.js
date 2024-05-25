const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowChats = async(req,res)=>{
    const{email,user}=req.body
    let cont;
    if(user==="buyer"){
        cont=await Int.find({buyer:email}).sort({lastTime:-1});
    }
    else{
        cont=await Int.find({seller:email}).sort({lastTime:-1});
    }
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

module.exports={handleShowChats}