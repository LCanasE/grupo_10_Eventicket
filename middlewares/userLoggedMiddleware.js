const UserNoDb = require('../models/usersModel');
const { User } = require('../database/models')

const userLoggedMiddleware = async(req,res,next) => {
        res.locals.isLogged = false;

        let emailInCookie = req.cookies.email;
        if(emailInCookie){
        console.log("MIDDLEWARE", emailInCookie);
        let userFromCookie = await User.findOne({
            raw: true,
            where: {
                email: emailInCookie
            }
        })
        // UserNoDb.findByEmail(emailInCookie);
        // console.log("MIDDLEWARE", userFromCookie);
        // console.log("USER FROM COOKIE", userFromCookie);
    
        if(userFromCookie){
            delete userFromCookie.id;
            delete userFromCookie.password;
            delete userFromCookie.check_password;
            req.session.user = userFromCookie;
            console.log("SESSION MIDDLEWARE", req.session.user);
        }
    }
    
        if(req.session.user) {
            res.locals.isLogged = true
            res.locals.user = req.session.user
        }
    
        next();
}

module.exports = userLoggedMiddleware;