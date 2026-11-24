const { ZodError, z } = require("zod");
const AppError = require("../utils/AppError");
const { PostgresError } = require('postgres').default

module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let status = "Error";
  let message = "Internal Server Error";
  let errors = null;

  // console.error(err)

  if (err.isOperational) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
    errors = err.errors;
  } else {
    console.log(err);
  }

  res.status(statusCode).json({
    status, message, ...(errors && { errors: errors })
  })

}
