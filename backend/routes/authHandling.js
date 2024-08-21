const express = require("express");
const authController = require("../controllers/authController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/delete/user", authentication, authorization({ isAdmin: false }), authController.delete_user_by_username);
router.get("/users", authentication, authController.get_users);

module.exports = router;
