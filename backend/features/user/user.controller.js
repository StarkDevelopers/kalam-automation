const BaseController = require('../../base/BaseController')
const UserService = require('./user.service')
const Constants = require('../../base/Constants')
const AuthToken = require('../../utils/common/authToken')

class UserController extends BaseController {
  constructor(context, logger, feature) {
    super(context, logger, feature)

    this.request = context.request

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

      const token = await AuthToken.generateToken(user._id, user.name)

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

  async adminLogin(body) {
    try {
      const user = await this.userService.login(
        body.number,
        body.password,
        true
      )

      if (!user) {
        throw 'User not found'
      }

      const token = await AuthToken.generateToken(user._id, user.name)

      this.respondOk({
        token,
        data: user,
      })
    } catch (error) {
      this.respondError(
        JSON.stringify({
          message: Constants.fetchMessage(this.feature, true),
        })
      )
    }
  }

  get() {
    const user = this.request.user

    this.respondOk(user)
  }

  async list() {
    try {
      const users = await this.userService.list()

      this.respondOk({
        data: users,
      })
    } catch (error) {
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }
}

module.exports = UserController
