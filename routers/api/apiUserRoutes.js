const express = require('express');

// CONTROLLERS
const apiUserControllers = require('../../controllers/api/apiUserControllers');

const router = express.Router();

// @GET /api/users
router.get('/users', apiUserControllers.getAll);

// @GET /api/users/:id
router.get('/users/:id', apiUserControllers.getOneUser);

module.exports = router;
