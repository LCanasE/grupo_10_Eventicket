const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

// Este es un middleware específico para validar las imágenes cargadas. Surge a raíz de que en la ruta POST de 'createEvents', Multer es el primer validador. Esto implica que SIEMPRE se van a cargar los archivos de Multer y luego se van a realizar las validaciones, por lo que los archivos se cargarán independientemente de si pasan o no las validaciones. En caso no pasarlas, tendríamos imágenes guardadas en nuestra aplicación que no nos servirían y luego cuando enviemos a la vista los errores de validación, el usuario cargaría nuevamente las imágenes, esta vez bien, y nos quedarían dos imágenes guardadas: una que se puede usar y otra que no. 

// ¿Por qué Multer es el primer validador? Si con Multer SIEMPRE se van a cargar las imágenes independientemente de que estén bien o mal, ¿por qué no validamos primero que estén bien las imágenes y luego las cargamos con Multer?, es decir, ¿por qué no lo ponemos al fondo y se soluciona todo más fácil? 
// Multer NO va al final porque nuestro form tiene la propiedad "enctype='multipart/form-data'", para manejar la carga de archivos, y enctype no nos permite ver lo que viaja por el body a menos que se ejecute Multer, por esa razón primero va Multer. ¿Cuál es la consecuencia de no poder ver lo que viaja por el body? Básicamente la consecuencia es que podemos enviar el formulario completando todos los campos e igualmente nos va a dar error porque el body viaja vacío, es decir, es como si no lo hubiéramos completado. 
// Para más información: https://stackoverflow.com/questions/63632356/multer-and-express-validator-creating-problem-in-validation

// Después de esta explicación, AHORA SÍ, analicemos el código:

const validatorImgs = (req, res, next) => {
    try {
        // Lo primero que se hace dentro del bloque "try" es preguntar si se envió una imagen: ¿req.file = true?. Si efectivamente se envió una imagen, se arma la ruta de la imagen dependiendo del valor que haya en req.body.categoria, es decir, la categoría que eligió el usuario.
        if(req.file){
            let imageRoute = '..public/img/events/';
            
            switch(req.body.categoria){
                case 'Recitales':
                    imageRoute += 'recitales';
                    break;
                case 'Deportes':
                    imageRoute += 'deportes';
                    break;
                case 'Stand Up':
                    imageRoute += 'standUp';
                    break;
                case 'Obras de teatro':
                    imageRoute += 'obraTeatro';
                    break;
                case 'Conferencias':
                    imageRoute += 'conferencias';
                    break;
                default:
                    imageRoute = '../img/events';
                    break;
            }

            // Se agrega al req.body la propiedad img con la ruta correspondiente de la imagen.
            req.body.img = `${imageRoute}/${req.file.filename}`;
        } else {
            // En caso de que req.body.img no exista, se renderiza la vista 'createEvents' y se envian varias cosas, la principal función es que se envíe el objeto errorImg con la propiedad msg: 'No puede estar vacío' para avisarle al usuario que no se puede enviar el formulario sin imágenes. 
            if(!req.body.img){
                return res.render('createEvents', {
                    oldData: req.body,
                    errors: validationResult(req).mapped(),
                    errorImg: {
                        msg: 'No puede estar vacío'
                    },
                    errorInput: {},
                    title: 'Crear',
                    imageName: {},
                    errorExtensionImagen: {}
                })
            }
        }

        // En caso de que hayan errores en los demás campos, se "arrojan" los errores con throw();
        validationResult(req).throw();

        next();
    } catch(errors) {
        // catch captura los errores arrojados por throw() (es como si capturara validationResult(req).errors) para trabajar con ellos.
        if(req.file) {
            // catch ya tiene errores capturados, entonces se pregunta si existe req.file. En caso de que exista, es decir, se cargó una imagen y ADEMÁS hay errores en otros campos que son los que catch tiene capturados, se utiliza fs.unlink para eliminar la imagen cargada.
            fs.unlink(req.file.path, (err) => {
                if(err){
                    console.log('Se detectaron errores a la hora de borrarr el archivo');
                }
                console.log(`Archivo eliminado con éxito: ${req.file.path}`);
            })
        };

        // Finalmente, una vez eliminada la imagen cargada, se renderiza la vista nuevamente y se le avisa al usuario que no puede cargar una imagen y tener campos incompletos. Se envía el objeto erroInput que contiene el msg: 'Debes completar todos los campos antes de enviar la imagen'.
        res.render('createEvents', {
            errors: validationResult(req).mapped(),
            oldData: req.body,
            errorImg: {},
            errorInput: {
                msg: 'Debes completar todos los campos antes de enviar una imagen'
            },
            title: 'Crear',
            errorExtensionImagen: {},
        });
    }
};

module.exports = validatorImgs;