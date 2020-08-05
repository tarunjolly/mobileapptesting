const express = require('express');
const route = express.Router();
const { db, users, vendors} = require('../../Database/db');
const { passport } = require('../../PassportSetup/setuppassport');
const sequelize = require('sequelize');

route.get('/',(req,res)=>{
   
users.findOne({where:{userId:req.query.userId}}).then((user)=>{
    
    vendors.findAll({where:sequelize.or({vendorId:user.subscribed1},{vendorId:user.subscribed2})}).then((listofSubscribed)=>{
     
       res.send({listofSubscribed})
    })
    
})
})

route.post('/',(req,res)=>{
    users.findOne({where:{userId:req.body.userId}}).then((user)=>{
        if(user.subscribed1==null){
            users.update({subscribed1:req.body.vendorId},{where:{userId:user.userId}}).then(()=>{
                res.sendStatus(200)
            }).catch((err) => {
                res.status(500).send(err.message);
            })
        }
        else if(user.subscribed2==null){
            users.update({subscribed2:req.body.vendorId},{where:{userId:user.userId}}).then(()=>{
                res.sendStatus(200)
            }).catch((err) => {
                res.status(500).send(err.message);
            })
        }
        else{
            res.status(426).send("Subscriptions already full")
        }

    })
})

module.exports=route