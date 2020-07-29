const express = require('express');
const route = express.Router();
const { db, vendorCart, vendors, products } = require('../../Database/db');
const { passport } = require('../../PassportSetup/setuppassport');
const sequelize = require('sequelize');




route.post('/addproduct', (req, res) => {

vendorCart.findOne({where:{productProductId:req.body.productId,vendorVendorId:req.body.vendorId}}).then(product=>{
    if(product==null){
        vendorCart.create(
            {
    
                quantity: req.body.quantity,
                price: req.body.price,
                vendorVendorId: req.body.vendorId,
                productProductId: req.body.productId,
            })
            .then((vendorsproduct) => {
                //    Boolean resp=true
                res.sendStatus(200);
                console.log(vendorsproduct);
            }).catch((err) => {
                res.status(500).send(err.message);
            })
    }
    else{
        vendorCart.upsert(
            {
                vendorCartId:product.vendorCartId,
                quantity: req.body.quantity,
                price: req.body.price,
                vendorVendorId: req.body.vendorId,
                productProductId: req.body.productId,
            })
            .then((vendorsproduct) => {
                //    Boolean resp=true
                res.sendStatus(200);
                console.log(vendorsproduct);
            }).catch((err) => {
                res.status(500).send(err.message);
            })
    }
})



});




route.get('/getallproducts',(req,res)=>{
    vendorCart.findAll({where:{vendorVendorId:req.body.vendorId},include:[products]}).then(items=>{
        items=items.map(item=>(item.toJSON()));
        res.status(200).send(items)
    }).catch(err=>{
        res.status(500).send(err.message)
    });
})


route.get('/deletecartproduct',(req,res)=>{
    vendorCart.destroy({where:{vendorVendorId:req.body.vendorId,productProductId:req.body.productId}}).then(()=>{
    
        res.sendStatus(200);
    })
})





module.exports = route;


