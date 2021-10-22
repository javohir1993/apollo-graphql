const jwt = require('jsonwebtoken')

const SECRET_KEY = "SUPER_SECRET_KEY"

const sign = payload => jwt.sign(payload, SECRET_KEY)
const verify = accessToken => jwt.verify(accessToken, SECRET_KEY)

module.exports = {
  sign,
  verify
}