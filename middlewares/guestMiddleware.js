
// Este middleware se ocupa de limitar las rutas a las que puede acceder un usuario con sesion iniciada. Lo que dice es que si un usuario que inició sesión quiere acceder a la ruta en donde se aplique este middleware se lo redirigirá a la home '/', pero si req.session.user no se encuentra, sigue con el próximo paso. 
// Ejemplo para no mirar el archivo de rutas: router.get("/login", guestMiddleware, userControllers.getLogin); Un usuario con sesion iniciada, es decir, logueado, no podrá entrar al login.
const guestMiddleware = (req, res, next) => {
    if(req.session.user){
        return res.redirect('/');
    }
    
    next();
}

module.exports = guestMiddleware;