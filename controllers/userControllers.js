// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const { bcrypt, hashSync, compareSync } = require('bcryptjs');

const userControllers = {

    getLogin: (req, res) =>
        res.render('login', { title: 'Inicio de sesión' }),

    getEditUser: (req, res) =>
        res.render('editUser', { title: 'Edición de usuario' }),

    getRegister: (req, res) =>
        res.render('register', { title: 'Registro', oldData: {}, errors: {} }),

    postRegister: (req, res) => {
        let validation = validationResult(req);
        if (validation.errors.length > 0) {
            console.log(validation.mapped());
            console.log(req.body);
            return res.render('register',{
                errors: validation.mapped(),
                oldData: req.body,
                title: 'Registro'
            })
        } else {
            let newUser = req.body;
            newUser.passRegForm = hashSync(newUser.passRegForm, 12);
            let check = compareSync(newUser.checkPassRegForm, newUser.passRegForm);
            console.log(newUser);
            if(!check) {
                return res.render('register', {
                    errors: {
                        checkPassRegForm: {
                            msg: 'Las contraseñas no coinciden'
                        }
                    },
                    oldData: req.body,
                    title: 'Registro'
                })
            } else {
                newUser.checkPassRegForm = hashSync(newUser.passRegForm, 12);
                newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false;
                newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false;
                console.log(req.body);
                // usersModel.createOne(newUser);
                return res.redirect('/');
            }
        }
    },

}

module.exports = userControllers;