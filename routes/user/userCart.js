const express = require('express');
const route = express.Router();
const { db, userCart,users,vendors, products } = require('../../Database/db');
const { passport } = require('../../PassportSetup/setuppassport');
const sequelize = require('sequelize');




route.post('/addproduct', (req, res) => {

userCart.findOne({where:{productProductId:req.body.productId,userUserId:req.body.userId}}).then(product=>{
        if(product==null){
        userCart.create(
            {
                
                quantity: req.body.quantity,
                userUserId:req.body.userId,
                vendorVendorId: req.body.vendorId,
                productProductId: req.body.productId,
            })
            .then((usercartproduct) => {
               
                res.sendStatus(200);
                
            }).catch((err) => {
                res.status(500).send(err.message);
            })}
else{
    userCart.upsert(
    {
        userCartId:product.userCartId,
        quantity: req.body.quantity,
        userUserId:req.body.userId,
        vendorVendorId: req.body.vendorId,
        productProductId: req.body.productId,
    })
    .then((usercartproduct) => {
       
        res.sendStatus(200);
       
    }).catch((err) => {
        res.status(500).send(err.message);
    })}
})
});


route.get('/getallproducts',(req,res)=>{
    userCart.findAll({where:{userUserId:req.query.userId},include:[products]}).then(viewCart=>{
        viewCart=viewCart.map(item=>(item.toJSON()));
        res.status(200).send({viewCart})
    }).catch(err=>{
        res.status(500).send(err.message)
    });
})



route.get('/deletecartproduct',(req,res)=>{
    userCart.destroy({where:{userUserId:req.body.userId,productProductId:req.body.productId}}).then(()=>{
    
        res.sendStatus(200);
    }).catch(err=>{
        res.status(500).send(err.message)
    })
})



route.get('/deletecart',(req,res)=>{
    userCart.destroy({where:{userUserId:req.body.userId}}).then(()=>{
        res.sendStatus(200)
    }).catch(err=>{
        res.status(500).send(err.message)
    })
})


module.exports = route;


