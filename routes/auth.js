const express = require('express')
const route = express.Router();
const User = require('../model/user');
const {registerUserValidation,loginUserValidation} = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/user');


//Validion 


route.get("/", async(res,req)=>{
    try{
        const dataSaved = await User.find();
        res.json(dataSaved)
    }
    catch(err){
        res.json({message:err})
    }
})

route.post('/register',async(req,res)=>{
    const {error} = registerUserValidation(req.body);
    //const  {error}=  schemaJoi.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //res.send(error.details[0].message)

//Check if User Exists
    const emailExist = await User.findOne({email:req.body.email});
    if (emailExist ) return res.status(400).send('Email already Exists');


//Hashing Passwords
const salt = await bcrypt.genSalt(10);
const hashedPasswd = await bcrypt.hash(req.body.password, salt);

    const postUser = new User({
        name:req.body.name,
        email:req.body.email,
        //password:req.body.password
        password:hashedPasswd
    });
    try{
        const dataSaved = await postUser.save();
        res.send({user:postUser._id})
    }catch (err){
        res.status(400).send(err)
    }
});

//login
route.post('/login',async(req,res)=>{
    const {error} = loginUserValidation(req.body);
    //const  {error}=  schemaJoi.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //res.send(error.details[0].message)

    //Check if doesnot exist
    const userCredia = await User.findOne({email:req.body.email});
    if (!userCredia ) return res.status(400).send('Invalid Email');

    //Password is Correct
    const validPass = await bcrypt.compare(req.body.password,userCredia.password);
    if(!validPass) return res.status(400).send('Invalid Password !');

    //create Web Token
    const token = jwt.sign({_id:userCredia._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);

    //res.send('Successful Login')
})

module.exports = route