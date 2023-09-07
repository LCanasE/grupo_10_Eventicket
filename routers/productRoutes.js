// Rutas de productos
const express = require("express");
const path = require("path");

const productControllers = require("../controllers/productControllers");
const {
  uploadFile,
  handleMulterError,
} = require("../middlewares/multerMiddleware");
const productValidateMiddleware = require("../middlewares/validateProductMiddleware");
const validatorImgs = require("../middlewares/validatorImgs");
const authMiddleware = require("../middlewares/authMiddleware");
const categoryUser = require("../middlewares/categoryUserMiddleware");

const router = express.Router();

// @GET /products/:id/eventsDetails
router.get("/:id/eventsDetails", productControllers.getEventsDetails);

// @GET /products/cart
router.get("/cart", authMiddleware, productControllers.getCart);

// @POST /products/cart
router.post("/cart", productControllers.postCart);

// @PUT /products/cart
router.put("/cart", productControllers.putCart);

// @DELETE /products/cart/:id
router.delete("/cart/:id", productControllers.deleteOneFromCart);

// @DELETE /products/cart
router.delete("/cart", productControllers.deleteCart);

// @GET /products/events
router.get("/events", productControllers.getEvents);

// @GET /products/myEvents
router.get(
  "/myEvents",
  authMiddleware,
  categoryUser,
  productControllers.getBeProducer
);

// @GET /products/beProducer
router.get(
  "/beProducer",
  authMiddleware,
  categoryUser,
  productControllers.getBeProducer
);

// @GET /products/createEvents
router.get(
  "/createEvents",
  authMiddleware,
  categoryUser,
  productControllers.getCreateEvent
);

// @POST /products/createEvents
router.post(
  "/createEvents",
  [
    uploadFile.single("img"),
    productValidateMiddleware.validateCreateProduct,
    validatorImgs,
  ],
  productControllers.postCreateEvent
);

// @GET /products/:id/editEvents
router.get("/:id/editEvents", productControllers.getEditEvent);

// @POST /products/editEvents
router.put(
  "/:id/editEvents",
  uploadFile.single("img"),
  productControllers.putEditEvent
);

// @DELETE /products/:id/editEvents
router.delete("/:id/delete", productControllers.deleteEvent);

// @GET /products/adminEventsDetail
router.get("/adminEventsDetail", productControllers.getAdminEventsDetail);

// @POST /products/adminEventsDetail
router.post("/adminEventsDetail", productControllers.getAdminEventsDetail);

module.exports = router;
