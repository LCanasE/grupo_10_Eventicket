const { body } = require('express-validator');
const path = require('path');

const validations = [
    body('nombre')
        .notEmpty().withMessage('El evento debe tener un título'),
    body('fecha')
        .notEmpty().withMessage('El evento debe tener una fecha'),
    body('ubicacion')
        .notEmpty().withMessage('El evento debe tener una ubicación'),
    body('direccion')
        .notEmpty().withMessage('El evento debe tener una dirección'),
    body('tipoEntrada')
        .notEmpty().withMessage('Obligatorio'),
    body('precio')
        .notEmpty().withMessage('Obligatorio')
        .isNumeric().withMessage('Tiene que ser un número'),
    body('cantidadEntradas')
        .notEmpty().withMessage('Obligatorio')
        .isNumeric().withMessage('Tiene que ser un número'),
    body('categoria')
        .notEmpty().withMessage('El evento debe tener una categoria'),
    body('img')
]

module.exports = validations;