const express = require('express');
const apiControllers = require('../../controllers/api/apiMainControllers');

const router = express.Router();

// @GET - /api/products
router.get('/products', apiControllers.getAll)

module.exports = router;