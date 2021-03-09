const BaseService = require('../../base/BaseService')
const UserRepository = require('./user.repository')
const TABLES = require('../../base/Tables')
const CustomError = require('../../base/CustomError')

class UserService extends BaseService {
  constructor(context, logger) {
    super(context, logger)
    this.user = this.context.user

    this.userRepository = new UserRepository(context, logger, TABLES.USER)
  }

  async create(user) {
    return this.userRepository.create(user)
  }

  async update(user, id) {}

  async list(query) {}

  async get(id) {}

  async delete(id, username) {}
}

module.exports = UserService
