const authService = require('../services/auth.service');
const sendResetToken = require('../services/handleResetPassword/resetToken.service');
const resetUserPassword = require('../services/handleResetPassword/resetPassword.service');

const setCookies = require('../services/handleCookies/setCookie.service');
const clearCookies = require('../services/handleCookies/clearCookie.service');
const rotateCookie = require('../services/handleCookies/rotateCookie.service');

const resToClient = require('../utils/resToClient');
const {backgroundColorNames} = require("chalk");

const registerUser = async (req, res, next) => {
  const user = await authService.registerUser(req.formData);

  await setCookies(user, res);

  resToClient(res, 200, 'ok', 'User registered successfully!', { user });
}

const loginUser = async (req, res, next) => {
  const user = await authService.loginUser(req.formData);

  await setCookies(user, res);

  resToClient(res, 200, 'ok', 'User logged in successfully!', { user });
}

const logoutUser = async (req, res, next) => {

  await clearCookies(res, req.cookies.refresh_token)

  resToClient(res, 200, 'ok', 'User logged out successfully!');
}


const forgotPassword = async (req, res, next) => {
  const resetToken = await sendResetToken(req.formData.email);

  resToClient(res, 200, 'ok', "If there's an account with that email, you will receive a Reset Token to use for request a password reset.", { resetToken });
}

const resetPassword = async (req, res, next) => {

  await resetUserPassword(req.params, req.formData.password);

  await clearCookies(res);

  resToClient(res, 200, 'ok', 'Password successfully reset');
}

const refreshToken = async (req, res, next) => {

  await rotateCookie(req.user, req.refreshTokenHash, res);

  resToClient(res, 200, 'ok', 'Token refreshed successfully', { user: req.user });
}

module.exports = {
  registerUser, loginUser, logoutUser,
  forgotPassword, resetPassword,
  refreshToken
};
