const { z } = require('zod');
const { password } = require('./params.validator');

module.exports = z.strictObject({
    oldPassword: z.string().trim().min(1, 'Current password is required'),
    newPassword: password
}).refine((data) => data.oldPassword !== data.newPassword, {
    message: "New password must be different from the current password",
    path: ['newPassword']
})

