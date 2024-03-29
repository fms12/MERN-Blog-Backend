const express = require("express");
const { verifyToken } = require("../../utils/verifyUser");
const { createComment, getCommentsByPostId } = require("../../controllers/comment.controller");
const router = express.Router();

router.post("/create", verifyToken, createComment);

module.exports = router;
