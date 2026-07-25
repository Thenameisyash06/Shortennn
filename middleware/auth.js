const {getUser} = require('../services/auth')

async function restrictToLoggedInUser(req, res, next) {
    const userUid = req.cookies?.uid

    if(!userUid ) return res.redirect('/');
    const User = getUser(userUid);

    if(!User) return res.redirect('/');
    
    req.user = User;
    next();
}

module.exports = {restrictToLoggedInUser}