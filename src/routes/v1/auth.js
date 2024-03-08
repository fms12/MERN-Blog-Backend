const express = require("express");
const router = express.Router();
const { login, signup, logout, resetPassword } = require("../../controllers/auth.controller");
const { verifyToken } = require("../../utils/verifyUser");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout",logout);
router.post("/", verifyToken ,resetPassword)
module.exports = router;
