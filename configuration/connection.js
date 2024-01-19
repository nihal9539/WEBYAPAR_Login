const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://nihal691:nihal691@cluster0.lb9vsej.mongodb.net/").then((res)=>{
    console.log("connect");
}).catch((err)=>{
    console.log(err.message);
})