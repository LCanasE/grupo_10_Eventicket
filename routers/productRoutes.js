// Rutas de productos
const express = require('express');
const multer = require('multer');
const path = require('path');

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

// @GET /products/createEvents
router.get("/createEvents", productControllers.getCreateEvent);

// @GET /products/:id/editEvents
router.get("/:id/editEvents", productControllers.getEditEvent);

// @POST /products/editEvents
router.post("/:id/editEvents", productControllers.getEditEvent);

// @GET /products/adminEventsDetail
router.get("/adminEventsDetail", productControllers.getAdminEventsDetail);

// @POST /products/adminEventsDetail
router.post("/adminEventsDetail", productControllers.getAdminEventsDetail);



module.exports = router;