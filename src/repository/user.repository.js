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
      const userNameExist = await User.find({ username: username });
      const emailExist = await User.find({ email: email });
      if (userNameExist) {
        throw new AlreadyTakenError("username", "aleary exsits");
      }
      if (emailExist) {
        throw new AlreadyTakenError("email", "aleary exsits ");
      }
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
      if (!username) throw new FieldRequiredError(`A username`);
      if (!email) throw new FieldRequiredError(`An email`);
      if (!password) throw new FieldRequiredError(`A password`);
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
