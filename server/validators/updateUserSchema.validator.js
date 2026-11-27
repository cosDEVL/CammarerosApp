const { z } = require('zod');
const { name, lastname, phone, email } = require('./params.validator');


module.exports = z.strictObject({
    name, lastname, phone, email
})