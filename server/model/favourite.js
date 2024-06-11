const mongoose=require("mongoose");
const ObjectID = require('mongodb').ObjectId;

const carSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    variant:{
        type:String,
        required:true
    },
    fuel:{
        type:String,
        required:true
    },
    transmission:{
        type:String,
        required:true
    },
    kilometers:{
        type:Number,
        required:true
    },
    owner:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required: true
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date,
    },
    date:{
        type:Date,
        required:true
    },
    activity:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
    },
    images:[{
        type:String
    }]
})

const favSchema= new mongoose.Schema({
    buyer:{
        type: String,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    car_id:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model('Fav', favSchema)