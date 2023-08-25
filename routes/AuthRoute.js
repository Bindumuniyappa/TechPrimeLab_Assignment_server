const express=require("express");
const {User}=require("../models/UserModel");
const bcrypt = require('bcrypt');

const AuthRoute=express.Router();

AuthRoute.post("/signup",async(req,res)=>{

    const {email,password}=req.body; 
    console.log(email,password)   
   try{
        let exist=await User.findOne({email:email});
        if(exist){
            res.send({msg:"user already registered please signin"});
        }
        else{
            bcrypt.hash(password, 10, async function(err, hash)
            {
                if(err){
                    res.send(err);
                }
                else{
                    const user=new User({email,password:hash});
                    await user.save();
                    res.send({msg:"user registered successfully"});
                }
            });
        }
    }
    catch(err){
        console.log(err);
    }
})



AuthRoute.post("/login",async(req,res)=>{

    const {email,password}=req.body;

    try{
        const user=await User.find({email:email});
        if(user.length>0){

            bcrypt.compare(password, user[0].password, function(err, result) {
                if(result){
                    
                    res.send({
                        status:"Success",
                        Message: "Valid Response"
                        })
                }
                else{
                    res.send({
                        status:"Failed",
                        Message: "Invalid Response"
                        });
                }
            });

        }
        else{
            res.send({
                status:"Failed",
                Message: "Invalid Response"
                });
        }
       }catch(err){
        res.send({msg:"something went wrong try again"});
    }
})



module.exports={AuthRoute};