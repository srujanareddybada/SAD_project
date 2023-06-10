require('dotenv').config()
const authController  = require("../controllers/authController");
const express = require('express');
var router = express.Router();
const session = require('express-session');
const passport = require('passport');
const app = express();

//app.use(session({ secret: 'cats'}));
router.use(passport.initialize());
router.use(passport.session());


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  } 
  
app.get('/', authController.authenticateGoogle);
app.get('/google/callback', authController.handleGoogleCallback);

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

module.exports = app;