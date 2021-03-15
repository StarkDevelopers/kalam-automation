const BaseRepository = require('../../base/BaseRepository')

const Orders = require('../orders/orders.model')

class OrderItemsRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)
  }

  async list() {
    new Orders().getInstance()
    return await this.Model.find()
      .select(['productId', 'orderId', 'status'])
      .populate('orderId')
  }

  async getById(id) {
    return await this.Model.findOne({ _id: id })
  }

  async updateOrderItemDetails(id, body) {
    const nameOfDriver = body.nameOfDriver
    const licenseNumber = body.licenseNumber
    const numberPlate = body.numberPlate
    const city = body.city
    const state = body.state

    return await this.Model.findOneAndUpdate(
      { _id: id },
      {
        status: 'Inactive',
        nameOfDriver,
        licenseNumber,
        numberPlate,
        city,
        state,
      }
    )
  }
}

module.exports = OrderItemsRepository
