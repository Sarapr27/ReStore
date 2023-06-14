const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Ruta POST para crear un nuevo usuario
router.post("/", userController.createUser);

module.exports = router;
