const { Video, Playlist } = require('../../../models')
const CRUDController = require('./CRUDController')

module.exports = {
  /*
  |=============================================================================
  | Video Create
  |=============================================================================
  */
  async create (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      await Playlist.belongToUser(req.body.playlistId, req.user.userId)
      const getYoutubeMetadata = require('youtube-metadata-cli')
      getYoutubeMetadata(req.body.videoUrl)
        .on('error', console.error)
        .on('data', (meta) => {
          const createStruct = {
            videoYoutubeId: meta.id,
            videoName: meta.title,
            videoThumbnail: meta.thumbnail,
            videoUploaderUrl: meta.uploader_url,
            videoAudioLink: meta.requested_formats[1].url,
            PlaylistPlaylistId: req.body.playlistId
          }
          CRUDController.create(req, res, Video, createStruct)
        })
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Video Read
  |=============================================================================
  */
  async read (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      const readStruct = {
        where: {
          videoId: req.body.videoId
        }
      }
      CRUDController.read(req, res, Video, readStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Video ReadPlaylistId
  |=============================================================================
  */
  async readPlaylistId (req, res, playlistId) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      const readStruct = {
        where: {
          PlaylistPlaylistId: playlistId
        }
      }
      CRUDController.read(req, res, Video, readStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Video Update
  |=============================================================================
  */
  async update (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      Video.belongToUser(req.body.videoId, req.user.userId)
      const updateStruct = {
        update: {
          videoName: req.body.videoName
        },
        where: {
          videoId: req.body.videoId
        }
      }
      CRUDController.update(req, res, Video, updateStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  },
  /*
  |=============================================================================
  | Video Delete
  |=============================================================================
  */
  async delete (req, res) {
    try {
      if (typeof req.user === 'undefined' || req.user === null) {
        throw new Error('You are not connected')
      }
      Video.belongToUser(req.body.videoId, req.user.userId)
      console.log('\n HI', req.params.idVideo)
      const deleteStruct = {
        videoId: req.params.idVideo
      }
      CRUDController.delete(req, res, Video, deleteStruct)
    } catch (err) {
      // 401 Unauthorized
      return res.status(401).send({
        error: err.message
      })
    }
  }
}
