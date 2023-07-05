// Este middleware se ocupa de limitar las rutas a las que puede acceder un usuario SIN sesiÓn iniciada. Lo que dice es que si un usuario que NO inició sesión quiere acceder a la ruta en donde se aplique este middleware se lo redirigirá al register '/users/register', pero si req.session.user se encuentra, sigue con el próximo paso. 
// Ejemplo para no mirar el archivo de rutas: router.get("/cart", authMiddleware, productControllers.getCart); Un usuario SIN sesión iniciada, es decir, que no está logueado, no podrá entrar al carrito de compras.

const authMiddleware = (req, res, next) => {
    if(!req.session.user){
        return res.redirect('/users/register');
    }
    next();
}

module.exports = authMiddleware;