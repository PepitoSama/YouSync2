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
    }
  })

  Video.associate = function (models) {
    Video.belongsTo(models.Playlist)
  }

  return Video
}
