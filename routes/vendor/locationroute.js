const express = require('express');
const route = express.Router();
const { db, vendorCart, vendors, markers } = require('../../Database/db');
const { passport } = require('../../PassportSetup/setuppassport');
const sequelize = require('sequelize');

route.post('/',(req,res)=>{
    markers.upsert({
        vendorVendorId:req.body.vendorId,
        lat:req.body.lat,
        lng:req.body.lng
    }).then((vendor)=>{
        res.sendStatus(200);
    }).catch(err=>{
        res.status(500).send(err.message)
    })
})

module.exports=route