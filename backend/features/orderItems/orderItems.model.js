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
        nameOfDriver: {
          type: String,
          required: false,
        },
        licenseNumber: {
          type: String,
          required: false,
        },
        numberPlate: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: false,
        },
        state: {
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
