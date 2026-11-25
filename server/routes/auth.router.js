const express = require('express');
const router = express.Router();
const { validateSchema } = require('../middlewares/validateSchema.middleware');
const { registerFormSchema, loginFormSchema } = require('../validators/authSchema.validator');
const authController = require('../controllers/auth.controller');
const verifyRefresh = require('../middlewares/verifyRefresh.middleware');


router.post('/register', validateSchema(registerFormSchema), authController.registerUser);
router.post('/login', validateSchema(loginFormSchema), authController.loginUser);
router.post('/logout', verifyRefresh, authController.logoutUser);
router.post('/refresh', verifyRefresh, authController.refreshToken);

module.exports = router;
