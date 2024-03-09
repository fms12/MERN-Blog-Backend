const { AuthRepository, UserRepository } = require("../repository/index");
const { JWT_SECRET } = require("../config/serverConfig");
const jwt = require("jsonwebtoken");

class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      console.log(data);
      const user = await this.authRepository.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async getUserByEmail(email) {
    try {
      const user = await this.userRepository.findBy({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async signin(data) {
    try {
      const validUser = await this.getUserByEmail(data.email);
      if (!validUser) throw new NotFoundError("Email", "sign in first");
      if (!validUser.comparePassword(data.password)) {
        throw new ValidationError("Wrong email/password combination");
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );
      // rest : > rest of the object
      const { password: pass, ...rest } = validUser._doc;
      return { token, user: rest };
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }

  async resetPassword(email, password) {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new Error("User no Found");
      }
      user.password = password;
      await user.save();
      return { message: "Password update successfully" };
    } catch (error) {
      console.log(error);
      throw { error };
    }
  }
}

module.exports = AuthService;
