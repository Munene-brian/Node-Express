const express = require('express');
const user = require('../model/user');
const route = express.Router();
const prvtRout = require('../routes/verifyToken')
const User = require('../model/user')
route.get('/',prvtRout, (req,res)=>{
    // res.json({
    //     title:{name:'Hello you need Token'}
    // })
    res.send(req.user);
    //User.findOne({_id:req.user})
})
module.exports  = route