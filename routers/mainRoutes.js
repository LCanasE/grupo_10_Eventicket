// Rutas de páginas principales
const express = require('express');

const mainControllers = require('../controllers/mainControllers');

const router = express.Router();


// @GET /   --> Home
router.get("/", mainControllers.getIndex);

// @GET /   --> Home
router.get("/prueba", mainControllers.pruebaCrud);

module.exports = router