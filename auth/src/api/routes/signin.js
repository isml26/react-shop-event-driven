const express = require("express");

const User = require("../../models/user.model");
const { UserValidate } = require("../../validators/auth");
const Password = require("../../services/password");
const { setJwt } = require("../../services/jtw");

const {
  BadRequestError,
} = require("../../../../common//src/errors/bad.request.error");

const {
  validateRequest,
} = require("../../../../common/src/middlewares/validate.request");

const router = express.Router();

router.post(
  "/api/users/signin",
  UserValidate.signin,
  validateRequest,
  async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid email");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid password");
    }
    setJwt(existingUser, req);

    res.status(200).json(existingUser);
  }
);

module.exports = {
  signin: router,
};
