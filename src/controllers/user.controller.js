const UserService = require("../service/user.service");
const userService = new UserService();

const fetchUserById = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await userService.fetchUserById(id);
    res.status(201).json({
      success: true,
      message: "Successfully fetched User a new user",
      data: user,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user ",
      data: {},
      err: { message: error.message },
    });
  }
};
// const getProfile = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await userService.getProfile(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.log({error});
//     res.status(500).json({ message: "Error retrieving user details", error });
//   }
// };

const userProfileUpdate = async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await userService.updateUser(req.body, userId);
    res.status(201).json({
      success: true,
      message: "Successfully fetched User a new user",
      data: userData,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user ",
      data: {},
      err: { message: error.message },
    });
  }
};

module.exports = {
  fetchUserById,
  userProfileUpdate,

};
