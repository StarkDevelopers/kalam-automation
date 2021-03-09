const mongoose = require('mongoose')

class Product {
  constructor() {
    this._name = 'product'
  }

  _init() {
    const schema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
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

module.exports = Product
