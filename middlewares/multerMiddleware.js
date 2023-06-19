const multer = require('multer');
const path = require('path');

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

const fileFilter = (req, file, cb) => {
    let acceptedExtensions = ['.jpg', '.jpeg', '.png'];

    if (!acceptedExtensions.includes(path.extname(file.originalname))) {
        cb(new Error(`No se permiten archivos ${path.extname(file.originalname)}. Por favor carga una imagen ${acceptedExtensions.join(', ')}`), false);
    } else {
        cb(null, true);
    }
}

const uploadFile = multer({ storage, fileFilter });

const handleMulterError = (err, req, res, next) => {
    console.log('OBJETO ERR: ' + err);
    console.log(err.message);
    if (err) {
        res.render('createEvents', { error: err.message, title: 'Crear', oldData: {}, errors: {}, imageName: {} });
    } else {
        next(err);
    }
};

module.exports.uploadFile = uploadFile;
module.exports.handleMulterError = handleMulterError;
