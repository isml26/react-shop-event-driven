require("express-async-errors");
const express = require("express");
const authRoutes = require("../api/index");
const {
  errorHandler,
} = require("../../../common/src/middlewares/error.handler");
const { NotFoundError } = require("../../../common/src/errors/not-found-error");

const app = express();
app.use(express.json());

app.use(authRoutes);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("helloğ");
});

module.exports = app;
