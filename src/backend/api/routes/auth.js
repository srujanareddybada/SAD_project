const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();
const cors = require('cors');

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
    done(null, profile);
}));

// Define authentication routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Redirect or perform any other action after successful authentication
  res.redirect("http://localhost:8082/landingpage");//homepage or landing page link
});

// Protected route
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Welcome, ' + req.user.displayName);
  } else {
    res.send('Please log in');
  }
});
module.exports = router;
