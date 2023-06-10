const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
  //  User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(null, profile);
    // }); 
  }
));

passport.serializeUser(function(user,done) {
    done(null, user);
});

passport.deserializeUser(function(user,done) {
    done(null, user);
});

module.exports = {
    authenticateGoogle: passport.authenticate('google', { scope: ['email', 'profile'] }),  
    handleGoogleCallback: passport.authenticate('google', {  
      successRedirect: '/protected',  
      failureRedirect: '/auth/failure',  
    }),  
  };