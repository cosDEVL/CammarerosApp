const { rotateHashToken } = require("../repositories/token.repository");
const { setAuthCookie } = require("../utils/cookie");
const { signAccessToken, signRefreshToken, hashToken } = require("../utils/token");

module.exports = async (user, oldRefreshToken, res) => {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);

  const newHashRefresh = hashToken(refreshToken);
  await rotateHashToken(oldRefreshToken, newHashRefresh);

  setAuthCookie(res, {accessToken, refreshToken})
}
