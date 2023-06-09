// Rutas de usuarios
const express = require('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
const validations = require('../middlewares/validateRegisterMiddleware')

// @GET /users/login
router.get("/login", userControllers.getLogin);

// @POST / users/login
router.post("/login", userControllers.postLogin);

// @GET /users/register
router.get("/register", userControllers.getRegister);

// @POST/users/register
router.post("/register", validations, userControllers.postRegister);

// @GET /users/editUser
router.get("/editUser", userControllers.getEditUser);



module.exports = router;