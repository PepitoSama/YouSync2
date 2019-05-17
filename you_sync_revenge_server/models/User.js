/*
|===============================================================================
| Model : User
| Sequelize Model for User Database
|===============================================================================
*/

// Include Modules
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Include Config Files
const config = require('../src/config/config')

function tokenAttribUser (username) {
  // 1 say in second
  console.log(username)
  const expirationLimit = 86400
  return jwt.sign(
    { username: username },
    config.authentification.secret, {
      expiresIn: expirationLimit
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userUsername: {
      type: DataTypes.STRING,
      required: true,
      allowNull: false,
      unique: true
    },
    userEmail: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      required: true
    },
    userLastConnection: {
      type: DataTypes.DATE,
      required: false
    }
  })

  User.associate = function (models) {
    User.hasMany(models.AuthToken)
    User.hasMany(models.Playlist)
    User.hasOne(models.UserAdmin, { foreignKey: { unique: true } })
    User.hasOne(models.UserStat, { foreignKey: { unique: true } })
  }

  User.authenticate = async function (username, password) {
    const user = await User.findOne({ where: { userUsername: username } })
    // Hash user passed password and compare it to the one
    // stored in database
    if (bcrypt.compareSync(password, user.userPassword)) {
      return user.authorize()
    }
    throw new Error('invalid password')
  }

  // in order to define an instance method, we have to access
  // the User model prototype. This can be found in the
  // sequelize documentation
  User.prototype.authorize = async function () {
    const { AuthToken } = sequelize.models
    const user = this
    let token = tokenAttribUser(this.userUsername)
    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    const authToken = await AuthToken.generate(this.userId, token)

    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(authToken)
    return {
      'user': user,
      'authToken': authToken
    }
  }

  // TODO classheck if user is logged
  User.prototype.isLogged = async function () {
    //
  }

  User.prototype.logout = async function (token) {
    // User is not anymore in AuthToken table
    return sequelize.models.AuthToken.destroy({ where: { token } })
  }

  return User
}
