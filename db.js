const sequelize=require('sequelize');

const db = new sequelize('testing', 'root', '1234', {
    host: 'localhost',
    dialect:'mysql'
  });


const users=db.define('users',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    email:{
        type:sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:sequelize.STRING,
    },
    phone:{
        type:sequelize.STRING,
        
    },

})



db.sync().then(()=>{
    console.log('shop.db created');
})

module.exports={
    db,users
}