const { updateSelf, getHashPasswordToCompare, updatePassword } = require("../../repositories/self.repository");
const bcrypt = require('bcryptjs');
const AppError = require('../../utils/appError');


const updateSelfData = async (userId, { name, lastname, phone, email }) => {

    const updatedUser = await updateSelf(userId, { name, lastname, phone, email });

    if ( !updatedUser ) throw new AppError(404, "Cannot perform this request");

    return updatedUser;
}

const updateSelfPassword = async (userId, { oldPassword, newPassword }) => {

    const selfPasswordToCompare = await getHashPasswordToCompare(userId);

    if (!selfPasswordToCompare) throw new AppError(404, "Cannot perform this request");
    if (!selfPasswordToCompare.is_active) throw new AppError(403, "Access denied");

    if (!(await bcrypt.compare(oldPassword, selfPasswordToCompare.password_hash)))
        throw new AppError(403, "Current password inserted is not correct")

    const newHashPassword = await bcrypt.hash(newPassword, 10);

    await updatePassword(userId, newHashPassword);

}



module.exports = { updateSelfData, updateSelfPassword }