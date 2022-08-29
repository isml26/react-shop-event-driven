const express = require("express");
const User = require("../../models/user.model");
const { setJwt } = require("../../services/jtw");

const { UserValidate } = require("../../validators/auth");
const {
  BadRequestError,
} = require("../../../../common//src/errors/bad.request.error");

const {
  validateRequest,
} = require("../../../../common/src/middlewares/validate.request");

const router = express.Router();

router.post(
  "/api/users/signup",
  UserValidate.singup,
  validateRequest,
  async (req, res) => {
    // const user = await User.findOne({email:"asdlkşas@hotmaisl.com"}).exec()

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const newUser = new User({
      email,
      password,
    });
    try {
      const user = await newUser.save();
      setJwt(user,req)

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = {
  signup: router,
};
