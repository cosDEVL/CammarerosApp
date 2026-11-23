const AppError = require("../utils/AppError");

module.exports = (err, req, res, next) => {
  let statusCode = 500;
  let status = "Error";
  let message = "Internal Server Error";

  console.error(err)

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    status = err.status;
    message = err.message;
  }

  res.status(statusCode).json({
    status, message
  })
}
