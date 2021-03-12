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
    // authorization: 'admin:user:create',
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

// const updateUserApi = {
//   path: '/:id',
//   verb: 'PUT',
//   handler: {
//     controller: UserController,
//     method: 'update',
//     methodArguments: ['request:body', ':id'],
//   },
//   Model: User,
//   middlewares: {
//     // authorization: 'admin:user:create',
//     // decryption: 'Username,Name,Password,Email',
//     // subscription: 'Free'
//   },
//   request: {
//     body: {
//       number: Joi.number().required(),
//       name: Joi.string().required(),
//       password: Joi.string()
//         .regex(/^.*[a-z]+.*$/)
//         .regex(/^.*[A-Z]+.*$/)
//         .regex(/^.*[0-9]+.*$/)
//         .regex(/^.*\W+.*$/)
//         .required(),
//       isAdmin: Joi.boolean().required(),
//     },
//     params: {
//       id: Joi.number().required(),
//     },
//   },
// }

// const listUsersApi = {
//   path: '',
//   verb: 'GET',
//   handler: {
//     controller: UserController,
//     method: 'list',
//     methodArguments: ['request:query'],
//   },
//   Model: User,
//   middlewares: {},
//   request: {
//     query: {
//       filter: Joi.string().allow('', null).optional(),
//       sortBy: Joi.string().allow('', null).optional(),
//       sortType: Joi.string().allow('', null).optional(),
//       pageIndex: Joi.number().optional(),
//       pageSize: Joi.number().optional(),
//     },
//   },
// }

// const deleteUsersApi = {
//   path: '/:id',
//   verb: 'DELETE',
//   handler: {
//     controller: UserController,
//     method: 'delete',
//     methodArguments: [':id'],
//   },
//   Model: User,
//   middlewares: {},
//   request: {
//     params: {
//       id: Joi.string().required(),
//     },
//   },
// }

const userEndpoints = [createUserApi, loginUserApi]

module.exports = new API('User', '/api/user', userEndpoints)
