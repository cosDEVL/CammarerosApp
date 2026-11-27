const { z } = require('zod');
const { email, password } = require('./params.validator');

const emailSchema = z.strictObject({
    email
})

const resetPasswordSchema = z.strictObject({
    password
})
module.exports = { emailSchema, resetPasswordSchema  }