// Rutas de usuarios
const express = require('express');
const userControllers = require('../controllers/userControllers');

const router = express.Router();


router.get("/login", userControllers.getLogin);

router.get("/registro", userControllers.getRegistro);

module.exports = router;