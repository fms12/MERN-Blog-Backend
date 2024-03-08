const Comment = require("../models/Comments");

class CommentRepository {
  async create(body, userId, postId) {
    try {
      const response = await Comment({
        content: body,
        user: userId,
        post: postId,
      });
      const comment = response.save();
      return comment;
    } catch (error) {
      throw { error };
    }
  }

  async fetchCommentsByPostId(postId) {
    try {
      const comments = await Comment.find({ post: postId })
        .populate("user", "-email -password")
        .exec();
      return comments;
    } catch (error) {
      throw { error };
    }
  }
}

module.exports = CommentRepository;
