require('dotenv').config()
module.exports = {
  'development': {
    'username': process.env.DB_DEV_USER || 'yousync',
    'password': process.env.DB_DEV_PASS || 'yousync',
    'database': process.env.DB_DEV_DATABASE || 'yousync',
    'host': process.env.DB_DEV_HOST || 'yousync',
    'dialect': process.env.DB_DEV_DIALECT || 'yousync'
  },
  'test': {
    'username': process.env.DB_TESTUSER || 'yousync',
    'password': process.env.DB_TESTPASS || 'yousync',
    'database': process.env.DB_TESTDATABASE || 'yousync',
    'host': process.env.DB_TESTHOST || 'yousync',
    'dialect': process.env.DB_TESTDIALECT || 'yousync'
  },
  'production': {
    'username': process.env.DB_PROD_USER || 'yousync',
    'password': process.env.DB_PROD_PASS || 'yousync',
    'database': process.env.DB_PROD_DATABASE || 'yousync',
    'host': process.env.DB_PROD_HOST || 'yousync',
    'dialect': process.env.DB_PROD_DIALECT || 'yousync'
  }
}
