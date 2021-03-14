const BaseService = require('../../base/BaseService')
const OrdersRepository = require('./orders.repository')

class OrdersService extends BaseService {
  constructor(context, logger) {
    super(context, logger)

    this.ordersRepository = new OrdersRepository(context, logger)
  }

  async list() {
    return await this.ordersRepository.list()
  }

  async create(orders) {
    return await this.ordersRepository.create(orders)
  }
}

module.exports = OrdersService
