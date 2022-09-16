import express = require("express");
// const jwt = require("jsonwebtoken");
const router = express.Router();
import {EmailConfirmedPublisher} from "../../events/publishers/email-confirmed-publisher"

router.get("/api/email/confirm/:id", (req, res) => {
  const user_id = req.params.id;
  console.log("user id is ", user_id )

  new EmailConfirmedPublisher(global.producer).publish({user_id:user_id})

  res.send("Confirmed")
});

export { router as confirmEmail };