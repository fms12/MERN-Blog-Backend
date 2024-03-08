const express = require("express");
const router = express.Router();
const {
  create,
  getAllPost,
  getPostBySlug,
  udpatePost,
  deletePost,
} = require("../../controllers/post.controller");
const { verifyToken } = require("../../utils/verifyUser");
const {
  getCommentsByPostId,
  createComment,
} = require("../../controllers/comment.controller");

router.post("/create", verifyToken, create);
router.get("/getPosts", getAllPost);
router.get("/:slug", getPostBySlug);
router.get("/:slug/comments", getCommentsByPostId);
router.post("/:slug/comments", verifyToken, createComment);
router.put("/edit/:slug", verifyToken, udpatePost);
router.delete("/:slug", verifyToken, deletePost);
router.get("/:username",verifyToken)
module.exports = router;
