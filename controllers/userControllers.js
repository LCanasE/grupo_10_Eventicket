// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const { bcrypt, hashSync, compareSync } = require('bcryptjs');

const userControllers = {

    getLogin: (req, res) => {
        const error = req.query.error || '';
        res.render('login', { title: 'Inicio de sesión', error });
        },

    postLogin: (req, res) => {
        const searchedUser = usersModel.findByEmail(req.body.nombreUsuario);
        if(!searchedUser) {
            return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
        }

            const { passRegForm: hashed } = searchedUser;
            const isCorrect = compareSync(req.body.password, hashed);

            if(isCorrect){
                console.log(searchedUser);
                if(!!req.body.sesionIniciada){
                    res.cookie('email', searchedUser.emailRegForm, {
                        maxAge: 1000 * 60 * 60 * 24 * 360 * 999
                    });
                }

                delete searchedUser.passRegForm;
                delete searchedUser.checkPassRegForm;
                delete searchedUser.id;

                req.session.user = searchedUser;

                res.redirect('/')
            } else {
                return res.redirect('login?error=El mail o la contraseña son incorrectos')
            }
        
    },

    getEditUser: (req, res) =>
        res.render('editUser', { title: 'Edición de usuario' }),

    getRegister: (req, res) =>
        res.render('register', { title: 'Registro', oldData: {}, errors: {} }),

    postRegister: (req, res) => {
        let validation = validationResult(req);
        if (validation.errors.length > 0) {
            console.log(validation.mapped());
            console.log(req.body);
            // Si hay algun error, se renderiza la vista register y se envian en errors los errores pero al utilizar el mapped() errors se transforma en un objeto en vez de array. Errors es un objeto que tendra objetos por la cantidad de errores que seran los name del form.
            return res.render('register',{
                errors: validation.mapped(),
                oldData: req.body,
                title: 'Registro'
            })
        } else {
            // Si no hay errores en las validaciones, entonces se hashea la contraseña del usuario con hashSync. Luego se crea la variable check que compara "Confirmar contraseña" con la contraseña hasheada.
            let newUser = req.body;
            newUser.passRegForm = hashSync(newUser.passRegForm, 12);
            let check = compareSync(newUser.checkPassRegForm, newUser.passRegForm);
            console.log(newUser);
            if(!check) {
                // Si las contraseñas no coinciden, se renderiza la vista 'register' y se envia errors que es un objeto que en este caso contendrá la clave checkPassRegForm que a su vez es un objeto que contiene la propiedad msg: 'Las contraseñas no coinciden'.
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
                // Si las contraseñas coinciden, se hashea "Confirmar contraseña", se le asigna booleanos a "notificaciones" y a "tyc" (términos y condiciones), se crea un nuevo usuario y se redirige al home.
                newUser.checkPassRegForm = hashSync(newUser.passRegForm, 12);
                newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false;
                newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false;
                console.log(req.body);
                usersModel.createOne(newUser);
                return res.redirect('/');
            }
        }
    },

}
module.exports = userControllers;