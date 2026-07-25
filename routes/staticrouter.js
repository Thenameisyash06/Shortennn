const express = require("express");
const router = express.Router();
const URL = require("../models/url")

router.get('/',(req,res)=>{
    return res.render("login",{message: null})
})

router.get('/signup',(req,res)=>{
    return res.render("Signup")
})

router.get('/index',async (req,res)=>{
    return res.render("index");
})


module.exports = router;