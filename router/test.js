// URLs
const { Router } = require("express");
const router = Router();

// Controller - resp // 2 Maneras
// const { getUsers, createUser, getUserById, deleteUser, updateUser } = require('../app/controllers/index.controller')
const UserController = require("../app/controllers/testController");

// =========================================
// GET
router.get("/users", UserController.getUsers); // resp ,req
router.get("/users/:id", UserController.getUserById); // Filter by Id

// =========================================
// POST
router.post("/users", UserController.createUser);
router.post("/login", UserController.login);
// =========================================

// PUT
// router.put('/users/:id', updateUser)

// DELETE
// router.delete('/users/:id', deleteUser)

// module.exports = router;
