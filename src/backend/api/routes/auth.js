const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();
const cors = require('cors');
const User = require("../models/userModel");
const router = express.Router();
// Configure session middleware
router.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Configure Passport middleware
router.use(passport.initialize());
router.use(passport.session());
router.use(cors());
// Passport serialization/deserialization
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Configure Google strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:'http://localhost:3000/api/auth/google/callback'

}, (accessToken, refreshToken, profile, done) => {
  console.log('User ID:', profile.id);
  console.log('Name:', profile.displayName);
  console.log('Email:', profile.emails[0].value);
    done(null, profile);
}));

// Define authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), async (req, res) => {
  try {
    const { displayName, email ,given_name } = req.user;
    
    console.log(displayName, email, given_name);
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      console.log('User already exists');
      // generate JWT token
      // ...TBD
      req.session.profile = req.user;
      res.redirect("http://localhost:8082/landingpage");
    } else {
      // Create a new user in the database
      const newUser = await User.create({
        username: given_name,
        password: "Oauth2**",
        email: email,
        fullname: displayName,
        dob: "1980-08-25",
        balance: 0,
        admin: 0,
      });

      await newUser.save();

      console.log('New user created');
      //generate JWT token
      // TBD
      req.session.profile = req.user;
      res.redirect("http://localhost:8082/landingpage");
    }
  } catch (error) {
    console.error(error);
    res.redirect("/error"); // Handle error redirect
  }
});


module.exports = router;
