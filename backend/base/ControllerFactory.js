const APIContext = require('./APIContext')
const CustomError = require('./CustomError')
const LoggerFactory = require('./logger/factory')

class ControllerFactory {
  constructor(Controller, Model) {
    this.Controller = Controller
    this.Model = Model

    this.name = this.Controller.name.replace('Controller', '')
  }

  /**
   * context = {
   *   request: {
   *     param: { Id: 45, pageNum: 17 }
   *     query: { filter: 'unique1' }
   *     cookies: { user: { name: 'Michael' } }
   *     body: {
   *       firstName: 'Michael',
   *       lastName: 'Corleone',
   *       occupation: 'Godfather'
   *     }
   *   }
   * }
   *
   * parseArgument(context, ':Id');                       // 45
   * parseArgument(context, '?filter');                   // 'unique1'
   * parseArgument(context, 'request:cookies');           // { user: { name: 'Michael' } }
   * parseArgument(context, 'request:cookies:user');      // { name: 'Michael' }
   * parseArgument(context, 'request:cookies:user:name'); // 'Michael'
   * parseArgument(context, 'request:body:firstName');    // 'Michael'
   */
  static parseArgument(context, expression) {
    let name = expression
    let object
    let value

    if (name[0] === ':') {
      object = context.request.params
      name = name.substring(1)
      value = object[name]
    } else if (name[0] === '?') {
      object = context.request.query
      name = name.substring(1)
      value = object[name]
    } else if (name.includes(':')) {
      const parts = name.split(':')
      let current = context

      for (let i = 0; i < parts.length; i++) {
        current = value = current[parts[i]]
        if (current === undefined || current === null) {
          break
        }
      }
    } else if (context[name] !== undefined) {
      value = context[name]
    }

    return value
  }

  async createContext(request) {
    let Model
    try {
      Model = new this.Model().getInstance()
    } catch (error) {
      // Todo: Throw an error
      // Logout user
    }

    return new APIContext(request, Model)
  }

  create(method, ...argumentExpressions) {
    return async (request, response, next = () => {}) => {
      const context = await this.createContext(request)

      const logger = LoggerFactory.create(this.name, context)

      const controller = new this.Controller(context, logger, this.name)

      try {
        const methodArguments = argumentExpressions.map((expression) =>
          ControllerFactory.parseArgument(context, expression)
        )

        await controller[method].apply(controller, methodArguments)
      } catch (error) {
        // Todo: Handle error
        if (error instanceof CustomError) {
          controller.respond(error.status, {
            message: error.message,
          })
        } else {
          next(error)
        }
      }
    }
  }
}

module.exports = ControllerFactory
