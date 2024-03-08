const { UserRepository } = require("../repository/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async fetchUserById(userId) {
    try {
      const userData = await this.userRepository.findUserById(userId);
      return userData;
    } catch (error) {
      throw { error };
    }
  }

  async updateUser(body,userId){
    try {
      const userData = await this.userRepository.updateUserProfile(body,userId);
      return userData;
    } catch (error) {
      throw {error};
    }
  }
  async getProfile(userId){
    try {
      const userData = await this.userRepository.getProfile(userId);
      return userData;
    } catch (error) {
      throw {error};
    }
  }
}

module.exports = UserService;
