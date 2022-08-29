const { CustomError } = require("./custom.error");

class RequestValidationError extends CustomError {
  statusCode = 400;
  errors;
  constructor(errors) {
    super();
    this.type = "Request Validation Error";
    this.errors = errors;
  }
  serializeErrors() {
    const result = this.errors.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });

    return result;
  }
}

module.exports = {
  RequestValidationError,
};
