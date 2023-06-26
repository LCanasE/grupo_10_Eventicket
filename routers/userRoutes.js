// Rutas de usuarios
const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');

// @GET /users/login
router.get("/login", guestMiddleware, userControllers.getLogin);

// @POST /post/login
router.post("/login", userControllers.postLogin);

// @GET /users/register
router.get("/register", guestMiddleware, userControllers.getRegister);

// @POST/users/register
router.post("/register", validations, userControllers.postRegister);

// @GET /users/editUser
router.get("/editUser", userControllers.getEditUser);



module.exports = router;