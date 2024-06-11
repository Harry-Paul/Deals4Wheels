const Car = require('../model/car');

const handleFilter = async(req,res)=>{
    const{type,filter}=req.body
    if(type==="Live"){
        if(filter==="latest"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({startTime:-1});
            console.log(cont)
            res.json({"cont":cont})
        }
        else if(filter==="soon"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({endTime:1})
            res.json({"cont":cont})
        }
        else if(filter==="trending"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({activity:-1})
            res.json({"cont":cont})
        }
        else if(filter==="pricelow"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({price:1})
            res.json({"cont":cont})
        }
        else if(filter==="pricehigh"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({price:-1})
            res.json({"cont":cont})
        }
        else if(filter==="distancelow"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({kilometers:1})
            res.json({"cont":cont})
        }
        else if(filter==="distancehigh"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({kilometers:-1})
            res.json({"cont":cont})
        }
        else if(filter==="yearlow"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({year:1})
            res.json({"cont":cont})
        }
        else if(filter==="yearhigh"){
            const cont=await Car.find({type:"Auction",status:"Active"}).sort({year:-1})
            res.json({"cont":cont})
        }
    }
    else if(type==="fixed"){
        console.log(filter)
        if(filter==="latest"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({startTime:-1});
            console.log(cont)
            res.json({"cont":cont})
        }
        else if(filter==="trending"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({activity:-1})
            res.json({"cont":cont})
        }
        else if(filter==="pricelow"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({price:1})
            res.json({"cont":cont})
        }
        else if(filter==="pricehigh"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({price:-1})
            res.json({"cont":cont})
        }
        else if(filter==="distancelow"){
            console.log("acv")
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({kilometers:1})
            res.json({"cont":cont})
        }
        else if(filter==="distancehigh"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({kilometers:-1})
            res.json({"cont":cont})
        }
        else if(filter==="yearlow"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({year:1})
            res.json({"cont":cont})
        }
        else if(filter==="yearhigh"){
            const cont=await Car.find({type:"Fixed Price",status:"Active"}).sort({year:-1})
            res.json({"cont":cont})
        }
    }
    else if(type==="upcoming"){
        console.log(filter)
        if(filter==="soon"){
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({startTime:1});
            console.log(cont)
            res.json({"cont":cont})
        }
        else if(filter==="pricelow"){
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({price:1})
            res.json({"cont":cont})
        }
        else if(filter==="pricehigh"){
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({price:-1})
            res.json({"cont":cont})
        }
        else if(filter==="distancelow"){
            console.log("acv")
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({kilometers:1})
            res.json({"cont":cont})
        }
        else if(filter==="distancehigh"){
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({kilometers:-1})
            res.json({"cont":cont})
        }
        else if(filter==="yearlow"){
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({year:1})
            res.json({"cont":cont})
        }
        else if(filter==="yearhigh"){
            const cont=await Car.find({type:"Auction",status:"Upcoming"}).sort({year:-1})
            res.json({"cont":cont})
        }
    }
}

module.exports={handleFilter}