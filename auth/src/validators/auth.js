const { body } = require("express-validator");

class UserValidate {
  static singup = [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ];
  static signin = [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You musta supply a password")
  ];
}

module.exports = {
  UserValidate,
};
