const express = require("express");
const { confirmEmail } = require("./routes/confirm.email");

const routes = express.Router();

routes.use("/", [confirmEmail]);

module.exports = routes;
