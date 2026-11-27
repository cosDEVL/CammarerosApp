const { z } = require('zod');
const { name, lastname, phone, email, password, invite_code } = require('./params.validator');

const registerFormSchema = z.strictObject({
  name, lastname, phone, email, password, invite_code
})

const loginFormSchema = z.strictObject({
  email, password
})

module.exports = {registerFormSchema, loginFormSchema}
