const AppError = require("../utils/appError");

const validateSchema = (schema) => async (req, res, next) => {

  const result = await schema.safeParseAsync(req.body);

  if (!result?.success) {
    const errors = result.error.issues.map(i => {
      return {
        field: i.path[0],
        code: i.code,
        message: i.message
      }
    })

    return next(new AppError(400, "Form validation failed", errors))
  }
  req.formData = result.data;
  next();

 }

module.exports = { validateSchema };
