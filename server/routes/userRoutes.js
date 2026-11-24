const express = require('express');
const router = express.Router();
const { validateRegistration } = require('../middlewares/ValidateSchema');
const { registerFormSchema } = require('../validators/authSchema.validator');
const authController = require('../controllers/auth.controller');


router.post('/register', validateRegistration(registerFormSchema), authController.registerUser);

module.exports = router;
