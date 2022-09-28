const jwt = require('jsonwebtoken');

function getPathFromUrl(url) {
  return url.split('?')[0];
}

module.exports = (req, res, next) => {
  res.locals.token = req.cookies.token;
  res.locals.userDetails = req.cookies.token
    ? jwt.verify(req.cookies.token, process.env.JWT_PRIVATE_KEY)
    : null;
  res.locals.isLoggedIn = req.cookies.token;
  res.locals.env = process.env.ENVIRONMENT;
  res.locals.site_url = process.env.SITE_URL;
  res.locals.slug = getPathFromUrl(req.originalUrl);
  next();
};
