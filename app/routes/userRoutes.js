const express = require("express");
const userRouter = express.Router();

const {
  addUser
} = require("../controllers/userControllers");

userRouter.route("/").post(addUser);

module.exports = userRouter
