const express = require("express")
const {currentUserRouter} = require("./routes/current.user")
const {signin} = require("./routes/signin")
const {signup} = require("./routes/signup")
const {signout} = require("./routes/signout")

const routes = express.Router();

routes.use("/",[
    currentUserRouter,
    signin,
    signup,
    signout
])

module.exports = routes;