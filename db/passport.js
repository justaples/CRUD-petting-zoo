const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    // passReqToCallback: true
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done){
  done(null, user)
})
passport.deserializeUser(function(user, done){
  done(null, user)
})

