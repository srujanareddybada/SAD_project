var express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../model/userModel'); 

var router = express.Router();

//Create a user at SIGN UP
const createUser = async (req, res) => {
    const { id, username, password, email, fullname, dob, balance } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user) {
        user = await User.create({
            id, 
            username,
            password, 
            email, 
            fullname, 
            dob, 
            balance,
        })
      }
      console.log("logged in")
      const token = constructJwtToken(user)
      res.status(200).json({ token: token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message });
    }
  }

  //Function to construct JWT TOKEN
function constructJwtToken(user) {
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    )
    return token
  }

  module.exports = {   
    createUser,
  };