const { Video } = require('../../../models')
const CRUDController = require('./CRUDController')

module.exports = {
  async create (req, res) {
    const createStruct = {
      videoName: req.body.videoName,
      videoYoutubeId: req.body.videoYoutubeId
    }
    CRUDController.create(req, res, Video, createStruct)
  },
  async read (req, res) {
    const readStruct = {
      where: {
        videoId: req.body.videoId
      }
    }
    CRUDController.read(req, res, Video, readStruct)
  },
  async update (req, res) {
    const updateStruct = {
      update: {
        videoName: req.body.videoName
      },
      where: {
        videoId: req.body.videoId
      }
    }
    CRUDController.update(req, res, Video, updateStruct)
  },
  async delete (req, res) {
    const deleteStruct = {
      videoId: req.body.videoId
    }
    CRUDController.delete(req, res, Video, deleteStruct)
  }
}
