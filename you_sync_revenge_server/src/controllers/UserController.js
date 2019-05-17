const { User } = require('../../models')

module.exports = {
  async read (req, res) {
    try {
      const user = await User.findAll({
        where: {
          UserUserId: req.body.idUser
        }
      })
      // 200 OK
      return res.status(200).send({
        user: user
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'This user doesnt exists'
      })
    }
  },
  async update (req, res) {
    try {
      await User.update({
        userName: req.body.userName
      }, {
        where: {
          userId: req.body.userId
        }
      })
      // 200 OK
      return res.status(200).send({
        message: 'User was successfully renamed to ' + req.body.userName
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'This user was not found'
      })
    }
  },
  async delete (req, res) {
    try {
      await User.destroy({
        where: {
          userId: req.body.userId
        }
      })
      // 200 OK
      return res.status(200).send({
        message: 'User was successfully removed'
      })
    } catch (err) {
      // 404 Not Found
      res.status(404).send({
        error: 'This User was not found'
      })
    }
  }
}
