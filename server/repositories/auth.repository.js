const sql = require('../config/postgresDB');

const createUser = async ({name, lastname, phone, email, passwordHash}) => {
  const [user] = await sql`
    INSERT INTO USERS (name, lastname, phone, email, password_hash)
    VALUES (${name}, ${lastname}, ${phone}, ${email}, ${passwordHash})
    RETURNING id, name, lastname, phone, email, role
    `;

  return user;
}


module.exports = { createUser };
