const express = require("express");

const apiMainControllers = require('../../controllers/api/apiMainControllers');
const apiProductsControllers = require('../../controllers/api/apiProductsControllers');

const router = express.Router();

// @GET /api/products
router.get('/products', apiMainControllers.getAll);

// @GET /api/products/:id
router.get('/products/:id', apiProductsControllers.getOne);

module.exports = router;
