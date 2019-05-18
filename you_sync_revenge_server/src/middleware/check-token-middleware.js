const { AuthToken } = require('../../models')

/*
|===============================================================================
| Middleware : custom-auth-middleware
| This middleware
|===============================================================================
*/

module.exports = async function (req, res, next) {
  // Look if cookie or header contain a token
  const token = req.cookies.auth_token || req.headers.authorization
  if (token) {
    // Ask database if this cookie exists
    const authToken = await AuthToken.findAll({
      where: {
        token
      }
    })
    // If token exists, attache User informations to req
    if (authToken.length === 0) {
      console.log('\n Request from a client : Invalid Token\n')
      req.user = null
    } else {
      console.log('\n Request from a client : Valid Token\n')
      req.user = {
        userId: authToken[0].dataValues.UserUserId,
        userToken: authToken[0].dataValues.token
      }
    }
  } else {
    console.log('\n Request from a client : No Token\n')
  }
  next()
}
