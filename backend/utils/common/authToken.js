const jwt = require('jsonwebtoken')

const secretToken = process.env.LOGIN_TOKEN_SECRET

const generateToken = (number) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ number }, secretToken, { expiresIn: '8h' }, (error, token) => {
      if (error) {
        return reject(error)
      }
      return resolve(token)
    })
  })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretToken, (error, _) => {
      if (error) {
        return reject(error)
      }
      return resolve()
    })
  })
}

module.exports = {
  generateToken,
  verifyToken,
}
