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

const getAuthenticatedUser = async (email) => {
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
    `;
  return user;
}

const getUserIdByEmail = async (email) => {
  const [userId] = await sql`
        SELECT id, is_active
        FROM users
        WHERE email = ${email}
    `;

  return userId;
}

const resetUserPassword = async (userId, newHashPassword) => {
  await sql.begin(async (tx) => {
    await tx`
        UPDATE users
        SET password_hash = ${newHashPassword}
        WHERE id = ${userId}
    `;
    await tx`
      DELETE FROM refresh_tokens
      WHERE user_id = ${userId}
    `;
  })
}


module.exports = { getInviteCode, createUser, getAuthenticatedUser, getUserIdByEmail, resetUserPassword };
