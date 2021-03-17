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
  middlewares: {
    authorization: '',
  },
  request: {},
}

const listAllOrdersApi = {
  path: '/listAll',
  verb: 'GET',
  handler: {
    controller: OrderItemsController,
    method: 'listAll',
    methodArguments: [],
  },
  Model: OrderItems,
  middlewares: {
    authorization: '',
  },
  request: {},
}

const approveOrderItemApi = {
  path: '/approve/:id',
  verb: 'POST',
  handler: {
    controller: OrderItemsController,
    method: 'approveOrderItem',
    methodArguments: [':id', 'request:body'],
  },
  Model: OrderItems,
  middlewares: {
    authorization: '',
  },
  request: {
    body: {
      imeiNumber: Joi.string().required(),
      simCardNumber: Joi.string().required(),
      mobileNumber: Joi.string().required(),
      installerName: Joi.string().required(),
    },
  },
}

const activateOrderItemApi = {
  path: '/activate/:id',
  verb: 'POST',
  handler: {
    controller: OrderItemsController,
    method: 'activateOrderItem',
    methodArguments: [':id'],
  },
  Model: OrderItems,
  middlewares: {
    authorization: '',
  },
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
  middlewares: {
    authorization: '',
  },
  request: {},
}

const deleteOrdersApi = {
  path: '/:id',
  verb: 'DELETE',
  handler: {
    controller: OrderItemsController,
    method: 'delete',
    methodArguments: [':id'],
  },
  Model: OrderItems,
  middlewares: {
    authorization: '',
  },
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
  middlewares: {
    authorization: '',
  },
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
  listAllOrdersApi,
  approveOrderItemApi,
  activateOrderItemApi,
  getOrdersApi,
  updateOrderItemDetailsApi,
  deleteOrdersApi,
]

module.exports = new API('OrderItems', '/api/orderItems', orderItemsEndpoints)
