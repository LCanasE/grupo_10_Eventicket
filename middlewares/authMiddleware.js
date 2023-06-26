const authMiddleware = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/users/register');
    }
    next();
}

module.exports = authMiddleware;