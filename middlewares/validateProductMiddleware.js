const { body } = require('express-validator');
const path = require('path');
const moment = require('moment');

const validations = { 
    validateCreateProduct: [
        body('nombre')
            .notEmpty().withMessage('El evento debe tener un nombre'),
        body('fecha')
            .notEmpty().withMessage('El evento debe tener una fecha').bail()
            .custom((value) => {
                // Comprueba si la fecha es mayor que la fecha actual
                if (moment(value).isAfter(moment())) {
                return true;
                } else {
                throw new Error('La fecha debe ser mayor que la fecha actual');
                }
            }),
        body('ubicacion')
            .notEmpty().withMessage('El evento debe tener un lugar'),
        body('direccion')
            .notEmpty().withMessage('El lugar debe tener una dirección'),
        body('description')
            .notEmpty().withMessage('El evento debe tener una descripción'),
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
