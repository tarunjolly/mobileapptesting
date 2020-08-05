const express = require('express');
const route = express.Router();
const { db, vendorCart, vendors, markers } = require('../../Database/db');
const { passport } = require('../../PassportSetup/setuppassport');
const sequelize = require('sequelize');





route.post('/getvendors',(req,res)=>{
  
    db.query("SELECT markers.vendorVendorId,vendors.name,vendors.localityOfStall,vendors.status,vendors.image, ( 6371 * acos( cos( radians(:lat) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(:lng) ) + sin( radians(:lat) ) * sin( radians( lat ) ) ) ) AS distance FROM markers INNER JOIN  vendors ON markers.vendorVendorId=vendors.vendorId HAVING distance < 2 ORDER BY distance LIMIT 0 , 20;",{
        replacements: {lat: req.body.lat,lng:req.body.lng},
        type:sequelize.QueryTypes.SELECT
      })
    .then((listOfVendorData)=>{
            res.status(200).send({listOfVendorData})

    }).catch(err=>{
        res.status(500).send(err.message)
    })


    
    
})

module.exports=route