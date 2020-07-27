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
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    phoneNumber:{
        type:sequelize.STRING,
        unique:true,
        validate:{
            isNumeric:true
        }
    },
    address:{
        type:sequelize.STRING,
        allowNull:false,
    },
    flatNumber:{
        type:sequelize.STRING,
        allowNull:false,
    },
    pinCode:{
        type:sequelize.STRING,
        allowNull:false,
        validate:{
            isNumeric:true
        }
    },
    members:{
        type:sequelize.STRING,
        allowNull:false,
    },
    role:{
        type:sequelize.STRING,
    },
    subscribed1:{
        type:sequelize.INTEGER,
    },
    subscribed2:{
        type:sequelize.INTEGER,
    }

})



db.sync().then(()=>{
    console.log('Database sucessfully  created');
})

module.exports={
    db,users
}