const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowChat=async(req,res)=>{
    const{buyer,id,user}=req.body
    console.log(req.body)
    const obj = new ObjectID(id);
    const prop=await Car.findOne({_id:obj})
    const seller=prop.email
    const car_id=id
    let cont;
    cont=await Int.findOne({buyer:buyer,car_id:car_id})
    console.log("cont: ",cont)
    let arr=[];
    if(cont){
        arr=cont.messages
    }
    else{
        arr=[]
    }
    function f2(){
        let a=[]
        if(user==="buyer"){
            let i;
            for(i=0;i<arr.length;i++){
              if(arr[i].slice(0,1)==="0"){
                a.push(["flex flex-row justify-start",arr[i].slice(1)])
              }
              else{
                a.push(["flex flex-row justify-end",arr[i].slice(1)])
              }
            }
            return a
          }
          else{
            for(let i=0;i<arr.length;i++){
              if(arr[i].slice(0,1)==="0"){
                a.push(["flex flex-row justify-end",arr[i].slice(1)])
              }
              
              else{
                a.push(["flex flex-row justify-start",arr[i].slice(1)])
              }
            }
            return a
          }
    }
    
      async function run(){
        const chat=f2()
        console.log("chat: ",chat)
        res.json({"chat":chat,"arr":arr})
    }
    run()
    
}
module.exports={handleShowChat}