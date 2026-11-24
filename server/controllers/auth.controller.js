const authService = require('../services/auth.service');

const registerUser = async (req, res) => {
  const user = await authService.registerUser(req.body);

  res.status(201).json({
    status: 'ok',
    message: 'User registered successfully!',
    user
  })
}

module.exports = { registerUser };
