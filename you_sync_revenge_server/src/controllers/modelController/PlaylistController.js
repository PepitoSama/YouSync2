const { Playlist } = require('../../../models')
const CRUDController = require('./CRUDController')

module.exports = {
  /*
  |=============================================================================
  | Playlist Create
  | Create a playlist associated to initiator user
  | Body need : playlistName
  |=============================================================================
  */
  async create (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw Error
      }
      const createStruct = {
        playlistName: req.body.playlistName,
        UserUserId: req.user[0].dataValues.UserUserId
      }
      return CRUDController.create(req, res, Playlist, createStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You Are not connected'
      })
    }
  },
  /*
  |=============================================================================
  | Playlist Read
  | Read all playlist associated to initiator user
  |=============================================================================
  */
  async read (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw Error
      }
      const readStruct = {
        where: {
          UserUserId: req.user[0].dataValues.UserUserId
        }
      }
      return CRUDController.read(req, res, Playlist, readStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You Are not connected'
      })
    }
  },
  /*
  |=============================================================================
  | Playlist Update
  | Update a playlist name
  | Block if not associated to requester user
  | Body need : playlistName, playlistId
  |=============================================================================
  */
  async update (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw Error
      }
      await Playlist.belongToUser(req.body.playlistId, req.user[0].dataValues.UserUserId)
      const updateStruct = {
        update: {
          playlistName: req.body.playlistName
        },
        where: {
          playlistId: req.body.playlistId
        }
      }
      return CRUDController.update(req, res, Playlist, updateStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You Are not connected or this not your playlist'
      })
    }
  },
  /*
  |=============================================================================
  | Playlist Delete
  | Delete a playlist name
  | Block if not associated to requester user
  | Body need : playlistId
  |=============================================================================
  */
  async delete (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw Error
      }
      await Playlist.belongToUser(req.body.playlistId, req.user[0].dataValues.UserUserId)
      const deleteStruct = {
        playlistId: req.body.playlistId
      }
      return CRUDController.delete(req, res, Playlist, deleteStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You Are not connected or this not your playlist'
      })
    }
  }
}
