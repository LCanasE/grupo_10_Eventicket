// Si el usuario no está registrado, no se lo deja pasar y se lo redirige a al formulario de registro.
const authMiddleware = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/users/register');
    }
    next();
}

module.exports = authMiddleware;