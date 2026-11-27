const { disableSelf } = require("../../repositories/self.repository");
const AppError = require('../../utils/appError');

module.exports = async (userId) => {

    const disabledSelf = await disableSelf(userId);

    if ( !disabledSelf ) throw new AppError(400, "Cannot perform this request");

    return disabledSelf;
}