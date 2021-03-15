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

const getOrdersApi = {
  path: '/:id',
  verb: 'GET',
  handler: {
    controller: OrderItemsController,
    method: 'getById',
    methodArguments: [':id'],
  },
  Model: OrderItems,
  middlewares: {},
  request: {},
}

const updateOrderItemDetailsApi = {
  path: '/:id',
  verb: 'PATCH',
  handler: {
    controller: OrderItemsController,
    method: 'updateOrderItemDetails',
    methodArguments: [':id', 'request:body'],
  },
  Model: OrderItems,
  middlewares: {},
  request: {
    body: {
      nameOfDriver: Joi.string().required(),
      licenseNumber: Joi.string().required(),
      numberPlate: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    },
  },
}

const orderItemsEndpoints = [
  listOrdersApi,
  getOrdersApi,
  updateOrderItemDetailsApi,
]

module.exports = new API('OrderItems', '/api/orderItems', orderItemsEndpoints)
