// Si el usuario registrado es de tipo "Espectador/a" no se lo deja ingresar a Crear Evento y se lo redirige a el formulario de edicion de usuario.
const categoryUser = (req, res, next) => {
    if(req.session.user && req.session.user.user_type_id === 1){
        // console.log("MIDDLEWARE!!",req.session.user);
        // return res.redirect('/users/editUser?categoria=Si querés crear un evento, debes cambiar tu categoría de usuario');
        return res.render('editUser', {
            error: {
                errorCategory: {
                    msg: 'Debes cambiar de categoría para crear un evento'
                }
        },
        title: "Editar",
        searchedUser: req.session.user});
    }
    
    next();
}

module.exports = categoryUser;