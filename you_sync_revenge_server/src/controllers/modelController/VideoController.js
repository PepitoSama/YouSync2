const { Video, Playlist } = require('../../../models')
const CRUDController = require('./CRUDController')

/*
|=============================================================================
| Video Controller
| TODO : format URL ON create
|      : Catch error code check to send back right HTTP code
|=============================================================================
*/

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
      await getYoutubeMetadata(req.body.videoUrl)
        .on('error', function (err) {
          return res.status(400).send({
            error: err.message
          })
        })
        .on('data', (meta) => {
          console.log('\n FORMAT : \n', meta.requested_formats[1].url)
          const createStruct = {
            videoYoutubeId: meta.id,
            videoName: meta.title,
            videoThumbnail: meta.thumbnail,
            videoUploaderUrl: meta.uploader_url,
            // videoAudioLink: meta.requested_formats[1].url,
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
  | Video Read
  |=============================================================================
  */
  async getAudioLink (req, res) {
    try {
      const getYoutubeMetadata = require('youtube-metadata-cli')
      await getYoutubeMetadata(req.params.videoId)
        .on('error', function (err) {
          return res.status(400).send({
            error: err.message
          })
        })
        .on('data', (meta) => {
          console.log('\n', meta.requested_formats[1].url)
          return res.status(200).send({
            audioLink: meta.requested_formats[1].url
          })
        })
    } catch (err) {
      console.log('\n\n', err)
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
