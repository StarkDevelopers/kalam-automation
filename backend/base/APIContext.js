class APIContext {
  constructor(request, Model) {
    this.request = request

    this.response = request.res

    this.Model = Model

    this.user = request.user

    this.session = request.session
  }
}

module.exports = APIContext
