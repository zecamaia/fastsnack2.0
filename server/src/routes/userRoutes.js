const express = require('express');
const UserController = require('../controllers/UserController');
const loginRequired = require("../middlewares/loginRequired");
const router = express.Router();

router.post("/", UserController.createUser);
router.get("/", loginRequired, UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser)
router.delete("/:id", UserController.deleteUser)

module.exports = router;