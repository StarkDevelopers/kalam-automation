/**
 * Express Custom Error Handler
 * Whenever error(object) is passed to next this handler will be called
 *
 * Try to catch each and every error and send response from controller or respective route/middleware
 * Avoid this custom error handler
 */
function customErrorHandler() {
  return (error, req, res, next) => {
    // Send error mail
    res.status(500)
    res.send(error)
  }
}

module.exports = {
  customErrorHandler,
}
