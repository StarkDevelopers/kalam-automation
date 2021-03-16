// 3rd party modules
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Project modules
const DatabaseConnection = require('./base/DBDriver')
const {
  frontendResources,
  staticResourcesFromUtility,
} = require('./middlewares/static-resource-management/static-resource')
const registerRoutes = require('./middlewares/route-management/register-routes')
const printRoutes = require('./middlewares/route-management/print-routes')
const {
  customErrorHandler,
} = require('./middlewares/error-handler/custom-error-handler')
const initializeLogger = require('./base/logger/index')
const Logger = require('./base/logger/logger')

// Constants variables
const isProduction = (process.env.NODE_ENV || 'development') === 'production'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

/**
 * Sets up methods for different levels e.g. info, error on prototype of Logger
 */
Logger.setupMethods()

/**
 * Initializes default winston logger for console and file transports
 * Overrides console methods with Winston transporter for Console
 */
initializeLogger()

/**
 * Login not required to access these resources
 */
staticResourcesFromUtility(app, __dirname)

/**
 * app.use(/) => This middleware will be called for all the requests on this server
 * So user needs to be logged in to access all the resources/APIs from here on
 */
app.use('/', (req, res, next) => {
  // Check for login... if not logged in return 409...
  next()
})

/**
 * Registers routes related to features API
 */
registerRoutes(app, __dirname)

/**
 * Print out all the registered routes
 */
printRoutes(app)

/**
 * Login will be required to access these resources
 */
frontendResources(app, __dirname)

/**
 * Handles error occured in Express routes/middleware
 * or if next is called with error(object)
 */
app.use(customErrorHandler())

/**
 * Uncaught Exception
 * For more information: https://nodejs.org/api/process.html#process_event_uncaughtexception
 */
process.on('uncaughtException', (error) => {
  /**
   * Try your execution does not enter into this piece of code
   */
  console.error('Uncaught Exception Caught \n', error)
  // Handle error here
})

/**
 * Unhandled Rejection
 * For more information: https://nodejs.org/api/process.html#process_event_unhandledrejection
 */
process.on('unhandledRejection', (reason, p) => {
  /**
   * Try your execution does not enter into this piece of code
   */
  console.log('Unhandled Rejection at:', p, ' with reason:', reason)
  // Application specific logging, throwing an error, or other logic here
})

/**
 * Exit Process
 * For more information: https://nodejs.org/api/process.html#process_event_exit
 */
process.on('exit', (code) => {
  console.log(`Process is about to exit with code: ${code}`)
})

/**
 * Make Database connection and Start server
 */
;(async function () {
  try {
    await DatabaseConnection()
    app.listen(8080, () => console.log('App listening on port 8080!'))
  } catch (error) {
    console.error(
      `Error while making connection with Database: ${error.message}`
    )
    process.exit(0)
  }
})()
