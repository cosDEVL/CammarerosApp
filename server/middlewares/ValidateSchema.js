// const registerFormSchema = require("../validators/authSchema.validator");
const AppError = require("../utils/AppError");
const { z } = require("zod");


const validateRegistration = (schema) => async (req, res, next) => {

  try {
    await schema.parseAsync(req.body);

      req.formData = req.body;
      next()
  } catch (err) {

    const errors = err.issues.map(i => {
      return {
        field: i.path[0],
        code: i.code,
        message: i.message
      }

    })

    next(new AppError(400, "Form validation failed", errors))
 }

}


module.exports = { validateRegistration };
