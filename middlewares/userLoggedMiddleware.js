const User = require('../models/usersModel');

function userLoggedMiddleware(req,res,next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.email;
    let userFromCookie = User.findByEmail(emailInCookie);
    // console.log(userFromCookie);

    if(userFromCookie){
        req.session.user = userFromCookie;
    }

    if(req.session.user) {
        res.locals.isLogged = true
        res.locals.user = req.session.user
    }

    next();
}

module.exports = userLoggedMiddleware;