const orderItemsAPI = require('./orderItems.routes')

function initializeRoutes(app) {
  orderItemsAPI.register(app)
}

module.exports = initializeRoutes
