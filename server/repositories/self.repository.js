const sql = require('../config/postgresDB');

const updateSelf = async (userId, {name, lastname, phone, email}) => {
    const [updatedUser] = await sql`
        UPDATE users
        SET name = ${name},
            lastname = ${lastname},
            phone = ${phone},
            email = ${email}
        WHERE id = ${userId}
        RETURNING name, lastname, phone, email
    `;

    return updatedUser;
}

const disableSelf = async (userId) => {
    const [disabledUser] = await sql`
        UPDATE users
        SET is_active = false
        WHERE id = ${userId}
        RETURNING id, is_active
    `;

    return disabledUser;
}

const getHashPasswordToCompare = async (userId) => {
    const [hashPassword] = await sql`
        SELECT password_hash, is_active FROM users WHERE id = ${userId};
    `;

    return hashPassword
}

const updatePassword = async (userId, newPasswordHash) => {
    await sql.begin(async (tx) => {
        await tx`
            UPDATE users 
            SET password_hash = ${newPasswordHash}
            WHERE id = ${userId}
        `;

        await tx`
            DELETE FROM refresh_tokens
            WHERE user_id = ${userId}
        `;
    })
}


module.exports = { updateSelf, disableSelf, getHashPasswordToCompare, updatePassword }