const { validationResult } = require("express-validator");
const {
  RequestValidationError,
} = require("../errors/request.validation.error");

function validateRequest(req, res, next) {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors);
  }
  next();
}

module.exports = { validateRequest };
