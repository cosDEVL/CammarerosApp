const express = require('express');
const router = express.Router();

const { validateSchema } = require('../middlewares/validateSchema.middleware');
const updateUserSchema = require('../validators/updateUserSchema.validator');
const updatePasswordSchema = require('../validators/updatePasswordSchema.validator');
const { updateSelf, disableSelf, updatePassword, } = require("../controllers/self.controller");
const verifyAccess = require('../middlewares/verifyAccess.middleware');


router.patch('/update-self', verifyAccess, validateSchema(updateUserSchema), updateSelf);
router.patch('/disable-self', verifyAccess, disableSelf); //soft-delete
router.patch('/update-self-password', verifyAccess, validateSchema(updatePasswordSchema), updatePassword);

module.exports = router;