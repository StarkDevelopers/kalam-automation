const Joi = require('joi')

const API = require('../../base/API')
const OrdersController = require('./orders.controller')
const Orders = require('./orders.model')

const createOrdersApi = {
  path: '',
  verb: 'POST',
  handler: {
    controller: OrdersController,
    method: 'create',
    methodArguments: ['request:body'],
  },
  Model: Orders,
  middlewares: {
    authorization: '',
  },
  request: {
    body: {
      orderItems: Joi.array().items({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
      }),
    },
  },
}

const ordersEndpoints = [createOrdersApi]

module.exports = new API('Orders', '/api/orders', ordersEndpoints)
