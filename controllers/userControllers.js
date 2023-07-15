// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const { bcrypt, hashSync, compareSync } = require('bcryptjs');
const { User } = require('../database/models');

const userControllers = {

    getLogin: (req, res) => {
        const error = req.query.error || '';
        res.render('login', { title: 'Inicio de sesión', error, userData:{}})
    },

    getEditUser: async (req, res) => {
        const error = req.query.error || '';
        let email = req.session.user.email
        let searchedUser = await User.findOne({
            where: {
                email: email
            }
        });
        if (!searchedUser) {
            return res.send('Email inválido');
        }
        console.log(searchedUser);
        let nuevosDatos = req.body;
        res.render('editUser', { title: 'Edición de usuario', searchedUser, error: {}});
    },

    putEditUser: async (req, res) => {
        let email = req.session.user.email
        let searchedUser = await User.findOne({
            where: {
                email: email
            }
        });
        if (!searchedUser) {
            return res.send('Email inválido');
        }
        let id = searchedUser.id;
        let newData = req.body;
        console.log(searchedUser);
        console.log(newData);

        const { password: hashedPassword } = searchedUser;
        const isCorrect = compareSync(newData.passRegForm, hashedPassword);

        if(isCorrect){
            newData.passRegForm = hashSync(newData.passRegForm, 12);
            newData.checkPassRegForm = searchedUser.checkPassRegForm;
            newData.tyc === "on" ? newData.tyc = true : newData.tyc = false;
            newData.notificaciones === "on" ? newData.notificaciones = true : newData.notificaciones = false;
            newData.tipoUsuario === "Espectador/a" ? newData.tipoUsuario = 1 : newData.tipoUsuario = 2;
        } else {
            return res.redirect('/users/editUser?error=La contraseña no coincide');
        }
        const { nombreRegForm, apellidoRegForm, emailRegForm, tipoUsuario, passRegForm, checkPassRegForm, notificaciones, tyc } = newData
        User.update(
            {
                first_name: nombreRegForm,
                last_name: apellidoRegForm,
                email: emailRegForm,
                user_type_id: tipoUsuario,
                password: passRegForm,
                check_password: checkPassRegForm,
                notifications: notificaciones,
                terms_condition: tyc},
            {
                where: {
                    id: id
                }
            });
        res.redirect('/');
    },

    getRegister: (req, res) =>{
        res.render('register', { title: 'Registro', oldData: {}, errors: {} });
    }, 
    postRegister: async (req, res) => {
        // Primero se estableció una validación específica del campo email para evitar que un usuario se registre dos veces. Se pregunta si el mail que el usuario ingresó en el formulario de registro ya está en la base de datos o no. En caso de que esté, se corta la ejecución y se renderiza la vista 'register' con el errors que dentro tiene errorMail y dentro msg: 'Ya estás registrado'. Luego desde la vista se le agrega la frase 'Por favor inicie sesión aquí', en la que 'aquí' es un href al formulario de login.
        const searchedUser = await User.findOne({
            where: {
                email: req.body.emailRegForm,
            }
        });
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
            // Si no hay errores en las validaciones, entonces se hashea la contraseña del usuario con hashSync. Luego se crea la variable check que compara "Confirmar contraseña" con la contraseña hasheada. Y se almacena la información del body en la variable newUser.
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
                // Si las contraseñas coinciden, se hashea "Confirmar contraseña", se le asigna booleanos a "notificaciones" y a "tyc" (términos y condiciones), se pregunta por el tipo de usuario del newUser, en caso de "Espectador/a" se le asigna 1 y en caso de "Productor/a" se le asigna 2, y se redirige al login.

                newUser.checkPassRegForm = hashSync(newUser.passRegForm, 12);
                newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false;
                newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false;
                newUser.tipoUsuario === "Espectador/a" ? newUser.tipoUsuario = 1 : newUser.tipoUsuario = 2;
                console.log(newUser);
                const { nombreRegForm, apellidoRegForm, emailRegForm, tipoUsuario, passRegForm, checkPassRegForm, notificaciones, tyc } = newUser;
                try {
                    await User.create({
                        first_name: nombreRegForm,
                        last_name: apellidoRegForm,
                        email: emailRegForm,
                        user_type_id: tipoUsuario,
                        password: passRegForm,
                        check_password: checkPassRegForm,
                        notifications: notificaciones,
                        terms_condition: tyc
                    })
                } catch (error) {
                    console.log(error);
                }
                // usersModel.createOne(newUser);
                return res.redirect('/users/login');
            }
        }
    },

    postLogin: async (req, res) => {
        // Primero se busca el mail que ingresó el usuario en la base de datos para chequear que exista. Si no existe, se lo redirige a la misma vista con el error de que "El mail o la contraseña es inválido".
        const searchedUser = await User.findOne({
            raw: true,
            where: {
                email: req.body.emailLogin
            }}
        );
        
        if (!searchedUser) {
            return res.redirect('/users/login?error=El email o la contraseña es inválido');
            
        }
        // console.log(searchedUser.dataValues);
        // Se verifica que la contraseña que ingresó el usuario sea la misma almacenada en la base de datos.
        const { password: hashedPassword } = searchedUser;
        const isCorrect = compareSync(req.body.passwordLogin, hashedPassword);

        // En caso de que la contraseña sea correcta, se crea una cookie siempre y cuando el usuario clickee sobre "Mantener sesión iniciada".
        if (isCorrect) {
            //Cookie para mantener la sesión iniciada
            if (!!req.body.rememberme) {
                console.log('Cookie funcionando correctamente');
                res.cookie('email', searchedUser.email, {
                    maxAge: 1000 * 60 * 60 * 24 * 365 * 999
                });
            }
            
            
            delete searchedUser.id;
            delete searchedUser.password;
            // delete searchedUser.passRegForm;
            delete searchedUser.check_password;
            // delete searchedUser.checkPassRegForm;

            // Se asigna la información del usuario "searchedUser" a req.session.user para poder compartir la información con las distintas vistas.
            req.session.user = searchedUser;
            console.log(searchedUser);
            
            return res.redirect('/');
        } else {
            return res.redirect('/users/login?error=El email o la contraseña es invalido');
        }
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/');
        console.log('Chauuuuuuuu');
    },

    listUsers: async (req, res) => {
        try {
            User.findAll({
                raw: true
            })
                .then(users => {
                    console.log(users);
                    res.send(users)
                })
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = userControllers;