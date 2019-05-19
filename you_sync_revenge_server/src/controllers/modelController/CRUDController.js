/*
|===============================================================================
| CRUD Controller
| Allow basics Database operations
|===============================================================================
*/

module.exports = {
  /*
  |=============================================================================
  | Create
  |=============================================================================
  */
  async create (req, res, Model, createStruct) {
    try {
      await Model.create(createStruct)
      // 201 Created The request has been fulfilled
      return res.status(201).send({
        message: 'Created !'
      })
    } catch (err) {
      // 409 Conflict
      return res.status(409).send({
        error: 'Already taken'
      })
    }
  },
  /*
  |=============================================================================
  | Read
  |=============================================================================
  */
  async read (req, res, Model, readStruct) {
    try {
      const result = await Model.findAll(readStruct)
      if (result.length === 0) {
        throw new Error('0')
      }
      // 200 OK
      return res.status(200).send({
        result: result
      })
    } catch (err) {
      if (err.message === '0') {
        // 204 No Content
        return res.status(204).send({
          error: 'Already taken'
        })
      }
      // 404 Not Found
      return res.status(404).send({
        error: 'Already taken'
      })
    }
  },
  /*
  |=============================================================================
  | Update
  |=============================================================================
  */
  async update (req, res, Model, updateStruct) {
    try {
      const result = await Model.update(
        updateStruct.update, {
          where: updateStruct.where
        }
      )
      if (result[0] === 0) {
        throw new Error('Ressource was not found')
      }
      // 200 OK
      return res.status(200).send({
        message: 'Ressource successfully updated'
      })
    } catch (err) {
      // 409 Conflict
      return res.status(409).send({
        error: 'Already taken'
      })
    }
  },
  /*
  |=============================================================================
  | Delete
  |=============================================================================
  */
  async delete (req, res, Model, deleteStruct) {
    try {
      const result = await Model.destroy({
        where: deleteStruct
      })
      if (result === 0) {
        throw new Error('This ressource doesn\'t exist')
      }
      // 200 OK
      return res.status(200).send({
        message: 'Ressource successfully deleted'
      })
    } catch (err) {
      // 400 Bad Request
      return res.status(400).send({
        error: 'Failed to delete'
      })
    }
  }
}
