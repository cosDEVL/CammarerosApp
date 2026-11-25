const sql = require('../config/postgresDB');

const getInviteCode = async () => {
  const [inviteCode] = await sql`
        SELECT * FROM app_settings
    `;

  return inviteCode.value;
}

const createUser = async ({name, lastname, phone, email, passwordHash}) => {
  const [user] = await sql`
    INSERT INTO USERS (name, lastname, phone, email, password_hash)
    VALUES (${name}, ${lastname}, ${phone}, ${email}, ${passwordHash})
    RETURNING id, name, lastname, phone, email, role
    `;

  return user;
}

const getUserCredentials = async (email) => {
  const [userCredentials] = await sql`
    SELECT id, password_hash, role, is_active FROM users WHERE email = ${email}
    `;
  return userCredentials;
}


module.exports = { getInviteCode, createUser, getUserCredentials };
