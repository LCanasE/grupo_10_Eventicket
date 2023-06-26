// Rutas de productos
const express = require('express');
const path = require('path');

const productControllers = require('../controllers/productControllers');
const { uploadFile, handleMulterError } = require('../middlewares/multerMiddleware');
const productValidateMiddleware = require('../middlewares/validateProductMiddleware');
const validatorImgs = require('../middlewares/validatorImgs');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// @GET /products/:id/eventsDetails
router.get("/:id/eventsDetails", productControllers.getEventsDetails);

// @GET /products/:id/cart
router.get("/:id/cart", authMiddleware, productControllers.getCart);

// @POST /products/:id/cart
router.post("/:id/cart", productControllers.postCart);

// @GET /products/events
router.get("/events", productControllers.getEvents);

// @GET /products/createEvents
router.get("/createEvents", productControllers.getCreateEvent);

// @POST /products/createEvents
router.post("/createEvents", [uploadFile.single('img'), productValidateMiddleware.validateCreateProduct, validatorImgs], productControllers.postCreateEvent);

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