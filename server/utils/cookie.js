const isProd = process.env.NODE_ENV === 'production';

const baseCookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax'
};

const accessCookieOptions = {
  ...baseCookieOptions,
  path: '/'
};

const refreshCookieOptions = {
  ...baseCookieOptions,
  path: '/api/v1/auth/'
};

const setAuthCookie = (res, { accessToken, refreshToken }) => {
  res.cookie('access_token', accessToken, {
    ...accessCookieOptions,
    maxAge: 15 * 60 * 1000 //15min
    // maxAge: 10000 //10s
  });

  res.cookie('refresh_token', refreshToken, {
    ...refreshCookieOptions,
    maxAge: 30 * 24 * 60 * 60 * 1000 //30days
  })
};

const clearAuthCookie = (res) => {
  res.clearCookie('access_token', accessCookieOptions);
  res.clearCookie('refresh_token', refreshCookieOptions);
}

module.exports = { setAuthCookie, clearAuthCookie }
