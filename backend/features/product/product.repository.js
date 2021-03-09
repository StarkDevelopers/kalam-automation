const BaseRepository = require('../../base/BaseRepository')

class ProductRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }
}

module.exports = ProductRepository
