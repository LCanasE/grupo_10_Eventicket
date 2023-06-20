// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const bcrypt = require ('bcrypt');

const {validationResult} = require('express-validator');

const userControllers = {

    getLogin: (req, res) =>
        res.render('login', { title: 'Inicio de sesión' }),

    getEditUser: (req, res) =>
        res.render('editUser', { title: 'Edición de usuario' }),

    getRegister: (req, res) =>
        res.render('register', { title: 'Registro' }),

    postRegister: (req, res) => {
        
        let newUser = req.body;
        //const user = {...req.body};
        

        //Hasheo de contraseña
        const newPassword = bcrypt.hashSync(newUser.passRegForm, 12);    
        newUser.passRegForm = newPassword;
        
        //Hasheo de Confirmar Contraseña
        const newCheckPassword = bcrypt.hashSync(newUser.checkPassRegForm, 12);   
        newUser.checkPassRegForm = newCheckPassword;
        
        
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register',{
                errors: resultValidation.mapped(),
                oldData: req.body
            })

        }
        
        newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false
        newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false

        usersModel.createOne(newUser);

        res.redirect('/users/login',);
    },

}

module.exports = userControllers;