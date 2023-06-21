const { body } = require('express-validator');
const path = require('path');

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
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres').bail()
        .matches(/[a-z]/).withMessage('La contraseña debe tener una minúscula').bail()
        .matches(/[A-Z]/).withMessage('La contraseña debe tener una mayúscula').bail()
        .matches(/\d/).withMessage('La contraseña debe tener un número').bail(),
]

module.exports = validations