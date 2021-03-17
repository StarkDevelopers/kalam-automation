const BaseRepository = require('../../base/BaseRepository')

const Orders = require('../orders/orders.model')
const Product = require('../product/product.model')

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

  async listAll() {
    new Orders().getInstance()
    new Product().getInstance()
    return await this.Model.find()
      .select(['productId', 'orderId', 'status'])
      .populate('orderId')
      .populate('productId')
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

  async approveOrderItem(id, body) {
    const imeiNumber = body.imeiNumber
    const simCardNumber = body.simCardNumber
    const mobileNumber = body.mobileNumber
    const installerName = body.installerName

    return await this.Model.findOneAndUpdate(
      { _id: id },
      {
        status: 'Approved',
        imeiNumber,
        simCardNumber,
        mobileNumber,
        installerName,
      }
    )
  }

  async activateOrderItem(id) {
    return await this.Model.findOneAndUpdate(
      { _id: id },
      {
        status: 'Active',
      }
    )
  }
}

module.exports = OrderItemsRepository
