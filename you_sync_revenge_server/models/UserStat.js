/*
|===============================================================================
| Model : UserStat
| Sequelize Model for UserStat Database
|===============================================================================
*/

module.exports = (sequelize, DataTypes) => {
  const UserStat = sequelize.define('UserStat', {
    statId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    statPlaylistNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    statVideoNumber: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  })

  UserStat.associate = function (models) {
    UserStat.belongsTo(models.User)
  }

  return UserStat
}
