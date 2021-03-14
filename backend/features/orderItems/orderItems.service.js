const BaseService = require('../../base/BaseService')
const OrderItemsRepository = require('./orderItems.repository')

class OrderItemsService extends BaseService {
  constructor(context, logger) {
    super(context, logger)

    this.orderItemsRepository = new OrderItemsRepository(context, logger)
  }

  async list() {
    return await this.orderItemsRepository.list()
  }
}

module.exports = OrderItemsService
