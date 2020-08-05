const express = require('express');
const route = express.Router();
const { db,orders ,userCart,users,vendors, products } = require('../../Database/db');
const sequelize = require('sequelize');




route.post('/placeorder', (req, res) => {

userCart.findAll({where:{userUserId:req.body.userId}}).then(cartitems=>{
        
    customOrderid=new Date().valueOf();
    cartitems.forEach(element => {
        
        orders.create(
            {
               // price:element.price,
               // quantity: element.quantity,
                userUserId:element.userUserId,
                vendorVendorId: element.vendorVendorId,
                productProductId: element.productProductId,
                status:'pending',
                modeOfPayment:req.body.modeOfPayment,
                customOrderId:customOrderid
            })
            .then(() => {
            }).catch((err) => {
                res.status(500).send(err.message);
            })
    });

    userCart.destroy({where:{userUserId:req.body.userId}}).then(()=>{
        res.sendStatus(200)
    }).catch(err=>{
        res.status(500).send(err.message)
    })    

})
});


route.get('/getallorders',(req,res)=>{
    orders.findAll({where:{userUserId:req.body.userId},order: [
        ['customOrderId', 'DESC'],
    ],
include:[products,vendors]}).then(items=>{
        items=items.map(item=>(item.toJSON()));
        res.status(200).send(items)
    }).catch(err=>{
        res.status(500).send(err.message)
    });
})



route.get('/deleteorder',(req,res)=>{
    orders.destroy({where:{userUserId:req.body.userId,customOrderId:req.body.customOrderId}}).then(()=>{
    
        res.sendStatus(200);
    }).catch(err=>{
        res.status(500).send(err.message)
    })
})



module.exports = route;


