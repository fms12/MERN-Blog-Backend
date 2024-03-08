const express = require("express");
const v1PostRoutes = require("./v1/post");
const v1UserRoutes = require("./v1/user");
const v1AuthRoutes = require("./v1/auth");
const v1CommentRoutes = require("./v1/comment");
const router = express.Router();

router.use("/v1/post", v1PostRoutes);
router.use("/v1/users",v1UserRoutes);
router.use("/v1/auth",v1AuthRoutes);
router.use("/v1/comment", v1CommentRoutes);


module.exports = router;
