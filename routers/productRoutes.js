// Rutas de productos
const express = require('express');
const path = require('path');

const productControllers = require('../controllers/productControllers');
const { uploadFile, handleMulterError } = require('../middlewares/multerMiddleware');
const productValidateMiddleware = require('../middlewares/validateProductMiddleware');

const router = express.Router();

// @GET /products/:id/eventsDetails
router.get("/:id/eventsDetails", productControllers.getEventsDetails);

// @GET /products/cart
router.get("/cart", productControllers.getCart);

// @POST /products/cart
router.post("/cart", productControllers.postCart);

// @GET /products/events
router.get("/events", productControllers.getEvents);

// @GET /products/createEvents
router.get("/createEvents", productControllers.getCreateEvent);

// @POST /products/createEvents
router.post("/createEvents", [uploadFile.single('img'), handleMulterError, productValidateMiddleware.validateCreateProduct], productControllers.postCreateEvent);

// @GET /products/:id/editEvents
router.get("/:id/editEvents", productControllers.getEditEvent);

// @POST /products/editEvents
router.put("/:id/editEvents", productControllers.putEditEvent);

// @DELETE /products/:id/editEvents
router.delete('/:id/delete', productControllers.deleteEvent);

// @GET /products/adminEventsDetail
router.get("/adminEventsDetail", productControllers.getAdminEventsDetail);

// @POST /products/adminEventsDetail
router.post("/adminEventsDetail", productControllers.getAdminEventsDetail);



module.exports = router;