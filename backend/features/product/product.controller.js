const BaseController = require('../../base/BaseController')
const ProductService = require('./product.service')
const Constants = require('../../base/Constants')

class ProductController extends BaseController {
  constructor(context, logger, feature) {
    super(context, logger, feature)

    this.productService = new ProductService(context, logger)
  }

  async list() {
    try {
      const products = await this.productService.list()

      this.respondOk({
        data: products,
      })
    } catch (error) {
      this.respondError({
        message: Constants.fetchMessage(this.feature, true),
      })
    }
  }

  async create(product) {
    try {
      const newProduct = await this.productService.create(product)

      this.respondOk({
        data: newProduct,
      })
    } catch (error) {
      console.log(error)
      this.respondError({
        message: Constants.createMessage(this.feature, true),
      })
    }
  }
}

module.exports = ProductController
