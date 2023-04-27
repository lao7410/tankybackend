const UserDaoMongo = require('../Dao/mongo/user.mongo');


class UserServices {
  constructor(dao) {
    this.repo = new UserDaoMongo();
  }

  async getUsers(limit, page) {
    return await this.repo.getUsers(limit, page);
  }

  async createUser(newUser) {
    return await this.repo.createUser(newUser);
  }

  async getUserById(userId) {
    return await this.repo.getUserById(userId);
  }

  async updateUser(userId, updateData) {
    return await this.repo.updateUser(userId, updateData);
  }

  async deleteUser(userId) {
    return await this.repo.deleteUser(userId);
  }
}

module.exports = UserServices;
