// Rutas de productos
const express = require('express');
const productControllers = require('../controllers/productControllers');

const router = express.Router();


router.get("/detalleEventos", productControllers.getDetalleEventos);

router.get("/carrito", productControllers.getCarrito);

router.get("/eventos", productControllers.getEventos);

module.exports = router;