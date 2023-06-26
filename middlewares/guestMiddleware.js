
// Este middleware se ocupa de limitar las rutas a las que puede acceder un usuario con sesion iniciada. Lo que dice es que si un usuario inició sesión se lo redirigirá a la home '/', pero si req.session.user no se encuentra, sigue con el próximo paso. 
const guestMiddleware = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    
    next();
}

module.exports = guestMiddleware;