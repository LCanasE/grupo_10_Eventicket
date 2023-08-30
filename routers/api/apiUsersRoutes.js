const express = require("express");

const apiUsersControllers = require("../../controllers/api/apiUsersControllers");

const router = express.Router();

// @GET /api/users
router.get("/users", apiUsersControllers.getAllUsers);

router.get("/users/:id", apiUsersControllers.getOne);

module.exports = router;
