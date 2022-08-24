const express = require("express");
const User = require("../../models/user.model");
const { UserValidate } = require("../../validators/auth");
const { validationResult } = require("express-validator");

const {
  RequestValidationError,
} = require("../../../../common//src/errors/request.validation.error");

const {
  BadRequestError,
} = require("../../../../common//src/errors/bad.request.error");

const router = express.Router();

router.post("/api/users/signup", UserValidate.singup, async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors);
  }
  // const user = await User.findOne({email:"asdlkşas@hotmaisl.com"}).exec()

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError("Email in use")
  }

  const newUser = new User({
    email,
    password,
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  signup: router,
};
