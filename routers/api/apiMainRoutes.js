const express = require("express");

const apiMainControllers = require("../../controllers/api/apiMainControllers");

const router = express.Router();

// @GET /api/products
router.get('/products', apiMainControllers.getAll)

module.exports = router;
