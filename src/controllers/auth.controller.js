const AuthService = require("../service/auth.service");
const { errorHandler, FieldRequiredError } = require("../utils/error");

const authService = new AuthService();

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username) throw new FieldRequiredError(`A username`);
    if (!email) throw new FieldRequiredError(`An email`);
    if (!password) throw new FieldRequiredError(`A password`);
    const response = await authService.signup({
      username,
      email,
      password,
    });
    res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: { id: response._id, isAdmin: response.isAdmin },
      err: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong ",
      data: {},
      err: { message: error.message },
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) throw new FieldRequiredError(`An email`);
  if (!password) throw new FieldRequiredError(`A password`);
  try {
    const { token, user } = await authService.signin({ email, password });
    return res
      .status(200)
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        secure: true, // Set the Secure flag for HTTPS
        sameSite: "None", // Set the SameSite attribute if necessary
        domain: "http://localhost:3000", // Set the Domain attribute if necessary
      })
      .json({
        success: true,
        message: "Successfully logged in",
        data: { id: user._id, isAdmin: user.isAdmin },
        err: {},
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: { message: error.message },
    });
  }
};

const logout = async (req, res) => {
  res
    .cookie("access_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200);
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await authService.resetPassword(email, password);
    return res.status(200).json({
      success: true,
      message: response.message,
      data: {}, // Assuming no additional data is needed
      err: {}, // No error details are included in the response
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      data: {},
      err: { message: error.message }, // Only the error message is sent back
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  resetPassword,
};
