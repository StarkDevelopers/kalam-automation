const Joi = require('joi')

const API = require('../../base/API')
const OrderItemsController = require('./orderItems.controller')
const OrderItems = require('./orderItems.model')

const listOrdersApi = {
  path: '',
  verb: 'GET',
  handler: {
    controller: OrderItemsController,
    method: 'list',
    methodArguments: [],
  },
  Model: OrderItems,
  middlewares: {},
  request: {},
}

const orderItemsEndpoints = [listOrdersApi]

module.exports = new API('OrderItems', '/api/orderItems', orderItemsEndpoints)
