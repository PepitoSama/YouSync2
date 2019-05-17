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

  // Associates Token it with a user
  AuthToken.getUser = async function (token) {
    const result = AuthToken.find({
      where: token
    })
    console.log(result)
    if (result.length === 0) {
      throw new Error('No user found for this token')
    }
    return result
  }
  return AuthToken
}
