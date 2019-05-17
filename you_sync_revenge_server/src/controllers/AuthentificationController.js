const { User } = require('../../models')
const bcrypt = require('bcrypt')

/*
|===============================================================================
| Controller : AuthentificationController
| This controller will handle all authentification request from clients
|===============================================================================
*/

module.exports = {
  /*
  |=============================================================================
  | Route : /register
  |=============================================================================
  */
  async register (req, res) {
    // hash the password provided by the user
    const hash = bcrypt.hashSync(req.body.password, 10)
    try {
      // Create new user with hashed password
      const createStruct = {
        userUsername: req.body.username,
        userPassword: hash,
        userEmail: req.body.email
      }
      const user = await User.create(
        Object.assign(createStruct)
      )
      await user.authorize()
      // 201 Created The request has been fulfilled, resulting in the creation
      // of a new resource.
      return res.status(201).send({
        user: req.body.username
      })
      // return res.json(data)
    } catch (err) {
      // 400 Bad Request : The server cannot or will not process the request due
      // to an apparent client error
      res.status(400).send({
        error: 'This email account is already in use.'
      })
    }
  },
  /*
  |=============================================================================
  | Route : /login
  | TODO : check ig user is already logged
  |=============================================================================
  */
  async login (req, res) {
    const { username, password } = req.body
    if (!username || !password) {
      // 403 Forbidden : The request was valid, but the server is refusing
      // action. The user might not have the necessary permissions for a
      // resource, or may need an account of some sort.
      return res.status(403).send({
        error: 'Request missing username or password param'
      })
    }
    try {
      let user = await User.authenticate(username, password)
      // 201 Created : The request has been fulfilled, resulting
      // in the creation of a new resource.
      res.cookie('auth_token', user.authToken.token)
      return res.send({
        'username': user.user.userUsername,
        'email': user.user.userEmail,
        'token': user.authToken.token
      })
    } catch (err) {
      // 403 Forbidden : The request was valid, but the server is refusing
      // action. The user might not have the necessary permissions for a
      // resource, or may need an account of some sort.
      return res.status(403).send({
        error: 'invalid username or password'
      })
    }
  },
  /*
  |=============================================================================
  | Route : /logout
  |=============================================================================
  */
  async logout (req, res) {
    // logout request should be sent with token
    const { user, cookies: { auth_token: authToken } } = req

    // we only want to attempt a logout if the user already
    // passed the authentication middleware.
    console.log('\n', req)
    if (user && authToken) {
      await req.user.logout(authToken)
      // 204 No Content : The server successfully processed the request
      // and is not returning any content.[14]
      return res.status(204).send()
    }

    // 403 Forbidden : The request was valid, but the server is refusing action.
    // The user might not have the necessary permissions for a resource, or may
    // need an account of some sort.
    return res.status(403).send(
      { errors: [{ message: 'not authenticated' }] }
    )
  },
  /*
  |=============================================================================
  | Route : /userInfo
  |=============================================================================
  */
  async userInfo (req, res) {
    if (req.user) {
      return res.send(req.user)
    }
    // 404 Not Found : The requested resource could not be found but may be
    // available in the future. Subsequent requests by the client are
    // permissible.
    res.status(404).send(
      { errors: [{ message: 'missing auth token' }] }
    )
  }
}
