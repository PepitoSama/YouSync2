const AuthentificationController = require('./controllers/AuthentificationController')
const AuthentificationControllerPolicy = require('./policies/AuthentificationControllerPolicy')
const PlaylistController = require('./controllers/modelController/PlaylistController')
const UserController = require('./controllers/modelController/UserController')
const VideoController = require('./controllers/modelController/VideoController')

/*
|===============================================================================
| Routes
| This file contain all route to handle client request
|===============================================================================
*/

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.end('hello World')
  })
  /*
  |=============================================================================
  | Authentification routes :
  | > POST /register
  | > POST /login
  | > DELETE /logout
  |=============================================================================
  */
  app.post('/register',
    AuthentificationControllerPolicy.register,
    AuthentificationController.register
  )
  app.post('/login', AuthentificationController.login)
  app.delete('/logout', AuthentificationController.logout)
  /*
  |=============================================================================
  | Playlist routes :
  | > GET /playlist
  | > PUT /playlist
  | > DELETE /playlist
  | > POST /playlist
  |=============================================================================
  */
  app.get('/playlist', PlaylistController.readAll)
  app.get('/playlist/:playlistId', PlaylistController.readOne)
  app.put('/playlist', PlaylistController.update)
  app.delete('/playlist/:playlistId', PlaylistController.delete)
  app.post('/playlist', PlaylistController.create)

  /*
  |=============================================================================
  | User routes :
  | > GET /user
  | > PUT /user
  | > DELETE /user
  | > POST /user
  |=============================================================================
  */
  app.get('/user', UserController.read)
  app.put('/user', UserController.update)
  app.delete('/user', UserController.delete)

  /*
  |=============================================================================
  | Video routes :
  | > GET /video
  | > PUT /video
  | > DELETE /video
  | > POST /video
  |=============================================================================
  */
  app.get('/video', VideoController.read)
  app.put('/video', VideoController.update)
  app.delete('/video/:idVideo', VideoController.delete)
  app.post('/video', VideoController.create)
}
