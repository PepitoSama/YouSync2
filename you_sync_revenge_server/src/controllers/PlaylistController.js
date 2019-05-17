const { Playlist } = require('../../models')

module.exports = {
  async create (req, res) {
    try {
      const createStruct = {
        playlistName: req.body.playlistName,
        UserUserId: req.body.userId
      }
      console.log('\n Playlist token :', req.cookies)
      await Playlist.create(createStruct)
      // 201 Created The request has been fulfilled
      return res.status(201).send({
        message: 'Playlist ' + req.body.playlistName + ' succefully created !'
      })
    } catch (err) {
      // 500 Internal Server Error
      res.status(500).send({
        error: 'Server error'
      })
    }
  },
  async read (req, res) {
    try {
      const playlists = await Playlist.findAll({
        where: {
          UserUserId: req.body.idUser
        }
      })
      // 200 OK
      return res.status(200).send({
        playlists: playlists
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'This user doesnt have any playlist'
      })
    }
  },
  async update (req, res) {
    try {
      await Playlist.update({
        playlistName: req.body.playlistName
      }, {
        where: {
          playlistId: req.body.playlistId
        }
      })
      // 200 OK
      return res.status(200).send({
        message: 'Playlist was successfully renamed to ' + req.body.playlistName
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'This playlist was not found'
      })
    }
  },
  async delete (req, res) {
    try {
      await Playlist.destroy({
        where: {
          playlistId: req.body.playlistId
        }
      })
      // 200 OK
      return res.status(200).send({
        message: 'Playlist was successfully removed'
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'This playlist was not found'
      })
    }
  }
}
