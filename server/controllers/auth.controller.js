const authService = require('../services/auth.service');
const setCookies = require('../services/setCookie.service');
const clearCookies = require('../services/clearCookie.service');

const registerUser = async (req, res, next) => {
  const user = await authService.registerUser(req.formData);

  await setCookies(user, res);

  res.status(201).json({
    status: 'ok',
    message: 'User registered successfully!'
  })
}

const loginUser = async (req, res, next) => {
  const user = await authService.loginUser(req.formData);

  await setCookies(user, res);

  res.status(201).json({
    status: 'ok',
    message: 'User logged in successfully!'
  })
}

const logoutUser = async (req, res, next) => {

  await clearCookies(req.cookies.refresh_token, res)

  res.status(201).json({
    status: 'ok',
    message: 'User logged out successfully!'
  })
}

module.exports = { registerUser, loginUser, logoutUser };
