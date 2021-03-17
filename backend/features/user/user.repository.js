const BaseRepository = require('../../base/BaseRepository')

class UserRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }

  async login(number, password, isAdmin) {
    const userQuery = {
      number,
      password,
    }

    if (isAdmin) {
      userQuery['isAdmin'] = true
    }

    return await this.Model.findOne(userQuery)
  }
}

module.exports = UserRepository
