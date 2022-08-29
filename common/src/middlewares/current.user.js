const jwt = require("jsonwebtoken");

function currentUser(req, res, next) {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
    req.currentUser = payload;
  } catch (error) {
    console.log(error);
  }
  next();
}

module.exports = {
  currentUser,
};
