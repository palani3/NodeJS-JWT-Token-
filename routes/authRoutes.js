const express = require('express');
const authRoutes = express.Router();
const User = require('../models/user');
const {hashGenerator} = require('../helpers/hashing');
const {hashValidator} = require('../helpers/hashing')
const {tokenGenerator} = require('../helpers/token');
const  authverify = require('../helpers/authverify');


authRoutes.post('/signup',async(req,res)=>{
    const hashPassword =await hashGenerator(req.body.password)
    const user =  new User({
        username:req.body.username,
        email : req.body.email,
        password: hashPassword

    });
    const savedUser = await user.save();
    res.send(savedUser);

});

authRoutes.post("/signin",async (req,res)=>{
    const existingUser = await User.findOne({email:req.body.email});
    const existingUsers = await User.findOne({roles:req.body.roles});

    if(!existingUser)
    {
        res.send("No user Found or Email  Is Invalid");

    }
    else
    {
        const checkUser = await hashValidator(req.body.password,existingUser.password)
        if(!checkUser)
        {
            res.send("Password is Invalid");


        }
        else
        {
            //res.send("login success");     
            const token = await tokenGenerator(existingUser.email,existingUsers.roles);
            res.cookie("jwt",token);
            res.send(token);     

        }
    }

})
authRoutes.get("/protected",authverify ,async(req,res)=>{
    res.send("i am  protected route")
})

module.exports = authRoutes;

