// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const { bcrypt, hashSync, compareSync } = require('bcryptjs');

const userControllers = {

    getLogin: (req, res) => {
        const error = req.query.error || '';

        res.render('login', { title: 'Inicio de sesión', error, userData:{}})
    },

    getEditUser: (req, res) => {
        const error = req.query.error || '';
        let email = req.session.user.emailRegForm
        let searchedUser = usersModel.findByEmail(email);
        if (!searchedUser) {
            return res.send('Email inválido');
        }
        console.log(searchedUser);
        let nuevosDatos = req.body;
        res.render('editUser', { title: 'Edición de usuario', searchedUser, error});
    },

    putEditUser: (req, res) => {
        let email = req.session.user.emailRegForm
        let searchedUser = usersModel.findByEmail(email);
        if (!searchedUser) {
            return res.send('Email inválido');
        }
        let id = searchedUser.id;
        let newData = req.body;
        console.log(searchedUser);
        console.log(newData);

        const { passRegForm: hashedPassword } = searchedUser;
        const isCorrect = compareSync(newData.passRegForm, hashedPassword);

        if(isCorrect){
            newData.passRegForm = hashSync(newData.passRegForm, 12);
            newData.checkPassRegForm = searchedUser.checkPassRegForm;
            newData.tyc === "on" ? newData.tyc = true : newData.tyc = false;
            newData.notificaciones === "on" ? newData.notificaciones = true : newData.notificaciones = false;
        } else {
            return res.redirect('/users/editUser?error=La contraseña no coincide');
        }

        usersModel.updateById(id, newData);
        res.redirect('/');
    },

    getRegister: (req, res) =>{
        res.render('register', { title: 'Registro', oldData: {}, errors: {} });
    }, 
    postRegister: (req, res) => {
        // Primero se estableció una validación específica del campo email para evitar que un usuario se registre dos veces. Se pregunta si el mail que el usuario ingresó en el formulario de registro ya está en la base de datos o no. En caso de que esté, se corta la ejecución y se renderiza la vista 'register' con el errors que dentro tiene errorMail y dentro msg: 'Ya estás registrado'. Luego desde la vista se le agrega la frase 'Por favor inicie sesión aquí', en la que 'aquí' es un href al formulario de login.
        const searchedUser = usersModel.findByEmail(req.body.emailRegForm);
        if(searchedUser){
            console.log('Ya estas registrado');
        return res.render('register',{
            errors: {
                errorMail: {
                    msg: 'Ya estás registrado'
                }
            },
            oldData: req.body,
            title: 'Registro',
        })
        };

        let validation = validationResult(req);
        if (validation.errors.length > 0) {
            console.log(validation.mapped());
            console.log(req.body);
            // Si hay algún error, se renderiza la vista register y se envian en errors los errores, pero al utilizar el mapped(), errors se transforma en un objeto en vez de ser un array. Errors es un objeto que tendra objetos por la cantidad de errores que seran los name del form.
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
                return res.redirect('/users/login');
            }
        }
    },

    // El POST para hacer el logeo validando la contraseña hasheado y si existe el usuario buscado.
    //Aun tengo que checkear del porque dejó de funcionar.
    postLogin: (req, res) => {
        console.log(req.body);
        const searchedUser = usersModel.findByEmail(req.body.emailLogin);

        if (!searchedUser) {
            return res.redirect('/users/login?error=El email o la contraseña es inválido');

        }
        const { passRegForm: hashedPassword } = searchedUser;
        const isCorrect = compareSync(req.body.passwordLogin, hashedPassword);

        if (isCorrect) {
            //Cookie para mantener la sesión iniciada
            if (!!req.body.rememberme) {
                res.cookie('email', searchedUser.emailRegForm, {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 999
                });
            }
            
            delete searchedUser.id;
            delete searchedUser.passRegForm;
            delete searchedUser.checkPassRegForm;
            req.session.user = searchedUser;
            
            return res.redirect('/');
        } else {
            return res.redirect('/users/login?error=El email o la contraseña es invalido');
        }
    }
}
module.exports = userControllers;