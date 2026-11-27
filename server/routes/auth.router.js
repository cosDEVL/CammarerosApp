const express = require('express');
const router = express.Router();

const { validateSchema } = require('../middlewares/validateSchema.middleware');
const { registerFormSchema, loginFormSchema } = require('../validators/authSchema.validator');
const { emailSchema, resetPasswordSchema } = require('../validators/resetPasswordSchema.validator');

const verifyRefresh = require('../middlewares/verifyRefresh.middleware');
const verifyAccess = require('../middlewares/verifyAccess.middleware');

const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, refreshToken } = require("../controllers/auth.controller");

router.post('/register', validateSchema(registerFormSchema), registerUser);
router.post('/login', validateSchema(loginFormSchema), loginUser);
router.post('/logout', verifyAccess, logoutUser);

router.post('/forgot-password', validateSchema(emailSchema), forgotPassword);
router.patch('/reset-password/:resetToken', validateSchema(resetPasswordSchema), resetPassword);

router.post('/refresh', verifyRefresh, refreshToken);

module.exports = router;
