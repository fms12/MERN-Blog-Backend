const CommentRepository = require("../repository/comment.repository");
const PostService = require("../service/post.service");

const commentRepository = new CommentRepository();
const postService = new PostService();

const createComment = async (req, res, next) => {
  try {
    const user = req.user; // Use req.user to get the logged-in user
    // if (!user) {
    //   return next(errorHandler(403, "You are not allowed to comment"));
    // }
    
    const { comment } = req.body; // Get the comment body from req.body
    // if (!body) {
    //   return next(errorHandler(400, "Comment body is required"));
    // }

    const { slug } = req.params; 
   const post = await postService.fetchAllPostsBySlug(slug);
    // if (!post) {
    //   return next(errorHandler(404, "Post not found"));
    // }
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
    const postId = post[0].id
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
  getCommentsByPostId
};
