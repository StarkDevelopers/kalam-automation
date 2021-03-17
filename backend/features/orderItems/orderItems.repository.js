const BaseRepository = require('../../base/BaseRepository')

const Orders = require('../orders/orders.model')
const Product = require('../product/product.model')
const User = require('../user/user.model')

class OrderItemsRepository extends BaseRepository {
  constructor(context, logger) {
    super(context, logger)

    this.user = context.request.user
  }

  async list() {
    new Orders().getInstance()
    return await this.Model.find({ userId: this.user._id })
      .select(['productId', 'orderId', 'status'])
      .populate('orderId')
  }

  async listAll() {
    new Orders().getInstance()
    new Product().getInstance()
    new User().getInstance()
    return await this.Model.find()
      .select(['productId', 'orderId', 'userId', 'status'])
      .populate('orderId')
      .populate('productId')
      .populate('userId')
  }

  async getById(id) {
    return await this.Model.findOne({ _id: id })
  }

  async updateOrderItemDetails(id, body) {
    const customerName = body.customerName
    const companyName = body.companyName
    const address = body.address
    const gstNumber = body.gstNumber
    const customerMobileNumber1 = body.customerMobileNumber1
    const customerMobileNumber2 = body.customerMobileNumber2
    const emailId = body.emailId
    const vehicleNumber = body.vehicleNumber
    const vehicleCompany = body.vehicleCompany
    const gpsUserName = body.gpsUserName
    const gpsPassword = body.gpsPassword
    const aadharCardNumber = body.aadharCardNumber

    return await this.Model.findOneAndUpdate(
      { _id: id },
      {
        status: 'Inactive',
        customerName,
        companyName,
        address,
        gstNumber,
        customerMobileNumber1,
        customerMobileNumber2,
        emailId,
        vehicleNumber,
        vehicleCompany,
        gpsUserName,
        gpsPassword,
        aadharCardNumber,
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
