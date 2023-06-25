// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');
const { isContext } = require('vm');

const userControllers = {

    getLogin: (req, res) => {
        const error = req.query.error || '';

        res.render('login', { title: 'Inicio de sesión', error })
    },

    getEditUser: (req, res) =>
        res.render('editUser', { title: 'Edición de usuario' }),

    getRegister: (req, res) =>
        res.render('register', { title: 'Registro', errors: [], oldData: {} }),

    postRegister: (req, res) => {

        //Chequear si el email ya existe
        let searchUser = usersModel.findByEmail(req.body.emailRegForm)
        if (searchUser){
            //Devuelve al register si el email ya existe
            return res.render('register', {
                errors: {
                    checkEmail: {
                        msg: "Este email ya ha sido registrado"
                    }
                },
                oldData: req.body,
                title: 'Crear'
            })
        }
      






        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.errors,
                oldData: req.body,
                title: 'Crear'
            });
        } else {
            //Hasheo de contraseña
            let newUser = req.body;
            const newPassword = bcrypt.hashSync(newUser.passRegForm, 12);
            newUser.passRegForm = newPassword;

            let checkPassword = bcrypt.compareSync(newUser.checkPassRegForm, newUser.passRegForm)
            if (!checkPassword) {
                return res.render('register', {
                    errors: {
                        checkPassword: {
                            msg: "Las contraseñas no coinciden"
                        }
                    },
                    oldData: req.body,
                    title: 'Crear'
                })
            } else {

                //Hasheo de Confirmar Contraseña
                const newCheckPassword = bcrypt.hashSync(newUser.checkPassRegForm, 12);
                newUser.checkPassRegForm = newCheckPassword;
                newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false
                newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false

                usersModel.createOne(newUser);

                //Redirecciona al login para iniciar sesión
                res.redirect('/users/login',);
                //Redirecciona al Home ya logueado
                //res.redirect('/')
            }
        }
    },

    // El POST para hacer el logeo validando la contraseña hasheado y si existe el usuario buscado.
    //Aun tengo que checkear del porque dejó de funcionar.
    postLogin: (req, res) => {
        const searchedUser = usersModel.findByEmail(req.body.emailLogin);

        if (!searchedUser) {
            return res.redirect('/users/login?error=El email o la contraseña es inválido');

        }
        const { passRegForm: hashedPassword } = searchedUser;
        const isCorrect = bcrypt.compareSync(req.body.passwordLogin, hashedPassword);

        if (isCorrect) {
            return res.redirect('/');
        } else {
            return res.redirect('/users/login?error=El email o la contraseña es invalido');
        }

        

    }

}

module.exports = userControllers; 