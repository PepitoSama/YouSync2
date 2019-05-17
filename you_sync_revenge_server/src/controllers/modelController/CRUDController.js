/*
|===============================================================================
| CRUD Controller
| Allow basics Database operations
|===============================================================================
*/

module.exports = {
  /*
  |===============================================================================
  | Create
  |===============================================================================
  */
  async create (req, res, Model, createStruct) {
    try {
      await Model.create(createStruct)
      // 201 Created The request has been fulfilled
      return res.status(201).send({
        message: 'Created !'
      })
    } catch (err) {
      // 500 Internal Server Error
      return res.status(500).send({
        error: 'Can\'t create it'
      })
    }
  },
  /*
  |===============================================================================
  | Read
  |===============================================================================
  */
  async read (req, res, Model, readStruct) {
    try {
      const result = await Model.findAll(readStruct)
      if (result.length === 0) {
        throw Error
      }
      // 200 OK
      return res.status(200).send({
        result: result
      })
    } catch (err) {
      // 404 Not Found
      return res.status(404).send({
        error: 'Ressource was not found'
      })
    }
  },
  /*
  |===============================================================================
  | Update
  |===============================================================================
  */
  async update (req, res, Model, updateStruct) {
    try {
      const result = await Model.update(
        updateStruct.update, {
          where: updateStruct.where
        }
      )
      if (result[0] === 0) {
        throw Error
      }

      // 200 OK
      return res.status(200).send({
        message: 'Ressource successfully updated'
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'Ressource was not found'
      })
    }
  },
  /*
  |===============================================================================
  | Delete
  |===============================================================================
  */
  async delete (req, res, Model, deleteStruct) {
    try {
      await Model.destroy({
        where: deleteStruct
      })
      // 200 OK
      return res.status(200).send({
        message: 'Ressource successfully deleted'
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'Ressource was not found'
      })
    }
  }
}
