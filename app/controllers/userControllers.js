const expressAsyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const UserModel = require("../models/userModel");

// @description Create new user
// @route POST /api/users
// @access public
const addUser = expressAsyncHandler(async (req, res) => {
  try {
    const { username, fullname, email, password, isAdmin } = req.body;

    const user = await UserModel.findOne({ username: username, isActive: true });

    if (user) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = await UserModel.create({
      username: username,
      fullname: fullname,
      password: password,
      isAdmin: isAdmin,
      email: email,
    });

    if (newUser) {
      res.status(201).json({
        message: "User is successfully registered",
      });
    } else {
      res.status(400).json({
        message: "Unable to create user.",
      });
      throw new Error('Unable to create user')
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      message: "Error in creating user: ",
      error: err.message,
    });
  }
});

module.exports = {
  addUser
};
