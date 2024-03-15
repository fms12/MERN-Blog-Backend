const CommentRepository = require("../repository/comment.repository");
const PostService = require("../service/post.service");

const commentRepository = new CommentRepository();
const postService = new PostService();

const createComment = async (req, res, next) => {
  try {
    const user = req.user;
    const { comment } = req.body;
    const { slug } = req.params;
    const post = await postService.fetchAllPostsBySlug(slug);
    const postId = post[0].id;
    const response = await commentRepository.create(comment, user.id, postId);
    return res.status(201).json({
      success: true,
      message: "Successfully created new comment",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};

const getCommentsByPostId = async (req, res, next) => {
  try {
    const { slug } = req.params; // Adjust this based on how you're passing the post ID or slug
    const post = await postService.fetchAllPostsBySlug(slug);
    const postId = post[0].id;
    const comments = await commentRepository.fetchCommentsByPostId(postId);
    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
};
