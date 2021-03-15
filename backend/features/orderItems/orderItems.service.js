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

  async getById(id) {
    return await this.orderItemsRepository.getById(id)
  }

  async updateOrderItemDetails(id, body) {
    return await this.orderItemsRepository.updateOrderItemDetails(id, body)
  }
}

module.exports = OrderItemsService
