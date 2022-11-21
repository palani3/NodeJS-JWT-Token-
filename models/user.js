const mongoose = require('mongoose');
const {roles} =require('./roles')
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:5,
        max:255
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles :{
        type : String,
        enum : [roles.admin, roles.user],
        default:roles.user 
    }
})

module.exports = mongoose.model("User",userSchema)