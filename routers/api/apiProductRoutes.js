const express = require('express');

// CONTROLLERS
const apiProductController = require('../../controllers/api/apiProductController');

// MIDDLEWARES
const authMiddleware = require('../../middlewares/authMiddleware');;

const router = express.Router();

// @GET /api/products/:id/eventDetails
router.get('/:id/eventDetails', apiProductController.getEventDetail);

// @GET /api/products/cart
router.get("/cart", authMiddleware, apiProductController.getCart);

module.exports = router;
