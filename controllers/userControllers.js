// Controlador de usuarios
const path = require('path');

const userControllers = {

    getLogin: (req, res) =>
    res.render('login', { title: 'Inicio de sesión'}),

    getRegister: (req, res) =>
    res.render('register', { title: 'Registro' })
}

module.exports = userControllers;