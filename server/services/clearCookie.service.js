const { deleteHashToken } = require("../repositories/token.repository");
const { clearAuthCookie } = require("../utils/cookie");
const { hashToken } = require("../utils/token");

module.exports = async (refresh_token, res) => {
  console.log(refresh_token);

  clearAuthCookie(res);

  const hashRefresh = hashToken(refresh_token);
  await deleteHashToken(hashRefresh);

}
