const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Signup page
router.get("/signup", authController.getSignupPage);
router.post("/signup", authController.signup);

// Login page
router.get("/login", authController.getLoginPage);
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
