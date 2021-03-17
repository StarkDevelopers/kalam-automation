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

const updateUserApi = {
  path: '',
  verb: 'PUT',
  handler: {
    controller: UserController,
    method: 'update',
    methodArguments: ['request:body'],
  },
  Model: User,
  middlewares: {
    authorization: '',
  },
  request: {
    body: {
      _id: Joi.string().required(),
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
  middlewares: {},
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
  middlewares: {},
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

const deleteUserApi = {
  path: '/:id',
  verb: 'DELETE',
  handler: {
    controller: UserController,
    method: 'delete',
    methodArguments: [':id'],
  },
  Model: User,
  middlewares: {
    authorization: '',
  },
  request: {
    params: {
      id: Joi.string().required(),
    },
  },
}

const userEndpoints = [
  createUserApi,
  updateUserApi,
  loginUserApi,
  adminLoginUserApi,
  getUserApi,
  listUsersApi,
  deleteUserApi,
]

module.exports = new API('User', '/api/user', userEndpoints)
