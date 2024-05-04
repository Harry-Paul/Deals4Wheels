const mongoose=require("mongoose");
const ObjectID = require('mongodb').ObjectId;

const userSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:{
        type:String
    },
    signintype:{
        type:String,
        required:true
    },
    phoneno:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema);