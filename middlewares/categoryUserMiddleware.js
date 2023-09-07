// Si el usuario registrado es de tipo "Espectador/a" no se lo deja ingresar a Crear Evento y se lo redirige a la vista de beProducer para luego ir al formulario de edicion de usuario.
const categoryUser = (req, res, next) => {
  if (req.session.user && req.session.user.user_type_id === 1) {
    return res.render("beUserProducer", {
      error: {
        errorCategory: {
          msg: "Debes cambiar de categoría para crear un evento",
        },
      },
      title: "Editar",
      searchedUser: req.session.user,
    });
  }

  next();
};

module.exports = categoryUser;
