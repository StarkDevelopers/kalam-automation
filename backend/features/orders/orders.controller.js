const BaseController = require('../../base/BaseController')
const OrdersService = require('./orders.service')
const Constants = require('../../base/Constants')

class OrdersController extends BaseController {
  constructor(context, logger, feature) {
    super(context, logger, feature)

    this.service = new OrdersService(context, logger)
  }

  async list() {
    try {
      const orders = await this.service.list()

      this.respondOk({
        data: orders,
      })
    } catch (error) {
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  async create(orders) {
    try {
      await this.service.create(orders)

      this.respondOk({
        data: Constants.createMessage(this.feature),
      })
    } catch (error) {
      console.log(error)
      this.respondError({
        message: Constants.createMessage(this.feature, true),
      })
    }
  }
}

module.exports = OrdersController
