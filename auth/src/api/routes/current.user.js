const express = require("express");
// const jwt = require("jsonwebtoken");
const {
  currentUser,
} = require("../../../../common/src/middlewares/current.user");

const router = express.Router();

router.get("/api/users/currentUser", currentUser,(req, res) => {
  // check req.session whether set or not
  res.send({currentUser:req.currentUser || null});


  // if (!req.session?.jwt) {
  //   return res.send({ currentUser: null });
  // }
  // try {
  //   const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY);
  //   res.send({ currentUser: payload });
  // } catch (error) {
  //   console.log(error)
  //   res.send({ currentUser: null ,error});
  // }
});

module.exports = {
  currentUserRouter: router,
};
