const { body } = require('express-validator');
const path = require('path');

const validations = { 
    validateCreateProduct: [
        body('nombre')
            .notEmpty().withMessage('El evento debe tener un nombre'),
        body('fecha')
            .notEmpty().withMessage('El evento debe tener una fecha'),
        body('ubicacion')
            .notEmpty().withMessage('El evento debe tener un lugar'),
        body('direccion')
            .notEmpty().withMessage('El lugar debe tener una dirección'),
        body('tipoEntrada')
            .notEmpty().withMessage('Obligatorio'),
        body('precio')
            .notEmpty().withMessage('Obligatorio')
            .isNumeric().withMessage('El precio debe ser un número'),
        body('cantidadEntradas')
            .notEmpty().withMessage('Obligatorio')
            .isNumeric().withMessage('El precio debe ser un número'),
        body('categoria')
            .notEmpty().withMessage('Seleccione una categoría'),
    ]
}

    module.exports = validations;
