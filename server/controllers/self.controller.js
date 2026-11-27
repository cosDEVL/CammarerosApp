const resToClient = require("../utils/resToClient");
const rotateCookie = require("../services/handleCookies/rotateCookie.service");
const clearCookies = require('../services/handleCookies/clearCookie.service');
const { updateSelfData, updateSelfPassword } = require('../services/handleSelf/updateSelf.service');
const disableUser = require('../services/handleSelf/disableSelf.service')
const {backgroundColorNames} = require("chalk");

const updateSelf = async (req, res, next) => {

    const { id } = req.user;

    const updatedUser = await updateSelfData(id, req.formData);

    resToClient(res, 200, 'ok', 'User data updated successfully', { updatedUser });
}

const disableSelf = async (req, res, next) => {

    const { id } = req.user;

    const disabledSelf = await disableUser(id);

    resToClient(res, 200, 'ok', 'User disabled successfully', { user: disabledSelf });
}

const updatePassword = async (req, res, next) => {
console.log("asda")
    const { id } = req.user;

    await updateSelfPassword(id, req.formData);

    await clearCookies(res);

    resToClient(res, 200, 'ok', 'Password updated successfully');
}

module.exports = {
    updateSelf, disableSelf, updatePassword
}