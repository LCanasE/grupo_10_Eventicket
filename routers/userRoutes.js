// Rutas de usuarios
const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();

// @GET /users/login
router.get("/login", userControllers.getLogin);

// @GET /users/register
router.get("/register", userControllers.getRegister);

module.exports = router;