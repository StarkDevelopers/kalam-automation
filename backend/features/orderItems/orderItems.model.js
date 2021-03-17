const mongoose = require('mongoose')

class OrderItems {
  constructor() {
    this._name = 'orderItem'
  }

  _init() {
    const schema = new mongoose.Schema(
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'order',
        },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'product',
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'user',
        },
        status: {
          type: String,
          required: false,
        },
        imeiNumber: {
          type: String,
          required: false,
        },
        simCardNumber: {
          type: String,
          required: false,
        },
        mobileNumber: {
          type: String,
          required: false,
        },
        installerName: {
          type: String,
          required: false,
        },
        customerName: {
          type: String,
          required: false,
        },
        companyName: {
          type: String,
          required: false,
        },
        address: {
          type: String,
          required: false,
        },
        gstNumber: {
          type: String,
          required: false,
        },
        customerMobileNumber1: {
          type: String,
          required: false,
        },
        customerMobileNumber2: {
          type: String,
          required: false,
        },
        emailId: {
          type: String,
          required: false,
        },
        vehicleNumber: {
          type: String,
          required: false,
        },
        vehicleCompany: {
          type: String,
          required: false,
        },
        gpsUserName: {
          type: String,
          required: false,
        },
        gpsPassword: {
          type: String,
          required: false,
        },
        aadharCardNumber: {
          type: String,
          required: false,
        },
      },
      { timestamps: true }
    )

    mongoose.model(this._name, schema)
  }

  getInstance() {
    try {
      return mongoose.model(this._name)
    } catch (err) {
      this._init()
    }

    return mongoose.model(this._name)
  }

  get name() {
    return this._name
  }
}

module.exports = OrderItems
