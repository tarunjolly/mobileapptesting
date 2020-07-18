const express = require('express');
const app = express();
const {db,users } = require('./db');
const session=require('express-session')
const bodyParser=require('body-parser')
const passport=require('./setuppassport');
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

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

// app.use(express.static('/public'))
app.use('/',express.static(__dirname))



//signup
app.post('/signup',(req,res)=>{
console.log(req.body);

    users.create(
        {
            email:req.body.email,
            password:req.body.password,
            phone:req.body.phonenumber,
           
        })
        .then((user)=>{
        //    Boolean resp=true
        res.status(200).send(true);
    })
        .catch((err)=>{
            // console.log(err)
            // res.redirect('/signup')
            res.send(false)
        })
})


// //signup page
// app.get('/signup',(req,res)=>{
//     res.render('signup')
// })

app.post('/login',passport.authenticate('local',{failureRedirect:'/failure'}),function(req,res){
    if(req.user){
    res.send(true)}
    else{
        res.send(false)
    }
})
app.get('/failure',(req,res)=>{
    res.send(false);
})


app.get('/',(req,res)=>{
    console.log(' koi toh aaya ')
    res.send('Helloooooooooooo')
})

app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})

// app.listen(4000, () => {
//     console.log("http://localhost:4000");
// })