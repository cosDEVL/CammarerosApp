const { insertHashToken } = require("../repositories/token.repository");
const { setAuthCookie } = require("../utils/cookie");
const { signAccessToken, signRefreshToken, hashToken } = require("../utils/token")


module.exports = async (user, res) => {

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  const hashRefresh = hashToken(refreshToken);
  await insertHashToken(user.id, hashRefresh)


  setAuthCookie(res, { accessToken, refreshToken });

}
