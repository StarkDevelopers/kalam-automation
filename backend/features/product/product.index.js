const productAPI = require('./product.routes')

function initializeRoutes(app) {
  productAPI.register(app)
}

module.exports = initializeRoutes
