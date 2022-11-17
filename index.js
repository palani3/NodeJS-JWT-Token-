const express =require('express');
const app =express();
const authRoutes = require('./routes/authRoutes')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
dotenv.config();


mongoose.connect(process.env.DB_URL,
()=>{
    console.log("Database connected");
})

//Body parser
app.use(cookieParser());
app.use(express.json());

//Routes

app.use("/api/user",authRoutes);


app.get('/',(req,res)=>{
    res.send("Hello palani");
})
app.listen(5000,()=>{
    console.log("server is running");
})  