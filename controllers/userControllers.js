// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');

const userControllers = {

    getLogin: (req, res) =>
        res.render('login', { title: 'Inicio de sesión' }),

    getEditUser: (req, res) =>
        res.render('editUser', { title: 'Edición de usuario' }),

    getRegister: (req, res) =>
        res.render('register', { title: 'Registro' }),

    postRegister: (req, res) => {
        let newUser = req.body;

        newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false
        newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false

        usersModel.createOne(newUser);

        res.redirect('/');
    },

}

module.exports = userControllers;