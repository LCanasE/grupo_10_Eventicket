// Rutas de productos
const express = require('express');
const multer = require('multer');
const path = require('path');

const productControllers = require('../controllers/productControllers');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, path.join(__dirname, '../public/img'));
    },
    filename: function(req, file, cb){
        let fileName = `img-${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName);
    }
});

const upload = multer({ storage });


// @GET /products/:id/detalleEventos
router.get("/:id/detalleEventos", productControllers.getDetalleEventos);

// @DELETE /products/:id/detalleEventos
router.delete("/:id/detalleEventos", productControllers.deleteEvento);

// @GET /products/:id/carrito
router.get("/:id/carrito", productControllers.getCarrito);

// @GET /products/eventos
router.get("/eventos", productControllers.getEventos);

// @GET /products/creacionEventos
router.get("/creacionEventos", productControllers.getCrearEvento);

// @POST /products/creacionEventos
router.post("/creacionEventos", upload.single('img'), productControllers.postCrearEvento);

// @GET /products/:id/edicionEventos
router.get("/:id/edicionEventos", productControllers.getEditarEvento);

// @PUT /products/:id/edicionEventos
router.put("/:id/edicionEventos", productControllers.putEditarEvento);

// @GET /products/detalleEventosAdmin
router.get("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);

// @DELETE /products/detalleEventosAdmin
// router.delete("/detalleEventosAdmin", productControllers.deleteDetalleEventoAdmin);

// @POST /products/detalleEventosAdmin
// router.post("/detalleEventosAdmin", productControllers.postDetalleEventoAdmin);

module.exports = router;