const Joi = require('joi')

const API = require('../../base/API')
const OrderItemsController = require('./orderItems.controller')
const OrderItems = require('./orderItems.model')

const orderItemsEndpoints = []

module.exports = new API('OrderItems', '/api/orderItems', orderItemsEndpoints)
