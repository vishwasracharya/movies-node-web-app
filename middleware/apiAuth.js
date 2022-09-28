const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const bearerHeader = req.headers.authorization || req.cookies.token;
  if (typeof bearerHeader !== 'undefined') {
    // check if bearerHeader has a space in it
    let bearer;
    let bearerToken;
    if (bearerHeader.indexOf(' ') >= 0) {
      // Split at the space
      bearer = bearerHeader.split(' ');
      [, bearerToken] = bearer;
    }
    // Set the token
    const token = bearerToken || bearerHeader;
    try {
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      req.user = decoded;
      return next();
    } catch (ex) {
      return res.status(400).send('Invalid Token');
    }
  } else {
    // forbidden
    return res.status(403).send('Forbidden');
  }
};
