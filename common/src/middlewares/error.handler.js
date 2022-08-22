const { CustomError } = require("../errors/custom.error");
/**
 * Trying to have one single identical structure for all posssible
 * across all over different services
 * COMMON RESPONSE STRUCTURE
 * {
 *    erorrs[]:{
 *      message:string,field?:string
 *    }
 * }
 */
const errorHandler = (err, req, res, next) => {
  
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({
      message: err.serializeErrors(),
      type: err.field,
    });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};

module.exports = { errorHandler };
