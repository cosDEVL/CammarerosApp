const sql = require('../config/postgresDB');

const insertHashToken = async (user_id, hashToken) => {

  await sql`
        INSERT INTO refresh_tokens (token_hash, user_id, expires_at)
        VALUES (${hashToken}, ${user_id}, NOW() + INTERVAL '30 days');
    `;
};

const rotateHashToken = async (oldRefreshToken, newRefreshToken) => {

  await sql`
        UPDATE refresh_tokens
        SET token_hash = ${newRefreshToken},
            expires_at = NOW() + INTERVAL '30 days'
        WHERE token_hash = ${oldRefreshToken}
    `;

}

const findValidRefreshToken = async (tokenHash) => {

  const [session] = await sql`
        SELECT rt.token_hash, u.id as user_id, u.role
        FROM refresh_tokens rt JOIN users u ON rt.user_id = u.id
        WHERE rt.token_hash = ${tokenHash}
        AND rt.expires_at > NOW()
        AND u.is_active = true
    `;


  return session;
};

const deleteHashToken = async (tokenHash) => {
  await sql`
        DELETE FROM refresh_tokens
        WHERE token_hash = ${tokenHash}
    `
};

module.exports = { insertHashToken, findValidRefreshToken, deleteHashToken, rotateHashToken };
