const express = require("express");
// const jwt = require("jsonwebtoken");
const router = express.Router();
const {EmailConfirmedPublisher} = require("../../events/publishers/email.confirmed.publisher")

router.get("/api/email/confirm/:id", (req, res) => {
  const user_id = req.params.id;
  console.log("user id is ", user_id )

  new EmailConfirmedPublisher(global.producer).publish(user_id)

  res.send("Confirmed")
});

module.exports = {
  confirmEmail: router,
};
