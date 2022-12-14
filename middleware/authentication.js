const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.redirect(302, `${process.env.SITE_URL}/auth/signup`);

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    return next();
  } catch (ex) {
    return res.status(400).send('Invalid Token');
  }
};
