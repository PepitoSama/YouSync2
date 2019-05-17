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
        throw Error
      }
      const readStruct = {
        where: {
          userId: req.user[0].dataValues.UserUserId
        }
      }
      return CRUDController.read(req, res, User, readStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You Are not connected'
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
        throw Error
      }
      const updateStruct = {
        update: {
          userUsername: req.body.username
        },
        where: {
          userId: req.user[0].dataValues.UserUserId
        }
      }
      return CRUDController.update(req, res, User, updateStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You dont have permission to do this'
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
        throw Error
      }
      const deleteStruct = {
        userId: req.user[0].dataValues.UserUserId
      }
      return CRUDController.delete(req, res, User, deleteStruct)
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'You dont have permission to do this'
      })
    }
  },
  /*
  |=============================================================================
  | User getUser
  | Allow to user to get his informations
  | NOTE : /!\ This method is deprecated and will be removed soon /!\
  |=============================================================================
  */
  async getUser (req, res) {
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
