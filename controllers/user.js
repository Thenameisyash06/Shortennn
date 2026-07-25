const user = require('../models/user.js')
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../services/auth.js');

async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    await user.create({
        name,
        email,
        password,
    })
    res.redirect("/");
}

async function handleLogin(req,res){
    const {email,password} = req.body;
    const User = await user.findOne({email,password});
    if(!User) return res.render('login',{
        message: 'user not found!'
    })
    const sessionId = uuidv4();
    setUser(sessionId,User);
    res.cookie("uid",sessionId);
    // if(User.email==="yashd9404@gmail.com"&&User.password==="123456")
    res.redirect("/index");
    // else
    // res.redirect("/index2");
}

module.exports = {
    handleUserSignup,handleLogin
}