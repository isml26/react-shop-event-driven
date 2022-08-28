const { NotAuthorizedError } = require("../errors/not.authorized.error");

function requireAuth(req, res, next) {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
}

module.exports = {
  requireAuth,
};
