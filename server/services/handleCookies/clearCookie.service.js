const { deleteHashToken } = require("../../repositories/token.repository");
const { clearAuthCookie } = require("../../utils/cookie");
const { hashToken } = require("../../utils/token");

module.exports = async (res, refresh_token = null ) => {
  clearAuthCookie(res);

  if (refresh_token) {
    const hashRefresh = hashToken(refresh_token);
    await deleteHashToken(hashRefresh);
  }

}
