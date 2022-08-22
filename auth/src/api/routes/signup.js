const express = require("express");
const { UserValidate } = require("../../validators/auth");
const { validationResult } = require("express-validator");
const {
  RequestValidationError,
} = require("../../../../common//src/errors/request.validation.error");
const {
  DatabaseConnectionError,
} = require("../../../../common/src/errors/database.connection.error");
const router = express.Router();

router.post("/api/users/signup", UserValidate.singup, async (req, res) => {
  const errors = validationResult(req);
  // console.log(errors)
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors);
  }
  // const { email, password } = req.body;
  console.log("creating user");
  throw new DatabaseConnectionError(errors);
  res.send({});
});

module.exports = {
  signup: router,
};
