const {body} = require('express-validator');
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
        .isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres')
        .custom(value => {
            if (!value.match(/^(?=.*[A-Z])/)) {
              throw new Error('La contraseña debe contener al menos una letra mayúscula');
            }
                return true})
        // .has().number().withMessage('La contraseña debe tener al menos un número'),
    // body('checkPassRegForm')
    //     Validar que la contraseña sea igual a la ingresada en 'passRegForm',
    // body('notificaciones')
    //     ,

]

module.exports = validations