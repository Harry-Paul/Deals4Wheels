const Int = require('../model/interest');
const Car = require('../model/car');
const ObjectID = require('mongodb').ObjectId;

const handleShowChat=async(req,res)=>{
    const{email,id,user}=req.body
    const obj = new ObjectID(id);
    const prop=await Car.find({_id:obj})
    const cont=Int.find({buyer:email,car:prop[0]})
    let arr;
    if(cont[0]){
        arr=cont[0]
    }
    else{
        arr=[]
    }
    function f2(){
        if(user==="buyer"){
            let i;
            for(i=0;i<arr.length;i++){
              if(arr[i].slice(0,1)==="0"){
                arr.push(["flex flex-row justify-start",arr[i].slice(1)])
              }
              else{
                arr.push(["flex flex-row justify-end",arr[i].slice(1)])
              }
            }
            return arr
          }
          else{
            for(let i=0;i<arr.length;i++){
              if(arr[i].slice(0,1)==="0"){
                arr.push(["flex flex-row justify-end",arr[i].slice(1)])
              }
              
              else{
                arr.push(["flex flex-row justify-start",arr[i].slice(1)])
              }
            }
            return arr
          }
    }
    
      async function run(){
        const chat=f2()
        console.log("chat: ",chat)
        res.json({"chat":chat})
    }
    run()
    
}
module.exports={handleShowChat}