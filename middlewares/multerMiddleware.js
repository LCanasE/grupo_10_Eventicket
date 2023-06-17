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
})

const uploadFile = multer({ storage });

module.exports = uploadFile;