const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');
const authRepo = require('../repositories/auth.repository');

const registerUser = async ({ name, lastname, phone, email, password, invite_code }) => {
  if (invite_code !== 'cammareros-invite')
    throw new AppError(400, "Enter the correct invite code");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await authRepo.createUser({ name, lastname, phone, email, passwordHash })

  return user;
}

module.exports = { registerUser };
