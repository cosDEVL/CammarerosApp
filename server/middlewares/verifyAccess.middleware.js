
const AppError = require("../utils/appError");
const { verifyAccessToken } = require("../utils/token");

module.exports = (req, res, next) => {

  const accessToken = req.cookies?.access_token;

  if (!accessToken) return next(new AppError(401, "Access Token missing"));

  try {
    const decoded = verifyAccessToken(accessToken);
    req.user = { id: decoded.id, role: decoded.role }
    next();
  } catch (err) {
    return next(new AppError(401, "Access Token expired or invalid"))
  }


}
