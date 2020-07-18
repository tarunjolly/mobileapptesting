const sequelize=require('sequelize');

// const db = new sequelize('testing', 'root', '1234', {
//     host: 'localhost',
//     dialect:'mysql'
//   });
const db= new sequelize({
    dialect : 'sqlite',
    storage: 'users_test.db'
})

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
    console.log('Database sucessfully  created');
})

module.exports={
    db,users
}