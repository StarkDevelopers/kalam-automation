const APIContext = require('./APIContext')

class BaseRepository {
  /**
   * @param {APIContext} context
   */
  constructor(context, logger) {
    this.context = context

    this.logger = logger

    this.Model = context.Model
  }

  async create(object) {
    return await this.Model.create(object)
  }

  async update(object, id) {}

  async list() {
    return await this.Model.find()
  }

  async get(id) {}

  async delete(id) {}
}

module.exports = BaseRepository
