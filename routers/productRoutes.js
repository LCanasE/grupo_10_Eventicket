// Rutas de productos
const express = require('express');
const productControllers = require('../controllers/productControllers');
const multer = require('multer');

const router = express.Router();

// @GET /products/:id/detalleEventos
router.get("/:id/detalleEventos", productControllers.getDetalleEventos);

// @GET /products/carrito
router.get("/carrito", productControllers.getCarrito);

// @GET /products/eventos
router.get("/eventos", productControllers.getEventos);

// @GET /products/creacionEventos
router.get("/creacionEventos", productControllers.getCrearEvento);

// @GET /products/edicionEventos
router.get("/edicionEventos", productControllers.getEditarEvento);

// @POST /products/edicionEventos
router.post("/edicionEventos", productControllers.getEditarEvento);

// @GET /products/detalleEventos
router.get("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);

// @POST /products/detalleEventosAdmin
router.post("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);

module.exports = router;