/*
|===============================================================================
| Model : Playlist
| Sequelize Model for Playlist Database
|===============================================================================
*/

module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    playlistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    playlistName: {
      type: DataTypes.STRING,
      required: true
    },
    playlistVideoNbr: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })
  // TODO : define idUser as required
  Playlist.associate = function (models) {
    Playlist.belongsTo(models.User)
    Playlist.hasMany(models.Video)
  }

  Playlist.belongToUser = async function (playlistId, userId) {
    const result = await Playlist.findAll({
      where: {
        playlistId: playlistId,
        UserUserId: userId
      }
    })
    if (result.length === 0) {
      throw new Error('This playlist does not belong to connected user')
    }
  }

  return Playlist
}
