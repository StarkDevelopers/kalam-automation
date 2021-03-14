const mongoose = require('mongoose')

class Orders {
  constructor() {
    this._name = 'order'
  }

  _init() {
    const schema = new mongoose.Schema(
      {
        date: {
          type: Date,
          required: true,
          default: Date.now,
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

module.exports = Orders
