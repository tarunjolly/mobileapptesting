const fs=require('fs');
const ab=require('./data.json');
const { products } = require('../Database/db');
const sequelize=require('sequelize');

console.log(ab);


ab.forEach(item=>{
    products.create(
    {   
        name:item.Name,
        unit:item.unit,
        image:item.image,
        description:item.description,
         })
    .then((user)=>{
    //    Boolean resp=true
    console.log(user);
})

})
