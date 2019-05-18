const { Playlist } = require('../../../models')
const CRUDController = require('./CRUDController')
const VideoController = require('./VideoController')

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
        throw new Error('You are not connected')
      }
      const createStruct = {
        playlistName: req.body.playlistName,
        UserUserId: req.user.userId
      }
      return CRUDController.create(req, res, Playlist, createStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Playlist ReadAll
  | Read all playlist associated to initiator user
  |=============================================================================
  */
  async readAll (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      const readStruct = {
        where: {
          UserUserId: req.user.userId
        }
      }
      return CRUDController.read(req, res, Playlist, readStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Playlist ReadOne
  | Read one playlist associated to initiator user using playlist id
  |=============================================================================
  */
  async readOne (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      await Playlist.belongToUser(req.params.playlistId, req.user.userId)
      return VideoController.readPlaylistId(req, res, req.params.playlistId)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
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
        throw new Error('You are not connected')
      }
      await Playlist.belongToUser(req.body.playlistId, req.user.userId)
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
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Playlist Delete
  | Delete a playlist name
  | Block if not associated to requester user
  | Body need : playlistId
  | TODO : Drop all Video associated
  |=============================================================================
  */
  async delete (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      await Playlist.belongToUser(req.params.playlistId, req.user.userId)
      const deleteStruct = {
        playlistId: req.params.playlistId
      }
      return CRUDController.delete(req, res, Playlist, deleteStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  }
}
