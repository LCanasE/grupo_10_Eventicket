const multer = require('multer');
const path = require('path');

// Storage guarda las imagenes dependiendo de la categoría que se le asigne al evento al mismo tiempo que le otorga un nombre nuevo a las imagenes img_${Date.now()}${path.extname(file.originalname)}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        let destinationFolder = './public/img/events/';

        switch(req.body.categoria){
            case 'Recitales':
                destinationFolder += 'recitales';
                break;
            case 'Deportes':
                destinationFolder += 'deportes';
                break;
            case 'Stand Up':
                destinationFolder += 'standUp';
                break;
            case 'Obra de teatro':
                destinationFolder += 'obraTeatro';
                break;
            case 'Conferencia':
                destinationFolder += 'conferencias';
                break;
            default:
                break;
        }

        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        let fileName = `img_${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
});


// fileFilter se utiliza para validar si el archivo cargado tiene una de las extensiones permitidas, en caso de que no tenga se envia un mensaje `No se permiten archivos ${path.extname(file.originalname)}. Por favor carga una imagen ${acceptedExtensions.join(', ')}`
const fileFilter = (req, file, cb) => {
    let acceptedExtensions = ['.jpg', '.jpeg', '.png'];

    if (!acceptedExtensions.includes(path.extname(file.originalname))) {
        cb(new Error(`No se permiten archivos ${path.extname(file.originalname)}. Por favor carga una imagen ${acceptedExtensions.join(', ')}`), false);
    } else {
        cb(null, true);
    }
}

const uploadFile = multer({ storage, fileFilter });

// handleMulterError captura el error que dio fileFilter y lo envia a la vista 'createEvents'. El mensaje esta capturado en err.
const handleMulterError = (err, req, res, next) => {
    if (err) {
        req.errorImagen = err.message; //Esto permite que el mensaje de error esté disponible en la solicitud para su uso posterior.
        res.locals.errorImagen = err.message; // Esto hace que el mensaje de error esté disponible en el objeto locals de la respuesta que sirve para pasarlo a las vistas.
        res.render('createEvents', { 
            title: 'Crear',
            oldData: req.body,
            errors: {},
            imageName: {} });
    } else {
        next(err);
    }
};

module.exports.uploadFile = uploadFile;
module.exports.handleMulterError = handleMulterError;
