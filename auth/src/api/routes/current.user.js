const express = require("express");
// const jwt = require("jsonwebtoken");
const {
  currentUser,
} = require("../../../../common/src/middlewares/current.user");

const {EmailConfirmedPublisher} = require("../../events/publishers/email.confirmed.publisher")
const router = express.Router();

router.get("/api/users/currentUser", currentUser, (req, res) => {
  // check req.session whether set or not
  new EmailConfirmedPublisher(global.producer).publish("This is a test message")
  res.send({ currentUser: req.currentUser || null });

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
