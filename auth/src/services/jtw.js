const jwt = require("jsonwebtoken");

function setJwt(user, req) {
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY
  );
  // store it on session obj
  req.session = {
    jwt:userJwt,
  };
}

module.exports = {
    setJwt
}
