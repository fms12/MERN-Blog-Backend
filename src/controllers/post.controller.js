const PostService = require("../service/post.service");
const UserService = require("../service/user.service");
const {
  UnauthorizedError,
  FieldRequiredError,
  NotFoundError,
} = require("../utils/error");

const postService = new PostService();
const userService = new UserService();

const create = async (req, res, next) => {
  try {
    const loggedUser = req.user;
    if (!loggedUser) throw new UnauthorizedError();
    const { title, content } = req.body;
    if (!title) throw new FieldRequiredError("A title");
    if (!content) throw new FieldRequiredError("An article body");
    const userId = req.user.id;

    const post = await postService.create(req.body, userId);
    return res.status(201).json({
      success: true,
      message: "Successfully created new Post",
      data: post,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: { message: error.message },
    });
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const filters = {
      sort: req.query._sort,
      order: req.query._order,
      page: req.query._page,
      limit: req.query._limit,
    };
    const post = await postService.fetchAllPosts(filters);
    res.set("X-Total-Count", post.totalDocs);
    return res.status(201).json({
      success: true,
      message: "Successfully fetched  Post",
      data: post,
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
const getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await postService.fetchAllPostsBySlug(slug);
    return res.status(201).json({
      success: true,
      message: "Successfully fetched  Post",
      data: post,
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

const udpatePost = async (req, res, next) => {
  try {
    const loggedUser = req.user;
    if (!loggedUser) throw new UnauthorizedError();
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }
    const { slug } = req.params;
    const post = await postService.updatePost(req.body, slug);
    return res.status(201).json({
      success: true,
      message: "Successfully updated  Post",
      data: post,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: { message: error.message },
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const loggedUser = req.user;
    if (!loggedUser) throw new UnauthorizedError();
    const { slug } = req.params;
    const response = await postService.deletePost(slug);
    if (!response) throw new NotFoundError("Article");
    return res.status(200).json({
      success: true,
      message: "Successfully deleted Post !",
      data: { message: { body: ["Article deleted successfully"] } },
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: { message: error.message },
    });
  }
};

const getPostbyUser = async (req, res) => {
  try {
    const { username } = req.params;
    const posts = await postService.fetchAllPostsByUser(username);
    return res.status(201).json({
      success: true,
      message: "Successfully fetched All  Posts",
      data: post,
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
module.exports = {
  create,
  getAllPost,
  getPostBySlug,
  udpatePost,
  deletePost,
};
