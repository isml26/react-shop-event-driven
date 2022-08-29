require("express-async-errors");
require("dotenv").config()
const express = require("express");
const cookieSession = require("cookie-session");
const authRoutes = require("../api/index");
const {
  errorHandler,
} = require("../../../common/src/middlewares/error.handler");
const { NotFoundError } = require("../../../common/src/errors/not-found-error");

const app = express();
app.set("trustproxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

app.use(authRoutes);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("helloğ");
});

module.exports = app;
