const Post = require("../models/Post");
const { NotFoundError } = require("../utils/error");

class PostRepository {
  async create(data, userId, slug) {
    try {
      const response = await Post({ ...data, user: userId, slug });
      const post = response.save();
      return post;
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }

  async getAllPosts(sort, order, page, limit) {
    try {
      let query = Post.find({}).populate("user", "-email -password");
      if (sort && order) {
        query = query.sort({ [sort]: order });
      }

      if (page && limit) {
        const pageSize = limit;
        const page = page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
      }
      const totalDocs = await Post.countDocuments().exec();
      const now = new Date();
      const onMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: onMonthAgo },
      });
      const posts = await query.exec();
      return { posts, totalDocs, lastMonthPosts };
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }

  async fetchPostBySlug(slug) {
    try {
      const post = await Post.find({ slug: { $in: slug } }).populate(
        "user",
        "-email -password "
      );
      if (!post) throw new NotFoundError("Article");
      return post;
    } catch (error) {
      throw { error };
    }
  }
  async fetchPostByUser(userId) {
    try {
      const post = await Post.find({ user: userId });
      return post;
    } catch (error) {
      throw { error };
    }
  }
  async fetchPostByCategory(category) {
    try {
      const post = await Post.find({ category: { $in: category } });
      return post;
    } catch (error) {
      throw { error };
    }
  }

  async deletePost(postId) {
    try {
      await Post.findByIdAndDelete(postId);
      return true;
    } catch (error) {
      throw error;
    }
  }
  async updatePost(data, slug, newSlug) {
    try {
      const { title, image, category, content } = data;
      const updatedPost = await Post.findOneAndUpdate(
        { slug: { $in: slug } },
        {
          $set: {
            title: title,
            content: content,
            category: category,
            image: image,
            slug: newSlug,
          },
        },
        { new: true }
      );
    if (!updatedPost) throw new NotFoundError("Post");

      return updatedPost;
    } catch (error) {
      throw { error };
    }
  }

  async deletePost(slug) {
    try {
      const response = Post.findOneAndDelete({ slug: { $in: slug } });
      return response;
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }
}

module.exports = PostRepository;
