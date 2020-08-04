const express = require('express');
const app = express();
const {db,users } = require('./Database/db');
const session=require('express-session')
const bodyParser=require('body-parser')
const passport=require('./PassportSetup/setuppassport');
const vendorroute=require('./routes/vendor/vendorroute');
const userroute=require('./routes/user/userroute');
const path = require('path');
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded(({ extended: true })))

app.use(session({
    secret:'abcd efgh ijkl',
    resave:false,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60*60,
    }
}))
app.use(passport.initialize())
app.use(passport.session())

const hostname = process.env.HOST;
const port = process.env.PORT;

app.use('/',express.static(__dirname))

app.use('/user',userroute)
app.use('/vendor',vendorroute)


app.get('/',(req,res)=>{
    console.log(' koi toh aaya ')
    res.send('Helloooooooooooo')
    // res.sendFile(__dirname+'/public/test.html')
})

// app.listen(port,()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// })

 app.listen(80 || {port}, () => {
     console.log("http://localhost:80");
 })
