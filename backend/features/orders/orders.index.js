const ordersAPI = require('./orders.routes')

function initializeRoutes(app) {
  ordersAPI.register(app)
}

module.exports = initializeRoutes
