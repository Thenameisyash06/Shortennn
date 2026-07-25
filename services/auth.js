// const sessionMapTouser = new Map()
// const jwt = require('jsonwebtoken')
// const secret = 'yash@123$321$'
// function setUser(user){
//     // sessionMapTouser.set(id,user);
//     return jwt.sign({
//         _id : user._id,
//         email: user.email,
//     },secret)
// }
// // function getUser(id,user){
// //     return sessionMapTouser.get(id);
// // }

// function getUser(token){
//     if(!token) return null
//     // try {
//     //    return jwt.verify(token,secret)
//     // } catch (error) {
//     //     return null
//     // }
//     return jwt.verify(token,secret)
// }

// module.exports ={
//     setUser,getUser,
// };
// const Razorpay = require('razorpay');
// const crypto = require('crypto');
// require('dotenv').config();

// const sessionMapTouser = new Map()
// const 

function setUser(id,user){
    sessionMapTouser.set(id,user);
}
function getUser(id){
    return sessionMapTouser.get(id);
}

module.exports ={
    setUser,getUser,
};