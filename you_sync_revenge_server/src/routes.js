const AuthentificationController = require('./controllers/AuthentificationController')
const AuthentificationControllerPolicy = require('./policies/AuthentificationControllerPolicy')
const PlaylistController = require('./controllers/PlaylistController')
const UserController = require('./controllers/UserController')

/*
|===============================================================================
| Routes
| This file contain all route to handle client request
|===============================================================================
*/

module.exports = (app) => {
  // get
  // post
  // put
  // patch
  // delete
  app.get('/', (req, res) => {
    res.end('hello World')
  })
  /*
  |===============================================================================
  | Authentification routes :
  | > POST /register
  | > POST /login
  | > DELETE /logout
  |===============================================================================
  */
  app.post('/register', AuthentificationControllerPolicy.register, AuthentificationController.register)
  app.post('/login', AuthentificationController.login)
  app.delete('/logout', AuthentificationController.logout)
  /*
  |===============================================================================
  | Playlist routes :
  | TODO > GET /playlist
  | TODO > PUT /playlist
  | TODO > DELETE /playlist
  | > POST /playlist
  |===============================================================================
  */
  app.get('/playlist', PlaylistController.read)
  app.put('/playlist/:id', PlaylistController.update)
  app.delete('/playlist/:id', PlaylistController.delete)
  app.post('/playlist', PlaylistController.create)

  /*
  |===============================================================================
  | User routes :
  | TODO > GET /user
  | TODO > PUT /user
  | TODO > DELETE /user
  | TODO > POST /user
  |===============================================================================
  */
  app.get('/user', UserController.read)
  app.put('/user', UserController.update)
  app.delete('/user', UserController.delete)

  /*
  |===============================================================================
  | Video routes :
  | TODO > GET /video
  | TODO > PUT /video
  | TODO > DELETE /video
  | TODO > POST /video
  |===============================================================================
  */
}
