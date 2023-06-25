// Controlador de usuarios
const path = require('path');
const usersModel = require('../models/usersModel');
const bcrypt = require ('bcrypt');

const {validationResult} = require('express-validator');
const { isContext } = require('vm');

const userControllers = {

    getLogin: (req, res) =>{
        const error = req.query.error || '';

        res.render('login', { title: 'Inicio de sesión', error })},

    getEditUser: (req, res) =>
        res.render('editUser', { title: 'Edición de usuario' }),

    getRegister: (req, res) =>
        res.render('register', { title: 'Registro', errors: [], oldData: {} }),

    postRegister: (req, res) => {
        
        let newUser = req.body;
        
        //Hasheo de contraseña
        const newPassword = bcrypt.hashSync(newUser.passRegForm, 12);    
        newUser.passRegForm = newPassword;
        
        //Hasheo de Confirmar Contraseña
        const newCheckPassword = bcrypt.hashSync(newUser.checkPassRegForm, 12);   
        newUser.checkPassRegForm = newCheckPassword;
        
        
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register',{
                errors: resultValidation.errors,
                oldData: req.body,
                title: 'Crear'
            });
        }
        
        newUser.notificaciones === "on" ? newUser.notificaciones = true : newUser.notificaciones = false
        newUser.tyc === "on" ? newUser.tyc = true : newUser.tyc = false

        // usersModel.createOne(newUser);

        res.redirect('/users/login',);
    },

        // El POST para hacer el logeo validando la contraseña hasheado y si existe el usuario buscado.
        //Aun tengo que checkear del porque dejó de funcionar.
    postLogin: (req,res) => {
        const searchedUser = usersModel.findByEmail(req.body.emailLogin);
     
        if (!searchedUser) {
            console.log(searchedUser);
            return res.redirect('/users/login');
            
        }
            const {passRegForm: hashedPassword} = searchedUser;
            const isCorrect = bcrypt.compareSync(req.body.passRegForm, hashedPassword);

           if (isCorrect) {
            res.send('Acaba de iniciar sesion');
           } else {
            return res.redirect('/users/login?error=El email o la contraseña es invalido');
           }
        
    }

}

module.exports = userControllers; 