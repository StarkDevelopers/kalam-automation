const jwt = require('jsonwebtoken')

const secretToken = process.env.LOGIN_TOKEN_SECRET

const generateToken = (_id, name) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { _id, name },
      secretToken,
      { expiresIn: '8h' },
      (error, token) => {
        if (error) {
          return reject(error)
        }
        return resolve(token)
      }
    )
  })
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretToken, (error, user) => {
      if (error) {
        return reject(error)
      }
      return resolve(user)
    })
  })
}

module.exports = {
  generateToken,
  verifyToken,
}
