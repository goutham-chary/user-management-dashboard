const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  createUserValidators,
  updateUserValidators,
} = require("../validators/userValidator");
const validate = require("../middleware/validate");

// GET /api/users
router.get("/", userController.getAllUsers);

// GET /api/users/:id
router.get("/:id", userController.getUserById);

// POST /api/users
router.post("/", createUserValidators, validate, userController.createUser);

// PUT /api/users/:id
router.put("/:id", updateUserValidators, validate, userController.updateUser);

// DELETE /api/users/:id
router.delete("/:id", userController.deleteUser);

module.exports = router;
