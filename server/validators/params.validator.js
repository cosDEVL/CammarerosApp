const {z} = require("zod");
module.exports = {
    name: z.string().trim().min(1, 'Name is required').max(50),
    lastname: z.string().trim().min(1, 'Last Name is required').max(50),
    phone: z.string().trim().regex(/^\d{10}$/, 'The phone number must have 10 digits'),
    email: z.email({ pattern: z.regexes.email }).trim().min(1, 'Email required').toLowerCase(),
    password: z.string().trim().min(8, 'Password must be between 8 and 20 characters long').max(20, 'Password must be between 8 and 20 characters long'),
    invite_code: z.string().trim().min(1, 'Invite code required')
}