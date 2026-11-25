const authService = require('../services/auth.service');
const setCookies = require('../services/setCookie.service');
const clearCookies = require('../services/clearCookie.service');
const rotateCookie = require('../services/rotateCookie.service');

const registerUser = async (req, res, next) => {
  const user = await authService.registerUser(req.formData);

  await setCookies(user, res);

  res.status(201).json({
    status: 'ok',
    message: 'User registered successfully!',
    data: { user }
  })
}

const loginUser = async (req, res, next) => {
  const user = await authService.loginUser(req.formData);

  await setCookies(user, res);

  res.status(200).json({
    status: 'ok',
    message: 'User logged in successfully!',
    data: { user }
  })
}

const logoutUser = async (req, res, next) => {

  await clearCookies(req.cookies.refresh_token, res)

  res.status(200).json({
    status: 'ok',
    message: 'User logged out successfully!'
  })
}

const refreshToken = async (req, res, next) => {

  await rotateCookie(req.user, req.refreshTokenHash, res);

  res.status(200).json({
      status: 'ok',
      message: 'Token refreshed successfully',
      data: { user: req.user },
    });
}

module.exports = { registerUser, loginUser, logoutUser, refreshToken };
