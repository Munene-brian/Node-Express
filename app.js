const express = require ('express');
const app = express();
const moongose = require('mongoose')
require('dotenv/config');
const cors = require('cors');
const bodyparser = require('body-parser');
const authRoute = require('./routes/auth');
const postRoute= require('./routes/posts')

//MIDDLEWARE

app.use(express.json())
app.use("/api/user",authRoute);
app.use('/api/posts',postRoute); 

//DB
moongose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true},()=>{console.log("Mongo Connected")});
app.get("/",(req,res)=>{
    res.send("Hello")
});


//port
const port = proces.env.PORT || 3000
app.listen(port);
