// Rutas de productos
const express = require('express');
const productControllers = require('../controllers/productControllers');
const multer = require('multer');

const router = express.Router();

// @GET /products/:id/eventsDetails
router.get("/:id/eventsDetails", productControllers.getEventsDetails);

// @GET /products/cart
router.get("/cart", productControllers.getCart);

// @POST /products/cart
router.post("/cart", productControllers.getCart);

// @GET /products/events
router.get("/events", productControllers.getEvents);

// @GET /products/creacionEventos
router.get("/creacionEventos", productControllers.getCrearEvento);

// @GET /products/:id/edicionEventos
router.get("/:id/edicionEventos", productControllers.getEditarEvento);

// @POST /products/edicionEventos
router.post("/:id/edicionEventos", productControllers.getEditarEvento);

// @GET /products/detalleEventos
router.get("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);

// @POST /products/detalleEventosAdmin
router.post("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);



module.exports = router;