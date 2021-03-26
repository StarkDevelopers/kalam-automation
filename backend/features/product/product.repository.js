const BaseRepository = require('../../base/BaseRepository')

class ProductRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }

  async list() {
    return await this.Model.find().sort({ order: 1 })
  }
}

module.exports = ProductRepository
