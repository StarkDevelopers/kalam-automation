const BaseController = require('../../base/BaseController')
const OrderItemsService = require('./orderItems.service')
const Constants = require('../../base/Constants')

class OrderItemsController extends BaseController {
  constructor(context, logger, feature) {
    super(context, logger, feature)

    this.service = new OrderItemsService(context, logger)
  }
}

module.exports = OrderItemsController
