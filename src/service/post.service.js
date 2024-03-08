const { PostRepository } = require("../repository/index");

class PostService {
  constructor() {
    this.postRepository = new PostRepository();
  }
  async create(data, userId) {
    try {
      const slug = data.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
      const post = await this.postRepository.create(data, userId, slug);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async fetchAllPosts(filters) {
    try {
      const result = await this.postRepository.getAllPosts(
        filters.sort,
        filters.order,
        filters.page,
        filters.limit
      );
      return result;
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }
  async fetchAllPostsBySlug(slug) {
    try {
      const result = await this.postRepository.fetchPostBySlug(slug);
      return result;
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }
  async fetchAllPostsByUser(username) {
    try {
      const result = await this.postRepository.fetchPostByUser(username);
      return result;
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }

  async updatePost(data, slug) {
    try {
      const newSlug = data.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
      const post = await this.postRepository.updatePost(data, slug, newSlug);
      return post;
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }

  async deletePost(slug) {
    try {
      const response = await this.postRepository.deletePost(slug);
      return response;
    } catch (error) {
      throw { error };
    }
  }
}

module.exports = PostService;
