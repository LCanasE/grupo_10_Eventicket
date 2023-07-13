// Rutas de páginas principales
const express = require('express');

const mainControllers = require('../controllers/mainControllers');

const router = express.Router();


// @GET / --> Home
router.get("/", mainControllers.getIndex);

// @GET / --> Home
router.get("/search/:from", mainControllers.search);

module.exports = router