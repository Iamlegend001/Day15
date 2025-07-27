const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const user = await userModel.create({ username, password });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.status(201).json({ message: "User registered successfully", user });
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({
    username,
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordValid = user.password === password;
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);


  res.status(200).json({ message: "Login successful", user });
})

module.exports = router;
