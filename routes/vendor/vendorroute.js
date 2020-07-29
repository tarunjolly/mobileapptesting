const express = require('express');
const route = express.Router();
const { db, users} = require('../../Database/db');
const {passport}=require('../../PassportSetup/setuppassport');
const sequelize=require('sequelize');
const loginroute=require('./login')




route.use('/login',loginroute)

module.exports=route;