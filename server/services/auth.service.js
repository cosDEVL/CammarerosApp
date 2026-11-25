const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const authRepo = require('../repositories/auth.repository');

const registerUser = async ({ name, lastname, phone, email, password, invite_code }) => {

  const inviteCode = await authRepo.getInviteCode();

  if (invite_code !== inviteCode)
    throw new AppError(400, "Enter the correct invite code");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await authRepo.createUser({ name, lastname, phone, email, passwordHash })

  return user;
}

const loginUser = async ({ email, password }) => {

  const userCredentials = await authRepo.getUserCredentials(email);

  if (
    !userCredentials.is_active ||
    !(await bcrypt.compare(password, userCredentials.password_hash))
  ) throw new AppError(400, "Email or Password incorrect");

  return userCredentials;
}


module.exports = { registerUser, loginUser };
