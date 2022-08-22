const express = require("express")

const router = express.Router();

router.post("/api/users/signout",(req,res)=>{
    res.send("Hi there")
})

module.exports = {
    signout:router
}