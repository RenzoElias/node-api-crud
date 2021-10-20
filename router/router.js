// URLs
const { Router } = require("express");
const router = Router();

// Controller - resp // 2 Maneras
// const { getUsers, createUser, getUserById, deleteUser, updateUser } = require('../app/controllers/index.controller')
const UserController = require("./../app/controllers/UserController");

// =========================================
// GET
// router.get("/users", UserController.getUsers); // resp ,req
// router.get("/users/:id", UserController.getUserById); // Filter by Id

// =========================================
// POST
router.post("/v1/login", UserController.login);
router.post("/v1/status/codEmail", UserController.statusCodEmail);
router.post("/v1/registerAccount", UserController.registerAccount);
router.post("/v1/deleteAccount", UserController.deleteAccount);
router.post("/v1/listPermisos", UserController.listPermisos);
router.post("/v1/logout", UserController.logout);

router.post("/v1/getAccounts", UserController.getAccountsLogin);
// router.post("/login", UserController.login);
// router.get("/login/:id", UserController.userLogin);
// router.get("/users", UserController.getUsersLogin);
// =========================================

// PUT
// router.put('/users/:id', updateUser)

// DELETE
// router.delete('/users/:id', deleteUser)

module.exports = router;

// console.log(new Date().toISOString());
