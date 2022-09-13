require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const emailRoutes = require("../api/index")
const {
  errorHandler,
} = require("../../../common/src/middlewares/error.handler");
const { NotFoundError } = require("@igcommon/common");

const app = express();
app.set("trustproxy", true);
app.use(express.json());
app.use(cors());
app.use(emailRoutes)

app.all("*", async () => {
  throw new NotFoundError();
});

app.get("/", (req, res) => {
  res.send("Email service");
});



app.use(errorHandler);

module.exports = app;
