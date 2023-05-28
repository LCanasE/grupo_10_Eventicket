// Rutas de productos
const express = require('express');
const productControllers = require('../controllers/productControllers');

const router = express.Router();


router.get("/:id/detalleEventos", productControllers.getDetalleEventos);

router.get("/carrito", productControllers.getCarrito);

router.get("/eventos", productControllers.getEventos);

router.get("/creacionEventos", productControllers.getCrearEvento);

router.get("/edicionEventos", productControllers.getEditarEvento);
router.post("/edicionEventos", productControllers.getEditarEvento);

router.get("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);
router.post("/detalleEventosAdmin", productControllers.getDetalleEventoAdmin);

module.exports = router;