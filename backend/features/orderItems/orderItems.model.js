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
        IMEINumber: {
          type: Number,
          required: false,
        },
        simCardNumber: {
          type: Number,
          required: false,
        },
        mobileNumber: {
          type: Number,
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
