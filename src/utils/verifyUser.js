const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const { errorHandler, NotFoundError } = require("./error");

const verifyToken = (req, res, next) => {
  try {
    const token = req.session.token; // Use req.cookies instead of req.cookie
    if (!token) throw new SyntaxError("Token missing or malformed");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!user) throw new Error("Invalid Token");
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyToken,
};
