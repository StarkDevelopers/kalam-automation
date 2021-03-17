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

  async listAll() {
    return await this.orderItemsRepository.listAll()
  }

  async getById(id) {
    return await this.orderItemsRepository.getById(id)
  }

  async delete(id) {
    return await this.orderItemsRepository.delete(id)
  }

  async updateOrderItemDetails(id, body) {
    return await this.orderItemsRepository.updateOrderItemDetails(id, body)
  }

  async approveOrderItem(id, body) {
    return await this.orderItemsRepository.approveOrderItem(id, body)
  }

  async activateOrderItem(id) {
    return await this.orderItemsRepository.activateOrderItem(id)
  }
}

module.exports = OrderItemsService
