const { User } = require('../../../models')
const CRUDController = require('./CRUDController')

module.exports = {
  /*
  |=============================================================================
  | User Read
  | If user provide valid token allowing to identifying him, send him his infos
  |=============================================================================
  */
  async read (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      const readStruct = {
        where: {
          userId: req.user.userId
        }
      }
      return CRUDController.read(req, res, User, readStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(404).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | User Update
  | Allow to user to rename himself
  | Block user if he is not connected, or he doesn't have token binded to his id
  | Body need : username
  |=============================================================================
  */
  async update (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      const updateStruct = {
        update: {
          userUsername: req.body.username,
          userEmail: req.body.email
        },
        where: {
          userId: req.user.userId
        }
      }
      return CRUDController.update(req, res, User, updateStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | User Delete
  | Allow to user to delete his account
  | Block user if he is not connected, or he doesn't have token binded to his id
  |=============================================================================
  */
  async delete (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      const deleteStruct = {
        userId: req.user.userId
      }
      req.user = null
      return CRUDController.delete(req, res, User, deleteStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  }
}
