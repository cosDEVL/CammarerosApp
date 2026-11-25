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

const getUser = async (email) => {
  const [user] = await sql`
    SELECT * FROM users WHERE email = ${email}
    `;
  return user;
}


module.exports = { getInviteCode, createUser, getUser };
