const User = require("../models/User");

class UserRepository {
  async findBy(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      throw { error };
    }
  }

  async findUserById(userID) {
    try {
      const userData = await User.findById(userID).select("-password");
      return userData;
    } catch (error) {
      throw { error };
    }
  }
  async updateUserProfile(body, userId) {
    try {
      const { username, name, profilePicture, bio } = body;

      // Check if the username or email already exists for a different user
      const userNameExits = await User.findOne({
        username: { $in: username },
      });

    if(userNameExits){
      throw new AlreadyTakenError("username", "already exists");
    }

      // Update the user profile
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          $set: {
            username: username,
            name: name,
            profilePicture: profilePicture,
            bio: bio,
          },
        },
        { new: true }
      ).select("-password");

      return userData;
    } catch (error) {
      throw { error };
    }
  }

  async getProfile(userID) {
    try {
      const userData = await User.findById(userID).populate("post");
      return userData;
    } catch (error) {
      throw { error };
    }
  }
}

module.exports = UserRepository;
