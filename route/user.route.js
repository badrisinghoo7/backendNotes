const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { username, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) {
        res.status(200).send({ error: err.message });
      } else {
        const user = new UserModel({
          username,
          email,
          pass: hash,
        });
        await user.save();
        res
          .status(200)
          .send({ msg: "A New user has been created", "new User": req.body });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    bcrypt.compare(pass, user.pass, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { username: user.username, userID: user._id },
          "masai"
        );
        res.status(200).send({
          msg: "Login Successful",
          token: token,
        });
      } else {
        res.status(200).send({ error: "Wrong Credentials!" });
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = {
  userRouter,
};
