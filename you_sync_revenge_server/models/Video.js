/*
|===============================================================================
| Model : Video
| Sequelize Model for Video Database
|===============================================================================
*/

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    videoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    videoYoutubeId: {
      type: DataTypes.STRING,
      required: true
    },
    videoName: {
      type: DataTypes.STRING,
      required: true
    },
    videoThumbnail: {
      type: DataTypes.STRING,
      required: true
    },
    videoUploaderUrl: {
      type: DataTypes.STRING,
      required: true
    },
    videoAudioLink: {
      type: DataTypes.TEXT,
      required: true
    }
  })

  Video.associate = function (models) {
    Video.belongsTo(models.Playlist)
  }

  Video.belongToUser = async function (videoId, userId) {
    const result = await Video.findOne({
      where: {
        videoId: videoId
      }
    })
    // TODO
    console.log('\n ===>', result)
    if (result.length === 0) {
      throw new Error('This video does not belong to connected user')
    }
  }

  return Video
}
