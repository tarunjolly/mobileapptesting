const express = require('express');
const route = express.Router();
const { db, vendors} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');
const multer=require('multer');
const path=require('path');

//public folder
route.use(express.static('../../public'));

//set the storage engine

// const storage = multer.diskStorage({
//     destination: './public/uploads/',
//     filename: function(req, file, cb){
//       cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
//   });

// var upload = multer({ storage: storage });

// var vendorUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'aadharFrontImage', maxCount: 1 }, { name: 'aadharBackImage', maxCount: 1 }])

route.post('/checkVendor',(req,res)=>{
   
    vendors.findOne({where:{phoneNumber:req.body.phoneNumber}}).then(vendor=>{
        if(vendor!=null){
            res.sendStatus(200);
        }else{
            res.sendStatus(404).send(err.message);
        }
    }).catch(err=>{
        res.sendStatus(500).send(err.message);

    })
})


route.post('/verify',(req,res)=>{
    vendors.findOne({where:{phoneNumber:req.body.phoneNumber}}).then(vendor=>{
        if(vendor!=null){
            res.status(200).send(vendor);
        }else{
            res.sendStatus(404);
        }
    })
})


//Register
route.post('/register',(req,res)=>{

    
    
    vendors.create(
        {   
            name:req.body.name,
            phoneNumber:req.body.phoneNumber,
            localityOfStall:req.body.localityOfStall,
            aadharCardNumber:req.body.aadharCardNumber,
            gender:req.body.gender,
            // image:req.files['image'][0].filename,
            // aadharFrontImage:req.files['aadharFrontImage'][0].filename,
            // aadharBackImage:req.files['aadharBackImage'][0].filename,
            image:"null",
            aadharFrontImage:"null",
            aadharBackImage:"null",
            status:"default",
        })
        .then((vendor)=>{
        res.status(200).send(vendor);
    })
        .catch((err)=>{
        
       
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