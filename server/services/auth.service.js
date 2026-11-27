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

  const user = await authRepo.getAuthenticatedUser(email);

  if (
    !user ||
    !(await bcrypt.compare(password, user.password_hash))
  ) throw new AppError(401, "Email or Password incorrect");

  if (!user.is_active) throw  new AppError(403, "Access denied")

  const { id, name, lastname, phone, role } = user;
  return { id, name, lastname, phone, email: user.email, role };
}


module.exports = { registerUser, loginUser };
