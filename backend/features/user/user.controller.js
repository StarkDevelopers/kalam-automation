const BaseController = require('../../base/BaseController')
const UserService = require('./user.service')
const Constants = require('../../base/Constants')
const AuthToken = require('../../utils/common/authToken')

class UserController extends BaseController {
  constructor(context, logger, feature) {
    super(context, logger, feature)

    this.userService = new UserService(context, logger)
  }

  async create(user) {
    try {
      const newUser = await this.userService.create(user)

      this.respondOk({
        message: Constants.createMessage(this.feature),
        data: newUser,
      })
    } catch (error) {
      this.respondError({
        message: Constants.createMessage(this.feature, true),
      })
    }
  }

  async login(body) {
    try {
      const user = await this.userService.login(body.number, body.password)

      if (!user) {
        throw 'User not found'
      }

      const token = await AuthToken.generateToken(user._id)

      this.respondOk({
        token,
        data: user,
      })
    } catch (error) {
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  // async update(user, id) {
  //   await this.userService.update(user, id)

  //   this.respondOk({
  //     message: Constants.updateMessage(this.feature),
  //   })
  // }

  // async list(query) {
  //   const users = await this.userService.list(query)

  //   this.respondOk(users)
  // }

  // async get(id) {
  //   const user = await this.userService.get(id)

  //   this.respondOk(user)
  // }

  // async delete(id, username) {
  //   await this.userService.delete(id, username)

  //   this.respondOk({
  //     message: Constants.deleteMessage(this.feature),
  //   })
  // }
}

module.exports = UserController
