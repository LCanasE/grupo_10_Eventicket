// Rutas de usuarios
const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

// @GET /users/login
router.get("/login", userControllers.getLogin);

// @GET /users/register
router.get("/register", userControllers.getRegister);

// @POST/users/register
router.post("/register", userControllers.postRegister);


module.exports = router;