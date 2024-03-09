const User = require("../models/User");
const {
  ValidationError,
  FieldRequiredError,
  AlreadyTakenError,
  NotFoundError,
} = require("../utils/error");

class AuthRepository {
  async create(data) {
    try {
      const { username, email, password } = data;
      const userNameExist = await User.findOne({ username: username });
      const emailExist = await User.findOne({ email: email });
      if (userNameExist) {
        throw new AlreadyTakenError("username", "exsits");
      }
      if(emailExist){
        throw new AlreadyTakenError("email", "aleary exsits try logging ");
      }

      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log("error in creating in  controller",error);
     
      throw { error }; // Rethrow the error to be handled by the caller
    }
  }
}

module.exports = AuthRepository;
