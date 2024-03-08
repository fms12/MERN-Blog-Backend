const express = require("express");
const router = express.Router();
const {
  fetchUserById,
  currentUser,
  userProfileUpdate,
  getProfile,
} = require("../../controllers/user.controller");
const { verifyToken } = require("../../utils/verifyUser");


router.get("/own", verifyToken, fetchUserById);
router.put("/update", verifyToken, userProfileUpdate);
module.exports = router;
