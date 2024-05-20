const Car = require('../model/car');
const Fav = require('../model/favourite');
const ObjectID = require('mongodb').ObjectId;

const handleCar=async (req,res)=>{
    console.log(req.body)
    const{type,fav}=req.body;
    let cont;
    if(type==="All"){
        cont=await Car.find({status:"Active"});
    }
    else if(type==="Auction"){
        cont=await Car.find({type:"Auction",status:"Active"})
    }
    else if(type==="Home"){
        cont=await Car.find({status:"Active"});
        cont=cont.slice(0,8)
    }
    else if(type==="User"){
        const{email}=req.body
        cont=await Car.find({email:email})
    }
    else if(type==="single"){
        const{id}=req.body
        const obj = new ObjectID(id);
        cont=await Car.find({_id:obj})
    }
    if(fav===true){
        console.log("dfg")
        const{email}=req.body
        console.log(email)
        const fav= await Fav.find({buyer:email})
        // console.log(fav)
        function f1(){
            let id=[]
            let arr={}
            // console.log(fav)
            for(let i=0;i<fav.length;i++){
                id.push(fav[i].car._id.toString())
            }
            console.log(id)
            for(let i=0;i<cont.length;i++){
                if(id.includes(cont[i]._id.toString())){
                    arr[cont[i]._id]="red"
                }
                else{
                    arr[cont[i]._id]="white"
                }
            }
            console.log(arr)
            return arr
        }
        async function run(){
            console.log("jkl")
            const arr=f1()
            console.log(arr)
            res.json({"success":true,"cont":cont,"color":arr})
        }
        run()
    }
    else{
        let i=0;
        let f2=function(){
            let arr={}
            for(i=0;i<cont.length;i++){
                arr[cont[i]._id]="white"
            }
            return arr
        }
        async function run(){
            const arr=f2()
            res.json({"success":true,"cont":cont,"color":arr})
        }
        run()
    }
}

module.exports = {handleCar};