module.exports = (req, res, next) => {
  const { user } = req;
  if (!user.isAdmin) return res.status(403).send('Access Denied');
  return next();
};
