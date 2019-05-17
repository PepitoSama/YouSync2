/*
|===============================================================================
| Config file
| All 'process.env.XXXX must be specified in '.env' file created in application root
|===============================================================================
*/

module.exports = {
  port: process.env.PORT || 8081,
  authentification: {
    secret: process.env.TOKEN_SECRET || 'secret'
  }
}
