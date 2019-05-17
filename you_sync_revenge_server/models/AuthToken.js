/*
|===============================================================================
| Model : AuthToken
| Sequelize Model for AuthToken Database
|===============================================================================
*/

module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: DataTypes.STRING
  }, {})

  // set up the associations so we can make queries that include
  // the related objects
  AuthToken.associate = function (models) {
    AuthToken.belongsTo(models.User)
  }

  // Associates Token it with a user
  AuthToken.generate = async function (UserId, token) {
    if (!UserId) {
      throw new Error('AuthToken requires a user ID')
    }
    return AuthToken.create({ token, UserId })
  }

  return AuthToken
}
