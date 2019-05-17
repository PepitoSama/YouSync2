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
    }
  })
  // TODO : define idUser as required
  Playlist.associate = function (models) {
    Playlist.belongsTo(models.User)
    Playlist.hasMany(models.Video)
  }

  return Playlist
}
