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

  async listAll() {
    try {
      const orders = await this.service.listAll()

      this.respondOk({
        data: orders,
      })
    } catch (error) {
      console.log(error)
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  async approveOrderItem(id, body) {
    try {
      await this.service.approveOrderItem(id, body)

      this.respondOk({
        data: Constants.updateMessage(this.feature),
      })
    } catch (error) {
      console.log(error)
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  async activateOrderItem(id) {
    try {
      await this.service.activateOrderItem(id)

      this.respondOk({
        data: Constants.updateMessage(this.feature),
      })
    } catch (error) {
      console.log(error)
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  async getById(id) {
    try {
      const order = await this.service.getById(id)

      this.respondOk({
        data: order,
      })
    } catch (error) {
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  async delete(id) {
    try {
      await this.service.delete(id)

      this.respondOk({
        data: Constants.deleteMessage(this.feature),
      })
    } catch (error) {
      this.respondError({
        message: Constants.deleteMessage(this.feature, true),
      })
    }
  }

  async updateOrderItemDetails(id, body) {
    try {
      await this.service.updateOrderItemDetails(id, body)

      this.respondOk({
        data: Constants.updateMessage(this.feature),
      })
    } catch (error) {
      console.log(error)
      this.respondError({
        message: Constants.updateMessage(this.feature, true),
      })
    }
  }
}

module.exports = OrderItemsController
