"use strict";
const nodemailer = require("nodemailer");
const fs = require("fs")
// const fetch = require("node-fetch")

// async..await is not allowed in global scope, must use a wrapper

interface data {
  user_id: string;
  email: string;
};

async function send_email(user_data:data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: "iguven2697@gmail.com", // generated ethereal user
      pass: "wextsqvhgrtlbath", // generated ethereal password
    },
  });
  // const resp = await fetch("index.html");

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Capstone 👻" <info@capstone.com>', // sender address
    to: user_data.email, // list of receivers
    subject: "Email Confirmation ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `http://localhost:3002/api/email/confirm/${user_data.user_id}` // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

// send_email({
//   id:"kjsadışsl",
//   email:"iguven1999@hotmail.com"
// })

export {send_email}
