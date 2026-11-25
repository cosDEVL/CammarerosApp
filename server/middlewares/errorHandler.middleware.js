const { ZodError, z } = require("zod");
const AppError = require("../utils/appError");
const { PostgresError } = require('postgres').default

module.exports = (err, req, res, next) => {

  if (err instanceof PostgresError) {
    if (err.code === '23505') {
      err = new AppError(409, "Email or phone already registered");
    } else if (err.code === '23503') {
      err = new AppError(400, "Referenced resource does not exist");
    } else if (err.code === '22P02') {
      console.log(err);

      err = new AppError(400, "Invalid parameter format");

    }
  }

  let statusCode = 500;
  let status = "Error";
  let message = "Internal Server Error";
  let errors = null;

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
