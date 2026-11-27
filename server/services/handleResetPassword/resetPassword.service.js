const bcrypt = require('bcryptjs');
const AppError = require('../../utils/appError');
const {verifyResetToken} = require("../../utils/token");
const { resetUserPassword } = require('../../repositories/auth.repository');
module.exports = async ({ resetToken }, newPassword) => {

    const { id } = verifyResetToken(resetToken);

    if (!id) throw new AppError(400, "Cannot perform this request");

    const newHashPassword = await bcrypt.hash(newPassword, 10);
    console.log(newHashPassword);

    await resetUserPassword(id, newHashPassword);

}