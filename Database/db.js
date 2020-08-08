const sequelize=require('sequelize');

// const db = new sequelize('st1', 'root', '1234', {
//     host: 'localhost',
//     dialect:'mysql'
//   });

const db = new sequelize('st1', 'root', '1234', {
    host: '34.87.38.101',
    dialect:'mysql'
  });


// const db= new sequelize({
//     dialect : 'sqlite',
//     storage: 'users_test.db'
// })  

//user table 
const users=db.define('users',{
    userId:{
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
        // validate:{
        //     isNumeric:true
        // }
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

//vendor table

const vendors=db.define('vendors',{
    vendorId:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    phoneNumber:{
        type:sequelize.STRING,
        unique:true,
        // validate:{
        //     isNumeric:true
        // }
    },
    localityOfStall:{
        type:sequelize.STRING,
        allowNull:false,
    },
    aadharCardNumber:{
        type:sequelize.STRING,
        allowNull:false,
    },
    gender:{
        type:sequelize.STRING,
        allowNull:false,
    },
    image:{
        type:sequelize.STRING,
        
    },
    aadharFrontImage:{
        type:sequelize.STRING,
    },
    aadharBackImage:{
        type:sequelize.STRING,
    },
    status:{
        type:sequelize.STRING,
    }

})

//products table

const products=db.define('products',{
    productId:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    name:{
        type:sequelize.STRING,
        allowNull:false,
    },
    unit:{
        type:sequelize.STRING,
        
    },
    
    image:{
        type:sequelize.STRING,
        
    },
    description:{
        type:sequelize.STRING,
    },

})


//user's cart table
const userCart=db.define('userCart',{
    userCartId:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    quantity:{
        type:sequelize.STRING,
        allowNull:false,
    },
})

products.hasMany(userCart)
userCart.belongsTo(products)
users.hasMany(userCart)
userCart.belongsTo(users)
vendors.hasMany(userCart)
userCart.belongsTo(vendors)

//vendor cart table
const vendorCart=db.define('vendorCart',{
    vendorCartId:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    quantity:{
        type:sequelize.STRING,
        allowNull:false,
    },
    price:{
        type:sequelize.INTEGER
    }

})

vendors.hasMany(vendorCart)
vendorCart.belongsTo(vendors)
products.hasMany(vendorCart)
vendorCart.belongsTo(products)


//order table

const orders=db.define('orders',{
    orderId:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    customOrderId:{
        type:sequelize.STRING,
        
    },
    price:{
        type:sequelize.STRING
    },
    quantity:{
        type:sequelize.STRING
    },
    status:{
        type:sequelize.STRING
    },
    modeOfPayment:{
        type:sequelize.STRING
    }

})

products.hasMany(orders)
orders.belongsTo(products)
users.hasMany(orders)
orders.belongsTo(users)
vendors.hasMany(orders)
orders.belongsTo(vendors)

const markers=db.define('markers',{
    id:{
        type:sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    lat:{
        type:sequelize.DOUBLE
    },
    lng:{
        type:sequelize.DOUBLE
    }

})

vendors.hasOne(markers)
markers.belongsTo(vendors)

db.sync().then(()=>{
    console.log('Database sucessfully  created');
})

module.exports={
    db,users,products,vendors,userCart,vendorCart,orders,markers
}