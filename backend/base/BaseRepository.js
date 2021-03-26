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

  async update(object) {
    return await this.Model.findOneAndUpdate({ _id: object._id }, object)
  }

  async list() {
    return await this.Model.find()
  }

  async findById(id) {
    return await this.Model.findOne({ _id: id })
  }

  async get(id) {}

  async delete(id) {
    return await this.Model.deleteOne({ _id: id })
  }
}

module.exports = BaseRepository
