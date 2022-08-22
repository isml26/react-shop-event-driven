const express = require("express")

const router = express.Router();

router.post("/api/users/signin",(req,res)=>{
    res.send("signin")
})

module.exports = {
    signin:router
}