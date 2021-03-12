const BaseRepository = require('../../base/BaseRepository')

class UserRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }

  async login(number, password) {
    return await this.Model.findOne({ number, password })
  }
}

module.exports = UserRepository
