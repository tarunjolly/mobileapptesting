const express = require('express');
const route = express.Router();
const { db, users} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');
const loginroute=require('./login')
const usercartroute=require('./userCart')
const orderroute=require('./order')


route.use('/login',loginroute)

route.use('/usercart',usercartroute)

route.use('/order',orderroute)


module.exports=route