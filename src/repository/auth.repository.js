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
      const userNameExist = await User.find({ username: username });
      const emailExist = await User.find({ email: email });
      if (userNameExist) {
        throw new AlreadyTakenError("username", "aleary exsits");
      }
      if(emailExist){
        throw new AlreadyTakenError("email", "aleary exsits try logging ");
      }

      const user = await User.create({
        usernam: username,
        email: email,
        password: password,
      });
      return user;
    } catch (error) {
      console.log("error in creating in  controller");
      if (!username) throw new FieldRequiredError(`A username`);
      if (!email) throw new FieldRequiredError(`An email`);
      if (!password) throw new FieldRequiredError(`A password`);
      throw { error }; // Rethrow the error to be handled by the caller
    }
  }
}

module.exports = AuthRepository;
