const express = require('express');
const route = express.Router();
const { db, vendors} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');



route.post('/checkVendor',(req,res)=>{
    console.log(req.body);
    vendors.findOne({where:{phoneNumber:req.body.phoneNumber}}).then(vendor=>{
        if(vendor!=null){
            res.sendStatus(200);
        }else{
            res.sendStatus(404).send(err.message);
        }
    })
})


route.post('/verify',(req,res)=>{
    console.log(req.body);
    vendors.findOne({where:{phoneNumber:req.body.phoneNumber}}).then(vendor=>{
        console.log(vendor);
        if(vendor!=null){
            res.status(200).send(vendor);
        }else{
            res.sendStatus(404);
        }
    })
})


//Register
route.post('/register',(req,res)=>{
console.log(req.body);

    vendors.create(
        {   
            name:req.body.name,
            phoneNumber:req.body.phoneNumber,
            localityOfStall:req.body.localityOfStall,
            aadharCardNumber:req.body.aadharCardNumber,
            gender:req.body.gender,
            image:req.body.image,
            aadharFrontImage:req.body.aadharFrontImage,
            aadharBackImage:req.body.aadharBackImage,
            status:"default",
        })
        .then((vendor)=>{
        //    Boolean resp=true
        res.status(200).send(vendor);
    })
        .catch((err)=>{
            // console.log(err)
            // res.redirect('/signup')
            console.log(err.message);
            res.status(500).send(err.message);
        })
})







// route.post('/', function(req, res, next) {
//     passport.authenticate('local', function(err, user, info) {
//       if (err) { return res.status(501).send(false) }
//       if (!user) { return res.status(501).send(false) }
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.status(200).send(true)
//       });
//     })(req, res, next);
//   });




module.exports=route