const { User, AuthToken } = require('../../models')

/*
|===============================================================================
| Middleware : custom-auth-middleware
| This middleware
|===============================================================================
*/

module.exports = async function (req, res, next) {
  // Look if cookie or header contain a token
  const token = req.cookies.auth_token || req.headers.authorization
  console.log('\n', req.cookies)
  if (token) {
    // Ask database if this cookie exists
    const authToken = await AuthToken.findAll({
      where: {
        token
      },
      include: User
    })

    // If token exists, attache User to req
    if (authToken) {
      console.log('\n YOU ARE LOGGED', authToken)
      req.user = authToken.dataValues
    } else {
      console.log('\n INVALID TOKEN')
    }
  } else {
    console.log('\n NO TOKEN')
  }
  next()
}
