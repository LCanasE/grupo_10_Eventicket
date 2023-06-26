// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const { validationResult } = require('express-validator');
const { bcrypt, hashSync, compareSync } = require('bcryptjs');

const userControllers = {

    getLogin: (req, res) => {
        // error contiene el query string (está configurado en postLogin) que se envia en caso de que el usuario no ingrese correctamente su mail o contraseña. Para que no se genere un error a la hora de renderizar la vista del Login sin haber ingresado datos se pasa error como req.query.error o '' (vacío). Es decir que cuando se renderiza la vista por primera vez error = '' entonces no se ve en la vista y no genera error. 
        const error = req.query.error || '';

        res.render('login', { title: 'Inicio de sesión', error });
        },

    postLogin: (req, res) => {
        // searchedUser es una variable que contendrá un booleano. Cuando el usuario se loguee e ingrese un mail que esté en la base de datos searchedUser será true, si no está en la base, será false.
        const searchedUser = usersModel.findByEmail(req.body.nombreUsuario);

        // En caso de que searchedUser sea false, redirije al usuario a la misma vista (/users/login) con un query string que indica que el mail o la contraseña son incorrectos.
        if(!searchedUser) {
            return res.redirect('/users/login?error=El mail o la contraseña son incorrectos');
        }

        // Se compara si la contraseña enviada para iniciar sesión coincide con la contraseña que está en la base de datos.
            const { passRegForm: hashed } = searchedUser;
            const isCorrect = compareSync(req.body.password, hashed);

        // Si la contraseña coincide se crea una cookie llamada email que sirve para mantener la sesión iniciada.
            if(isCorrect){
                // console.log(searchedUser);
                if(!!req.body.sesionIniciada){
                    res.cookie('email', searchedUser.emailRegForm, {
                        maxAge: 1000 * 60 * 60 * 24 * 360 * 999
                    });
                }

                // Se crea la sesión de user con req.session.user que contendrá toda la información del usuario encontrado salvo su contraseña, su confirmación de contraseña y su id. Es decir, quedaría en sesión un usuario con su nombre, apellido, mail y el tipo de usuario.
                delete searchedUser.passRegForm;
                delete searchedUser.checkPassRegForm;
                delete searchedUser.id;

                req.session.user = searchedUser;
                console.log(req.session.user);
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
                return res.redirect('/');
            }
        }
    },

}
module.exports = userControllers;