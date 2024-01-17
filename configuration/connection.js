const mongoose = require('mongoose')

mongoose.connect("mongodb://0.0.0.0:27017/login").then((res)=>{
    console.log("connect");
}).catch((err)=>{
    console.log(err.message);
})