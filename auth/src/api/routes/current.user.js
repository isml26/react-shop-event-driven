const express = require("express")

const router = express.Router();

router.get("/api/users/currentUser",(req,res)=>{
    res.send("Hi there")
})

module.exports = {
    currentUser:router
}