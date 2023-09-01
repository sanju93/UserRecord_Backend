let User = require('../models/users');
let passport = require('passport');
let passport_jwt = require('passport-jwt').Strategy;
let extract_jwt = require('passport-jwt').ExtractJwt;
passport.use(new passport_jwt({
    jwtFromRequest :  extract_jwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : "sanjay"
},async function(payload,done){
    let user = await User.findById(payload.user._id);
    if(user){
        return done(null,user);
    }else{
        return done(null,false);
    }
}));

module.exports = passport;