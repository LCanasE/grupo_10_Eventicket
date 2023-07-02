// Si el usuario registrado es de tipo "Espectador/a" no se lo deja ingresar a Crear Evento y se lo redirige a el formulario de edicion de usuario.
const categoryUser = (req, res, next) => {
    if(req.session.user && req.session.user.tipoUsuario === "Espectador/a"){
        return res.redirect('/users/editUser?=Queres cambiar de categoria');
    }
    
    next();
}

module.exports = categoryUser;