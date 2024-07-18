const Car = require('../model/car');
const Fav = require('../model/favourite');
const Int = require('../model/interest');
const ObjectID = require('mongodb').ObjectId;

const handleCar=async (req,res)=>{
    console.log(req.body)
    const{type,fav,email}=req.body;
    let cont;
    let favst=[];
    let intst=[];
    if(type==="All"){
        cont=await Car.find({status:"Active"});
        console.log(fav)
    }
    else if(type==="Auction"){
        cont=await Car.find({type:"Auction",status:"Active"})
    }
    else if(type==="Upcoming"){
        cont=await Car.find({type:"Auction",status:"Upcoming"})
    }
    else if(type==="Home"){
        cont=await Car.find({status:"Active"});
        cont=cont.slice(0,8)
        console.log("home: ",cont)
    }
    else if(type==="User"){
        const{email}=req.body
        cont=await Car.find({email:email})
    }
    else if(type==="Favourites"){
        const{email}=req.body
        cont=[]
        cont=await Fav.find({buyer:email})
    }
    else if(type==="Interests"){
        const{email}=req.body
        cont=
        cont=await Int.find({buyer:email})
    }
    else if(type==="single"){
        const{id}=req.body
        console.log(id)
        const obj = new ObjectID(id);
        cont=await Car.find({_id:obj})
        favst=await Fav.find({buyer:email,car_id:id})
        intst=await Int.find({buyer:email,car_id:id})
    }
    else{}

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
                id.push(fav[i].car_id)
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
            res.json({"success":true,"cont":cont,"color":arr,"fav":favst,"int":intst})
        }
        run()
    }
    else{
        console.log("iop")
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
            console.log(arr)
            res.json({"success":true,"cont":cont,"color":arr,"fav":[],"int":[]})
        }
        run()
    }
}

module.exports = {handleCar};