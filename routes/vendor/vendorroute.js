const express = require('express');
const route = express.Router();
const { db, users} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');
const loginroute=require('./login')
const vendorcartroute=require('./vendorCart');
const locationroute=require('./locationroute')


route.use('/login',loginroute)
route.use('/vendorcart',vendorcartroute);
route.use('/location',locationroute)

module.exports=route;