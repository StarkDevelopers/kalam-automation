const BaseController = require('../../base/BaseController')
const OrderItemsService = require('./orderItems.service')
const Constants = require('../../base/Constants')

class OrderItemsController extends BaseController {
  constructor(context, logger, feature) {
    super(context, logger, feature)

    this.service = new OrderItemsService(context, logger)
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
}

module.exports = OrderItemsController
