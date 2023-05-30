
require('dotenv').config()
const express = require('express');
const session = require('express-session');
const passport = require('passport');


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
} 
const app = express();
//app.use(session({ secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());

const auth  = require('./auth');
// app.get('/', (req,res) => {
//     res.send('') 
// })

app.get('/api/auth/google',
passport.authenticate('google', {scope: ['email', 'profile'] })
)

app.get('google/callback',
passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/failure',
})
);

app.get('/auth/failure', (req,res) => {
  res.send('Authentication went wrong..'); //new page or just msg
})

app.get('/protected', isLoggedIn, (req, res) => {
  res.status(200).json({name:req.user.name, email:req.user.email});
  // res.render("/landingpage",{name:req.user.name, email:req.user.email});//homepage or landing page link
})

app.get('/logout', (req, res) => {
  req.session = null; 
  req.logout();
  req.session.destroy();
})

const GoogleStrategy = require('passport-google-oauth20').Strategy;

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