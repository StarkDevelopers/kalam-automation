const BaseRepository = require('../../base/BaseRepository')

class OrderItemsRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }
}

module.exports = OrderItemsRepository
