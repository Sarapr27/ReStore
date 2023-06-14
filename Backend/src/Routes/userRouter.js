const express = require("express");
const router = express.Router();
const userController = require("../handlers/userHandler");

// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUserHandler);

module.exports = router;
