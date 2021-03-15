const BaseRepository = require('../../base/BaseRepository')
const OrderItems = require('../orderItems/orderItems.model')

class OrdersRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }

  async create(orders) {
    const ordersModel = new this.Model()
    ordersModel.date = new Date()
    const newOrder = await ordersModel.save()

    const OrderItemsModel = new OrderItems().getInstance()

    for (const order of orders.orderItems) {
      for (let i = 0; i < order.quantity; i++) {
        const orderItem = new OrderItemsModel()
        orderItem.productId = order.productId
        orderItem.orderId = newOrder._id
        orderItem.status = 'Pending'

        await orderItem.save()
      }
    }

    return
  }
}

module.exports = OrdersRepository
