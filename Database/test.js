const sequelize=require('sequelize');
const {db,users,products,vendors,userCart,vendorCart,orders}=require('./db') ;


// users.create(
//     {   
//         name:"abcsda",
//         email:"absdac@gnail.com",
//         phoneNumber:"8683767587",
//         address:"asddr",
//         flatNumber:12113,
//         members:24,
//         pinCode:11009,
//         role:"user",
//     })
//     .then((user)=>{
//     //    Boolean resp=true
//     console.log(user);
// })


// vendors.create(
//     {   
//         name:"lolllu",
//         email:"adac@gnail.com",
//         phoneNumber:"63457587",
//         localityOfStall:"adsfsddVIJAY",
//         aadharCardNumber:122113,
//         gender:"female",
//         pinCode:110029,
//     })
//     .then((user)=>{
//     //    Boolean resp=true
//     console.log(user);
// })


// products.create(
//     {   
//         name:"aolu",
//         unit:"kg",
//         image:"dsaw",
//         description:"adsfsddVIJAY",
//          })
//     .then((user)=>{
//     //    Boolean resp=true
//     console.log(user);
// })


// vendorCart.create(
//     {   
        
//         quantity:"10",
//         price:"100",
//         vendorVendorId:1,
//         productProductId:2,
//          })
//     .then((user)=>{
//     //    Boolean resp=true
//     console.log(user);
// })


// vendorCart.findAll({where:{vendorVendorId:1},include:[products,vendors]}).then(item=>{
//     // item.forEach(element => {
//     //     console.log(element.toJSON());
//     // });
//     //console.log(item.length);
// });

// vendorCart.findOne({where:{vendorCartId:1}}).then(item=>{
//     const vendorid=item.vendorVendorId
//     const productid=item.productProductId
//     userCart.create({
//         quantity:200,
//         vendorVendorId:vendorid,
//         productProductId:productid,
//         userUserId:1
//     }).then(a=>{
//         console.log(a)
//     })
// })




// userCart.create={
// }




