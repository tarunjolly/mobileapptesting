const express = require('express');
const route = express.Router();
const { db, vendorCart, vendors, markers } = require('../../Database/db');
const { passport } = require('../../PassportSetup/setuppassport');
const sequelize = require('sequelize');





route.get('/getvendors',(req,res)=>{
  
    db.query("SELECT markers.vendorVendorId,vendors.name,vendors.localityOfStall,vendors.status,vendors.image, ( 6371 * acos( cos( radians(37) ) * cos( radians( :lat ) ) * cos( radians( :lng ) - radians(-122) ) + sin( radians(37) ) * sin( radians( :lat ) ) ) ) AS distance FROM markers INNER JOIN  vendors ON markers.vendorVendorId=vendors.vendorId HAVING distance < 2 ORDER BY distance LIMIT 0 , 20;",{
        replacements: {lat: req.body.lat,lng:req.body.lng},
        type:sequelize.QueryTypes.SELECT
      })
    .then((result,metadata)=>{
            // console.log(result)
            // console.log(metadata)
            result=result.map((ele)=>ele.toJSON())
            res.status(200).send(result)

    }).catch(err=>{
        res.status(500).send(err.message)
    })

    
})

module.exports=route