/*
|===============================================================================
| Model : UserAdmin
| Sequelize Model for UserAdmin Database
|===============================================================================
*/

module.exports = (sequelize, DataTypes) => {
  const UserAdmin = sequelize.define('UserAdmin', {
    adminId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  })

  UserAdmin.associate = function (models) {
    UserAdmin.belongsTo(models.User)
  }

  return UserAdmin
}
