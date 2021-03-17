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

  async login(number, password, isAdmin = false) {
    return this.userRepository.login(number, password, isAdmin)
  }

  async update(user) {
    return this.userRepository.update(user)
  }

  async list() {
    return await this.userRepository.list()
  }

  async get(id) {}

  async delete(id) {
    return await this.userRepository.delete(id)
  }
}

module.exports = UserService
