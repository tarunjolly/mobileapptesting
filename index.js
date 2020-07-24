const express = require('express');
const app = express();
const {db,users } = require('./Database/db');
const session=require('express-session')
const bodyParser=require('body-parser')
const passport=require('./PassportSetup/setuppassport');
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
            res.status(500).send(false)
        })
})


// //signup page
// app.get('/signup',(req,res)=>{
//     res.render('signup')
// })

// app.post('/login',passport.authenticate('local',{failureRedirect:'/failure'}),function(req,res){
//     if(req.user){
//     res.status(200).send(true)}
//     else{
//         res.send(false)
//     }
// })

// app.get('/failure',(req,res)=>{
//     res.status(401).send(false);
// })

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return res.status(501).send(false) }
      if (!user) { return res.status(501).send(false) }
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.status(200).send(true)
      });
    })(req, res, next);
  });




app.get('/',(req,res)=>{
    console.log(' koi toh aaya ')
    res.send('Helloooooooooooo')
})

// app.listen(port,()=>{
//     console.log(`Server running at http://${hostname}:${port}/`);
// })

app.listen(4000, () => {
    console.log("http://localhost:4000");
})