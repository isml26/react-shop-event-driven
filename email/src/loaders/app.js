require("express-async-errors");
require("dotenv").config()
const cors = require("cors");
const express = require("express");
const {
  errorHandler,
} = require("../../../common/src/middlewares/error.handler");
const { NotFoundError } = require("../../../common/src/errors/not-found-error");

const app = express();
app.set("trustproxy", true);
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Email service");
  });

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);



module.exports = app;
