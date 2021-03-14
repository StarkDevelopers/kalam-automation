const BaseRepository = require('../../base/BaseRepository')

const Orders = require('../orders/orders.model')

class OrderItemsRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }

  async list() {
    new Orders().getInstance()
    return await this.Model.find().populate('orderId')
  }
}

module.exports = OrderItemsRepository
