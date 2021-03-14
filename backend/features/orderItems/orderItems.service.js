const BaseService = require('../../base/BaseService')
const OrderItemsRepository = require('./orderItems.repository')

class OrderItemsService extends BaseService {
  constructor(context, logger) {
    super(context, logger)

    this.orderItemsRepository = new OrderItemsRepository(context, logger)
  }
}

module.exports = OrderItemsService
