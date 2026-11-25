const { findValidRefreshToken } = require("../repositories/token.repository");
const AppError = require("../utils/appError");
const { clearAuthCookie } = require("../utils/cookie");
const { verifyRefreshToken, hashToken } = require("../utils/token");

module.exports = async (req, res, next) => {
  console.log('asd');

  const refreshToken = req.cookies?.refresh_token;


  if (!refreshToken) return next(new AppError(401, "Refresh Token missing"))

  try {
    verifyRefreshToken(refreshToken);

    const hashRefresh = hashToken(refreshToken);
    const session = await findValidRefreshToken(decoded.id)

    if (!session) throw new Error("Refresh token revoked or user inactive")

    req.user = { id: session.user_id, role: session.role }
    req.refreshTokenHash = hashRefresh;
    next();

  } catch (err) {
    console.log(err);
    clearAuthCookie(res);
    return next(new AppError(401, "Session invalid or expired. Please Log-In again"))
  }
}
