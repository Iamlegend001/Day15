const express = require('express');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');


const router = express.Router();


router.post('/register',async(req,res)=>{
  const { username, password } = req.body;

  const token = jwt.sign({_id: user._id})

  

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  const user = await userModel.create({ username, password });
  res.status(201).json({ message: 'User registered successfully', user });
})


module.exports = router;