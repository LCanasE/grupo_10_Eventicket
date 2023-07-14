const { body } = require('express-validator');
const path = require('path');
const userControllers = require('../controllers/userControllers');
const usersModel = require ('../models/usersModel');

const validations = [
    
    body('nombreRegForm')
        .notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellidoRegForm')
        .notEmpty().withMessage('El apellido no puede estar vacío'),
    body('emailRegForm')
        .notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Ingrese un email válido'),
    body('tipoUsuario')
        .notEmpty().withMessage('Por favor seleccione el tipo de usuario'),
    body('passRegForm')
        .isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número'),
]

module.exports = validations