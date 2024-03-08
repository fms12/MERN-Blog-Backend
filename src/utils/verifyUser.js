const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const { errorHandler } = require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; // Use req.cookies instead of req.cookie
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET  , (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
