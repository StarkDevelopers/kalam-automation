const BaseService = require('../../base/BaseService')
const ProductRepository = require('./product.repository')

class ProductService extends BaseService {
  constructor(context, logger) {
    super(context, logger)

    this.productRepository = new ProductRepository(context, logger)
  }

  async list() {
    return await this.productRepository.list()
  }

  async create(product) {
    return await this.productRepository.create(product)
  }
}

module.exports = ProductService
