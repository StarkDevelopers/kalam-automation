const mongoose = require('mongoose')

class User {
  constructor() {
    this._name = 'user'
  }

  _init() {
    const schema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
        },
        number: {
          type: Number,
          required: true,
        },
        number2: {
          type: Number,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        aadharCardNumber: {
          type: String,
          required: true,
        },
        panCardNumber: {
          type: String,
          required: true,
        },
        technicianName: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        isAdmin: {
          type: Boolean,
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

module.exports = User
