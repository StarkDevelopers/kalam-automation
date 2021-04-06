const Joi = require('joi')

const API = require('../../base/API')
const ProductController = require('./product.controller')
const Product = require('./product.model')

const listProductApi = {
  path: '',
  verb: 'GET',
  handler: {
    controller: ProductController,
    method: 'list',
    methodArguments: ['request:query'],
  },
  Model: Product,
  middlewares: {
    authorization: '',
  },
  request: {
    query: {
      filter: Joi.string().allow('', null).optional(),
      sortBy: Joi.string().allow('', null).optional(),
      sortType: Joi.string().allow('', null).optional(),
      pageIndex: Joi.number().optional(),
      pageSize: Joi.number().optional(),
    },
  },
}

const createProductApi = {
  path: '',
  verb: 'POST',
  handler: {
    controller: ProductController,
    method: 'create',
    methodArguments: ['request:body'],
  },
  Model: Product,
  middlewares: {
    authorization: '',
  },
  request: {
    body: {
      name: Joi.string().required(),
      image: Joi.string().required(),
      order: Joi.number().required(),
    },
  },
}

const productEndpoints = [listProductApi, createProductApi]

module.exports = new API('Product', '/api/product', productEndpoints)
