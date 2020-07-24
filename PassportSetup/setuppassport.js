const passport=require('passport')
const LocalStrategy=require('passport-local')

const {users}=require('../Database/db')

  passport.use(
    new LocalStrategy({
        usernameField: 'email',
        // passwordField: 'passwd'
      },(username,password,done)=>{
      users.findOne({
        where:{email:username}
      }).then((user)=>{
         if(!user){
          //  return done(new Error(`invalid`))
          return done(null,false)
         }
         if(user.password!=password){
           return done(null,false)
         }
         return done(null,user)
      }).catch(done)
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((userId, done) => {
    users.findOne({
      where: {
        id: userId,
      }
    })
      .then((user) => done(null, user))
      .catch(done)
  })
  module.exports=passport