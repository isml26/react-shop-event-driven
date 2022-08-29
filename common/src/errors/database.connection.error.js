const { CustomError } = require("./custom.error");

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to database";
  constructor() {
    super("Error connecting to database");
    this.type = "Database Connection Error";
  }
  serializeErrors() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}

module.exports = { DatabaseConnectionError };
