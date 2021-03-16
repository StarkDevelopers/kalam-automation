const Joi = require('joi')

const API = require('../../base/API')
const UserController = require('./user.controller')
const User = require('./user.model')

const createUserApi = {
  path: '',
  verb: 'POST',
  handler: {
    controller: UserController,
    method: 'create',
    methodArguments: ['request:body'],
  },
  Model: User,
  middlewares: {
    authorization: '',
    // decryption: 'Username,Name,Password,Email',
    // subscription: 'Free'
  },
  request: {
    body: {
      number: Joi.number().required(),
      name: Joi.string().required(),
      password: Joi.string()
        .regex(/^.*[a-z]+.*$/)
        .regex(/^.*[A-Z]+.*$/)
        .regex(/^.*[0-9]+.*$/)
        .regex(/^.*\W+.*$/)
        .required(),
      isAdmin: Joi.boolean().required(),
    },
  },
}

const loginUserApi = {
  path: '/login',
  verb: 'POST',
  handler: {
    controller: UserController,
    method: 'login',
    methodArguments: ['request:body'],
  },
  Model: User,
  middlewares: {
    // authorization: 'admin:user:create',
    // decryption: 'Username,Name,Password,Email',
    // subscription: 'Free'
  },
  request: {
    body: {
      number: Joi.number().required(),
      password: Joi.string()
        .regex(/^.*[a-z]+.*$/)
        .regex(/^.*[A-Z]+.*$/)
        .regex(/^.*[0-9]+.*$/)
        .regex(/^.*\W+.*$/)
        .required(),
    },
  },
}

const adminLoginUserApi = {
  path: '/admin-login',
  verb: 'POST',
  handler: {
    controller: UserController,
    method: 'adminLogin',
    methodArguments: ['request:body'],
  },
  Model: User,
  middlewares: {
    // authorization: 'admin:user:create',
    // decryption: 'Username,Name,Password,Email',
    // subscription: 'Free'
  },
  request: {
    body: {
      number: Joi.number().required(),
      password: Joi.string()
        .regex(/^.*[a-z]+.*$/)
        .regex(/^.*[A-Z]+.*$/)
        .regex(/^.*[0-9]+.*$/)
        .regex(/^.*\W+.*$/)
        .required(),
    },
  },
}

const getUserApi = {
  path: '',
  verb: 'GET',
  handler: {
    controller: UserController,
    method: 'get',
    methodArguments: [],
  },
  Model: User,
  middlewares: {
    authorization: '',
    // decryption: 'Username,Name,Password,Email',
    // subscription: 'Free'
  },
  request: {},
}

const listUsersApi = {
  path: '/list',
  verb: 'GET',
  handler: {
    controller: UserController,
    method: 'list',
    methodArguments: [],
  },
  Model: User,
  middlewares: {
    authorization: '',
  },
  request: {},
}

const userEndpoints = [
  createUserApi,
  loginUserApi,
  adminLoginUserApi,
  getUserApi,
  listUsersApi,
]

module.exports = new API('User', '/api/user', userEndpoints)
