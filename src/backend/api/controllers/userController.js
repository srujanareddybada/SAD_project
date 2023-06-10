var express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//Create a user at SIGN UP
const createUser = async (req, res) => {
    const { username, password, email, fullname, dob, balance, admin, blocked } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user) {
        user = await User.create({
            username,
            password, 
            email, 
            fullname, 
            dob, 
            balance,
            admin,
            blocked,
        })
      }
      else{
        return res.status(404).json({ error: 'User already exists' });
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
  );
  return token;
}


//create user if registered udsing Oauth2 login
const grantOauth2UserAccess = async (req, res) => {
  const token = req.headers.jwt
  try {
    if (await verifyToken(token)) {
      const decoded = jwt_decode(token)
      const fetchedUserRecord = await User.findOne({
        email: decoded.email,
      })
      if (fetchedUserRecord) {
        console.log("logged in")
        const generatedToken = generateJwtToken(fetchedUser)
        res.status(200).json({ token: generatedToken })
      } else {
        const user = await User.create({          
            username: decoded.family_name,
            password: "Oauth2**",
            email: decoded.email, 
            fullname: decoded.name, 
            dob: decoded.birthday, 
            balance: 0,
            admin: 0,
        })
        console.log("grantOauth2UserAccess")
        const generatedToken = generateJwtToken(user)
        res.status(200).json({ token: generatedToken , links: [
          {
            rel: "dashboard",
            //href: ,
            method: "GET"
          }
        ] })
      }
    } else {
      res.status(401).json({ "error": "Invalid OAuth2 Token" })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error });
  }
}

// verify OAuth2 Token
async function verifyToken(token) {
  try {
    const validateToken = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return true
  } catch (error) {
    return false;
  }
}


module.exports = {
  createUser,
  grantOauth2UserAccess,
};