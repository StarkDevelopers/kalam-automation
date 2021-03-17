const { verifyToken } = require('../utils/common/authToken')

async function authorization(req, res, next) {
  try {
    const headers = req.headers

    let authorization = headers['authorization'] || headers['Authorization']

    if (!authorization) {
      return res.status(403).send('Authorization Header is missing')
    }

    if (!authorization.startsWith('Bearer ')) {
      return res.status(403).send('Authorization Header is invalid')
    }

    authorization = authorization.replace('Bearer ', '')

    const user = await verifyToken(authorization)

    req.user = user

    return next()
  } catch (error) {
    return res.status(403).send('Not Authorized to this API')
  }
}

module.exports = () => (req, res, next) => authorization(req, res, next)
