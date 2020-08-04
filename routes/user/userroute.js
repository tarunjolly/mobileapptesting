const express = require('express');
const route = express.Router();
const { db, users} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');
const loginroute=require('./login')
const usercartroute=require('./userCart')
const orderroute=require('./order')
const locationroute=require('./locationroute')
const subscribedroute=require('./subscribedroute')

route.use('/login',loginroute)

route.use('/usercart',usercartroute)

route.use('/order',orderroute)

route.use('/location',locationroute)
route.use('/subscribed',subscribedroute)


module.exports=route