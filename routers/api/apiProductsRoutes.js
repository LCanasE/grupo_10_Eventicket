const express = require('express');

const apiProductsController = require('../../controllers/api/apiProductsControllers');

const router = express.Router();

// GET /api/product/:id
router.get('/product/:id', apiProductsController.getOne)

module.exports = router;