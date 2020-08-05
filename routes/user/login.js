const express = require('express');
const route = express.Router();
const { db, users} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');



route.post('/checkUser',(req,res)=>{
    users.findOne({where:{phoneNumber:req.body.phoneNumber}}).then(user=>{
        if(user!=null){
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
})


route.post('/verify',(req,res)=>{
    users.findOne({where:{phoneNumber:req.body.phoneNumber}}).then(user=>{
        if(user!=null){
            res.status(200).send(user);
        }else{
            res.sendStatus(404);
        }
    }).catch((err)=>{
        res.status(500).send(err.message)
    })
})


//Register
route.post('/register',(req,res)=>{

    users.create(
        {   
            name:req.body.name,
            email:req.body.email,
            phoneNumber:req.body.phoneNumber,
            address:req.body.address,
            flatNumber:req.body.flatNumber,
            members:req.body.members,
            pinCode:req.body.pinCode,
            role:"user",
        })
        .then((user)=>{
        res.status(200).send(user);
    })
        .catch((err)=>{
            res.status(500).send(err.message);
        })
})







route.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(501).send(false) }
      if (!user) { return res.status(501).send(false) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).send(true)
      });
    })(req, res, next);
  });




module.exports=route