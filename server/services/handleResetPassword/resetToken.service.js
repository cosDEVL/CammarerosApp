const jwt = require('jsonwebtoken');
const { getUserIdByEmail } = require("../../repositories/auth.repository");
const AppError = require('../../utils/appError');
const {signResetToken} = require("../../utils/token");

module.exports = async (email) => {
    const user = await getUserIdByEmail(email);

    if (!user || !user.is_active) return null;

    return signResetToken(user);
}

